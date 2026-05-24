import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  contact: z.string().min(5),
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

    // TODO: persist to DB (Postgres, Supabase, Airtable, Notion…)
    // TODO: send notification email to the couple
    console.log("RSVP received:", data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten() }, { status: 400 });
    }
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
