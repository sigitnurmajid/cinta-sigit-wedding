import Link from "next/link";
import { listRsvps, stats, type RsvpRow } from "@/lib/db";
import { approveAction, deleteAction } from "./actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

const cell: React.CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid #e6e1d6",
  fontSize: "0.85rem",
  verticalAlign: "top",
  textAlign: "left",
};
const th: React.CSSProperties = {
  ...cell,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontSize: "0.7rem",
  color: "#6b6453",
  borderBottom: "2px solid #d8d2c4",
  whiteSpace: "nowrap",
};

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ flex: "1 1 130px", background: "#fff", border: "1px solid #e6e1d6", borderRadius: 8, padding: "16px 18px" }}>
      <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#2C2817" }}>{value}</div>
      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b6453", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function btn(bg: string): React.CSSProperties {
  return {
    background: bg,
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "6px 10px",
    fontSize: "0.72rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const s = stats();
  const { rows, total } = listRsvps(page, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", background: "#f5f2ec", minHeight: "100vh", padding: "32px 24px", color: "#2C2817" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", margin: "0 0 4px" }}>RSVP Dashboard</h1>
        <p style={{ color: "#6b6453", margin: "0 0 24px", fontSize: "0.9rem" }}>Sigit &amp; Cinta — guest responses</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
          <StatCard label="Responses" value={s.total} />
          <StatCard label="Attending" value={s.attendingYes} />
          <StatCard label="Declined" value={s.attendingNo} />
          <StatCard label="Total guests" value={s.totalGuests} />
          <StatCard label="Pending wishes" value={s.pendingWishes} />
        </div>

        <div style={{ background: "#fff", border: "1px solid #e6e1d6", borderRadius: 8, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 980 }}>
            <thead>
              <tr>
                <th style={th}>#</th>
                <th style={th}>Name</th>
                <th style={th}>Contact</th>
                <th style={th}>Attending</th>
                <th style={th}>Guests</th>
                <th style={th}>Session</th>
                <th style={th}>Dietary</th>
                <th style={th}>Wish</th>
                <th style={th}>When</th>
                <th style={th}>Wish status</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td style={cell} colSpan={11}>No responses yet.</td></tr>
              )}
              {rows.map((r: RsvpRow) => (
                <tr key={r.id}>
                  <td style={cell}>{r.id}</td>
                  <td style={{ ...cell, fontWeight: 600 }}>{r.name}</td>
                  <td style={cell}>{r.contact}</td>
                  <td style={{ ...cell, color: r.attending === "yes" ? "#3d6b1f" : "#9b3e2a", fontWeight: 600 }}>
                    {r.attending === "yes" ? "Yes" : "No"}
                  </td>
                  <td style={cell}>{r.guests ?? "—"}</td>
                  <td style={cell}>{r.session ?? "—"}</td>
                  <td style={{ ...cell, maxWidth: 160 }}>{r.dietary || "—"}</td>
                  <td style={{ ...cell, maxWidth: 260 }}>{r.wish || "—"}</td>
                  <td style={{ ...cell, whiteSpace: "nowrap", color: "#6b6453" }}>{r.created_at}</td>
                  <td style={cell}>
                    {r.wish && r.wish.trim()
                      ? (r.approved ? <span style={{ color: "#3d6b1f", fontWeight: 600 }}>Approved</span> : <span style={{ color: "#b07b16", fontWeight: 600 }}>Pending</span>)
                      : <span style={{ color: "#9b958a" }}>—</span>}
                  </td>
                  <td style={cell}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {r.wish && r.wish.trim() && (
                        <form action={approveAction}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="approved" value={r.approved ? "0" : "1"} />
                          <button type="submit" style={btn(r.approved ? "#8a7f63" : "#3d6b1f")}>
                            {r.approved ? "Unapprove" : "Approve"}
                          </button>
                        </form>
                      )}
                      <form action={deleteAction}>
                        <input type="hidden" name="id" value={r.id} />
                        <button type="submit" style={btn("#9b3e2a")}>Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 24 }}>
            <PageLink page={page - 1} disabled={page <= 1}>‹ Prev</PageLink>
            <span style={{ fontSize: "0.85rem", color: "#6b6453" }}>Page {page} of {totalPages}</span>
            <PageLink page={page + 1} disabled={page >= totalPages}>Next ›</PageLink>
          </div>
        )}
      </div>
    </main>
  );
}

function PageLink({ page, disabled, children }: { page: number; disabled: boolean; children: React.ReactNode }) {
  const style: React.CSSProperties = {
    padding: "8px 16px",
    border: "1px solid #c9c2b2",
    borderRadius: 5,
    fontSize: "0.8rem",
    color: disabled ? "#bbb4a5" : "#2C2817",
    pointerEvents: disabled ? "none" : "auto",
    background: "#fff",
  };
  if (disabled) return <span style={style}>{children}</span>;
  return <Link href={`/admin?page=${page}`} style={style}>{children}</Link>;
}
