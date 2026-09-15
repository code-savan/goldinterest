import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminConfigured, createSessionToken, verifyPassword } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "Admin password is not set. Add ADMIN_PASSWORD to the environment." }, { status: 503 });
  }
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!verifyPassword(String(password ?? ""))) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
