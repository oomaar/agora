"use client";

import { useAuthForm } from "@/hooks/auth/useAuthForm";
import { signIn } from "@/services/auth/authApi";
import { validateSignIn } from "@/services/auth/validation";
import { type SignInDetails, type SignInField } from "@/types/auth";

export function useSignIn() {
  return useAuthForm<SignInField, SignInDetails>({
    validate: validateSignIn,
    request: signIn,
  });
}
