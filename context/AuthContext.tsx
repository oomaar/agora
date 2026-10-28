"use client";

import { createContext, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/ui/useToast";
import { signOut as endSession } from "@/services/auth/authApi";
import { AUTH_ERROR_MESSAGES } from "@/lib/auth/errors";
import { SIGN_OUT_LABEL, WELCOME_PATH } from "@/lib/auth/constants";
import { type AuthContextValue, type AuthProviderProps } from "@/types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

// The session is checked on the server and handed down by the app layout.
export function AuthProvider({ session, children }: AuthProviderProps) {
  const router = useRouter();
  const toast = useToast();
  const signOut = useCallback(async () => {
    try {
      await endSession();
      router.replace(WELCOME_PATH);
      router.refresh();
    } catch {
      toast.error(AUTH_ERROR_MESSAGES.signOut);
    }
  }, [router, toast]);
  const value = useMemo(
    () => ({ session, signOut, signOutLabel: SIGN_OUT_LABEL }),
    [session, signOut],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
