import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "basement-default-super-secret-key-2026";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface AdminPayload {
  username: string;
  role: string;
}

export async function signAdminToken(payload: AdminPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secretKey);
}

export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export function checkAdminCredentials(username: string, pass: string): boolean {
  const admin1User = process.env.ADMIN_1_USER || "admin1";
  const admin1Pass = process.env.ADMIN_1_PASS || "basementadmin99";
  const admin2User = process.env.ADMIN_2_USER || "admin2";
  const admin2Pass = process.env.ADMIN_2_PASS || "basementco2026";

  if (username === admin1User && pass === admin1Pass) return true;
  if (username === admin2User && pass === admin2Pass) return true;
  return false;
}
