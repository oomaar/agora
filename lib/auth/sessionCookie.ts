import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/constants";
import { type Session } from "@/types/auth";

// Written in the browser after the simulated server signs the user in; read by the proxy and the app layout.
export function writeSessionCookie(session: Session): void {
  const value = encodeURIComponent(JSON.stringify(session));
  document.cookie = `${SESSION_COOKIE}=${value}; path=/; max-age=${SESSION_MAX_AGE_SECONDS}; samesite=lax`;
}

export function clearSessionCookie(): void {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
