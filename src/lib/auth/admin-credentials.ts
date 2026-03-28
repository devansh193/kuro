import { timingSafeEqual } from "node:crypto";

function toBuf(s: string): Buffer {
  return Buffer.from(s, "utf8");
}

export function getExpectedAdminUsername(): string {
  return process.env.ADMIN_USERNAME ?? "kuro";
}

export function getExpectedAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "Kuro@12345";
}

export function credentialsMatch(username: string, password: string): boolean {
  const u = getExpectedAdminUsername();
  const p = getExpectedAdminPassword();
  if (username.length !== u.length || password.length !== p.length) {
    return false;
  }
  return (
    timingSafeEqual(toBuf(username), toBuf(u)) &&
    timingSafeEqual(toBuf(password), toBuf(p))
  );
}
