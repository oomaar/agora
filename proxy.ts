import { NextResponse, type NextRequest } from "next/server";
import {
  HOME_PATH,
  PROTECTED_PATHS,
  SESSION_COOKIE,
  SIGNED_OUT_PATHS,
  WELCOME_PATH,
} from "@/lib/auth/constants";
import { matchesPath } from "@/utils/matchesPath";
import { parseSession } from "@/utils/parseSession";

// Optimistic redirects from the session cookie; the app layout checks the session again.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = Boolean(
    parseSession(request.cookies.get(SESSION_COOKIE)?.value),
  );
  if (!signedIn && matchesPath(pathname, PROTECTED_PATHS)) {
    return NextResponse.redirect(new URL(WELCOME_PATH, request.url));
  }
  if (signedIn && matchesPath(pathname, SIGNED_OUT_PATHS)) {
    return NextResponse.redirect(new URL(HOME_PATH, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
