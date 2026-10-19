import { type Session } from "@/types/auth";

// Reads the session cookie's JSON; anything malformed counts as signed out.
export function parseSession(value: string | undefined): Session | null {
  if (!value) return null;
  try {
    const data: unknown = JSON.parse(value);
    if (typeof data !== "object" || data === null) return null;
    const { email, name, handle } = data as Record<string, unknown>;
    if (
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof handle !== "string"
    ) {
      return null;
    }
    return { email, name, handle };
  } catch {
    return null;
  }
}
