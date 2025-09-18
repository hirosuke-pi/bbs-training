import crypto from "crypto";

export function generateAnonId(sessionToken: string) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const raw = `${sessionToken}-${today}`;
  return crypto.createHash("sha256").update(raw).digest("hex").slice(0, 8);
}
