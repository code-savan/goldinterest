import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const pass = () => {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  };

  if (pathname === "/admin/login" || pathname === "/api/admin/login") return pass();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const ok = token ? await verifySessionToken(token) : false;
  if (ok) return pass();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
