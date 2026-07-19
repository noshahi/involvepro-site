import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "involvepro_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

export type AdminSessionPayload = {
  email: string;
  role: "ADMIN";
};

function getSecretKey() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not configured.");
  }
  return new TextEncoder().encode(secret);
}

export function isAdminAuthConfigured() {
  return Boolean(
    process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && process.env.NEXTAUTH_SECRET,
  );
}

export async function createSessionToken(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.email === "string" && payload.role === "ADMIN") {
      return { email: payload.email, role: "ADMIN" };
    }
    return null;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, SESSION_DURATION_SECONDS };
