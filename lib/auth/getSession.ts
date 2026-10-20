import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { type Session } from "@/types/auth";

// Checks the session cookie against the database; cached for the rest of the request.
export const getSession = cache(async (): Promise<Session | null> => {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result) return null;
  const { id, email, name, handle } = result.user;
  return { userId: id, email, name, handle: handle ?? "" };
});
