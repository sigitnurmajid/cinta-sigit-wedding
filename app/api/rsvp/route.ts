import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertRsvp } from "@/lib/db";

// better-sqlite3 is a native module — force the Node runtime, never edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2),
  contact: z.string().min(5).optional(),
  attending: z.enum(["yes", "no"]),
  guests: z.number().min(1).max(4).optional(),
  session: z.enum(["akad", "resepsi", "both"]).optional(),
  dietary: z.string().max(200).optional(),
  wish: z.string().max(500).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const id = insertRsvp(data);

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten() }, { status: 400 });
    }
    console.error("RSVP save failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
