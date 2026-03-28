import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

export const ADMIN_SESSION_COOKIE = "kuro_admin_session";

const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

export function getAuthSecretKey(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) {
    throw new Error("AUTH_SECRET must be set to a string of at least 32 characters");
  }
  return new TextEncoder().encode(s);
}

export async function signAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
    .sign(getAuthSecretKey());
}

export async function verifyAdminSessionToken(token: string) {
  const { payload } = await jwtVerify(token, getAuthSecretKey());
  return payload;
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  };
}
