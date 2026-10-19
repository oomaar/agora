"use client";

import { useAuthForm } from "@/hooks/auth/useAuthForm";
import { signUp } from "@/services/auth/simulatedAuth";
import { validateSignUp } from "@/services/auth/validation";
import { type SignUpDetails, type SignUpField } from "@/types/auth";

export function useSignUp() {
  return useAuthForm<SignUpField, SignUpDetails>({
    validate: validateSignUp,
    request: signUp,
  });
}
