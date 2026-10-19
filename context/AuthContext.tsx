"use client";

import { createContext, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { clearSessionCookie } from "@/lib/auth/sessionCookie";
import { WELCOME_PATH } from "@/lib/auth/constants";
import { type AuthContextValue, type AuthProviderProps } from "@/types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

// The session is read from the cookie on the server and handed down by the app layout.
export function AuthProvider({ session, children }: AuthProviderProps) {
  const router = useRouter();
  const signOut = useCallback(() => {
    clearSessionCookie();
    router.replace(WELCOME_PATH);
  }, [router]);
  const value = useMemo(() => ({ session, signOut }), [session, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
