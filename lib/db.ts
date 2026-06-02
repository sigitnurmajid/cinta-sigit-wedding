// SQLite data layer for RSVP submissions (better-sqlite3, synchronous).
// Self-hosted: the database file lives on disk at data/rsvp.db.
// IMPORTANT: only import this from Node-runtime route handlers / server
// components — never from edge middleware or client components.

import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export type Attending = "yes" | "no";
export type Session = "akad" | "resepsi" | "both";

export interface RsvpInput {
  name: string;
  contact?: string;
  attending: Attending;
  guests?: number;
  session?: Session;
  dietary?: string;
  wish?: string;
}

export interface RsvpRow extends Omit<RsvpInput, "contact"> {
  id: number;
  contact: string | null;
  approved: number; // 0 | 1
  created_at: string;
}

export interface Wish {
  name: string;
  wish: string;
  attending: Attending;
}

export interface Stats {
  total: number;
  attendingYes: number;
  attendingNo: number;
  totalGuests: number;
  pendingWishes: number;
}

// ── Singleton connection ─────────────────────────────────────────────
let _db: Database.Database | null = null;

function db(): Database.Database {
  if (_db) return _db;

  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });

  const conn = new Database(path.join(dir, "rsvp.db"));
  conn.pragma("journal_mode = WAL");
  conn.exec(`
    CREATE TABLE IF NOT EXISTS rsvps (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      contact    TEXT,
      attending  TEXT    NOT NULL,
      guests     INTEGER,
      session    TEXT,
      dietary    TEXT,
      wish       TEXT,
      approved   INTEGER NOT NULL DEFAULT 0,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);

  _db = conn;
  return _db;
}

// ── Writes ───────────────────────────────────────────────────────────
export function insertRsvp(data: RsvpInput): number {
  const stmt = db().prepare(`
    INSERT INTO rsvps (name, contact, attending, guests, session, dietary, wish)
    VALUES (@name, @contact, @attending, @guests, @session, @dietary, @wish)
  `);
  const info = stmt.run({
    name: data.name,
    contact: data.contact?.trim() ? data.contact.trim() : null,
    attending: data.attending,
    guests: data.guests ?? null,
    session: data.session ?? null,
    dietary: data.dietary ?? null,
    wish: data.wish?.trim() ? data.wish.trim() : null,
  });
  return Number(info.lastInsertRowid);
}

export function setApproved(id: number, approved: boolean): void {
  db().prepare(`UPDATE rsvps SET approved = ? WHERE id = ?`).run(approved ? 1 : 0, id);
}

export function deleteRsvp(id: number): void {
  db().prepare(`DELETE FROM rsvps WHERE id = ?`).run(id);
}

// ── Public reads (moderated wishes) ──────────────────────────────────
const WISH_FILTER = `approved = 1 AND wish IS NOT NULL AND trim(wish) <> ''`;

export function listWishes(page: number, pageSize: number): { rows: Wish[]; total: number } {
  const p = Math.max(1, Math.floor(page) || 1);
  const total = (db().prepare(`SELECT COUNT(*) AS n FROM rsvps WHERE ${WISH_FILTER}`).get() as { n: number }).n;
  const rows = db()
    .prepare(`SELECT name, wish, attending FROM rsvps WHERE ${WISH_FILTER} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`)
    .all(pageSize, (p - 1) * pageSize) as Wish[];
  return { rows, total };
}

// ── Admin reads ──────────────────────────────────────────────────────
export function listRsvps(page: number, pageSize: number): { rows: RsvpRow[]; total: number } {
  const p = Math.max(1, Math.floor(page) || 1);
  const total = (db().prepare(`SELECT COUNT(*) AS n FROM rsvps`).get() as { n: number }).n;
  const rows = db()
    .prepare(`SELECT * FROM rsvps ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`)
    .all(pageSize, (p - 1) * pageSize) as RsvpRow[];
  return { rows, total };
}

export function stats(): Stats {
  const row = db()
    .prepare(
      `SELECT
         COUNT(*) AS total,
         COALESCE(SUM(CASE WHEN attending = 'yes' THEN 1 ELSE 0 END), 0) AS attendingYes,
         COALESCE(SUM(CASE WHEN attending = 'no'  THEN 1 ELSE 0 END), 0) AS attendingNo,
         COALESCE(SUM(CASE WHEN attending = 'yes' THEN COALESCE(guests, 1) ELSE 0 END), 0) AS totalGuests,
         COALESCE(SUM(CASE WHEN approved = 0 AND wish IS NOT NULL AND trim(wish) <> '' THEN 1 ELSE 0 END), 0) AS pendingWishes
       FROM rsvps`
    )
    .get() as Stats;
  return row;
}
