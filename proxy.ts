import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import {
  AUTH_COOKIE_PREFIX,
  PROTECTED_PATHS,
  WELCOME_PATH,
} from "@/lib/auth/constants";
import { matchesPath } from "@/utils/matchesPath";

// Optimistic: only checks that a session cookie exists. The app layout and every
// API route check the session itself against the database.
export function proxy(request: NextRequest) {
  const signedIn = Boolean(
    getSessionCookie(request, { cookiePrefix: AUTH_COOKIE_PREFIX }),
  );
  if (!signedIn && matchesPath(request.nextUrl.pathname, PROTECTED_PATHS)) {
    return NextResponse.redirect(new URL(WELCOME_PATH, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
