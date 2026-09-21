export const ADMIN_COOKIE = "admin_session";
const PAYLOAD = "grok-bot-hackathon-admin";

function bytesToHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminToken() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("ADMIN_PASSWORD no está configurada");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(PAYLOAD),
  );
  return bytesToHex(signature);
}

export async function isValidAdminToken(token: string | undefined) {
  if (!token || !process.env.ADMIN_PASSWORD) return false;

  const expected = await createAdminToken();
  if (token.length !== expected.length) return false;

  let mismatch = 0;
  for (let index = 0; index < token.length; index += 1) {
    mismatch |= token.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return mismatch === 0;
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}
