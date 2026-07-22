import { cookies } from "next/headers";

const SALT = "linktree-dashboard-v1";
const MAX_AGE = 60 * 60 * 24;

export function isAuthEnabled(): boolean {
  return !!process.env.DASHBOARD_PASSWORD;
}

export async function createSessionToken(): Promise<string> {
  const { createHmac, randomBytes } = await import("node:crypto");
  const nonce = randomBytes(16).toString("hex");
  const payload = `${Date.now()}.${nonce}`;
  const hmac = createHmac("sha256", process.env.DASHBOARD_PASSWORD! + SALT)
    .update(payload)
    .digest("hex");
  return `${payload}.${hmac}`;
}

export async function validateSessionToken(token: string): Promise<boolean> {
  if (!isAuthEnabled()) return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const timestamp = Number(parts[0]);
    const nonce = parts[1];
    const hmac = parts[2];
    if (Date.now() - timestamp > MAX_AGE * 1000) return false;
    const { createHmac } = await import("node:crypto");
    const expected = createHmac("sha256", process.env.DASHBOARD_PASSWORD! + SALT)
      .update(`${timestamp}.${nonce}`)
      .digest("hex");
    return hmac === expected;
  } catch {
    return false;
  }
}

export async function getAuthStatus(): Promise<boolean> {
  if (!isAuthEnabled()) return true;
  const store = await cookies();
  const token = store.get("dashboard_session")?.value;
  if (!token) return false;
  return validateSessionToken(token);
}

export async function setAuthCookie(): Promise<void> {
  const token = await createSessionToken();
  const store = await cookies();
  store.set("dashboard_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/dashboard",
  });
}
