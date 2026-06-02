import { NextRequest, NextResponse } from "next/server";

// HTTP Basic Auth guard for the admin dashboard (and its server actions,
// which POST back to /admin). Credentials come from env — never committed.
// (Next 16 renamed the "middleware" convention to "proxy".)
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export function proxy(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  // If creds aren't configured, lock the dashboard rather than leaving it open.
  if (!user || !pass) {
    return new NextResponse("Admin not configured", { status: 503 });
  }

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const [u, p] = atob(header.slice(6)).split(":");
    if (u === user && p === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Wedding Admin", charset="UTF-8"' },
  });
}
