"use client";

import { useState } from "react";
import { AuthError } from "@/services/auth/authError";
import { signInWithGoogle } from "@/services/auth/authApi";
import { AUTH_ERROR_MESSAGES } from "@/lib/auth/errors";
import { type GoogleSignInResult } from "@/types/auth";

// Stays pending while the browser leaves for Google.
export function useGoogleSignIn(
  initialError: string | null = null,
): GoogleSignInResult {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(initialError);

  async function start() {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (cause) {
      setPending(false);
      setError(
        cause instanceof AuthError ? cause.message : AUTH_ERROR_MESSAGES.google,
      );
    }
  }

  return { pending, error, start };
}
