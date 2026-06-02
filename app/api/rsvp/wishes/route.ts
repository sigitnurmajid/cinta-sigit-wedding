import { NextRequest, NextResponse } from "next/server";
import { listWishes } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const PAGE_SIZE = 6;

// Public: paginated, moderated wishes (approved = 1 only).
export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;
  const { rows, total } = listWishes(page, PAGE_SIZE);
  return NextResponse.json({
    wishes: rows,
    page: Math.max(1, page),
    pageSize: PAGE_SIZE,
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  });
}
