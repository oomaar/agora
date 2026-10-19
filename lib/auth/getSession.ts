import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { parseSession } from "@/utils/parseSession";
import { type Session } from "@/types/auth";

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  return parseSession(cookieStore.get(SESSION_COOKIE)?.value);
}
