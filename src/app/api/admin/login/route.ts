import { NextResponse } from "next/server";
import { credentialsMatch } from "@/lib/auth/admin-credentials";
import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionCookieOptions,
  signAdminSessionToken,
} from "@/lib/auth/admin-session";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!credentialsMatch(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  let token: string;
  try {
    token = await signAdminSessionToken();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, getAdminSessionCookieOptions());
  return res;
}
