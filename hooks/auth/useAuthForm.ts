"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthError } from "@/services/auth/authError";
import { writeSessionCookie } from "@/lib/auth/sessionCookie";
import { HOME_PATH } from "@/lib/auth/constants";
import { hasFieldErrors } from "@/utils/hasFieldErrors";
import {
  type AuthFormOptions,
  type AuthFormResult,
  type FieldErrors,
} from "@/types/auth";

// Validates in the browser first, then asks the simulated server; on success stores the session and opens the feed.
export function useAuthForm<TField extends string, TDetails>({
  validate,
  request,
}: AuthFormOptions<TField, TDetails>): AuthFormResult<TField, TDetails> {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TField>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function submit(details: TDetails) {
    if (pending) return;
    const errors = validate(details);
    setFieldErrors(errors);
    setFormError(null);
    if (hasFieldErrors(errors)) return;
    setPending(true);
    try {
      writeSessionCookie(await request(details));
      // Stays pending while the feed loads.
      router.replace(HOME_PATH);
    } catch (error) {
      setPending(false);
      if (error instanceof AuthError) {
        setFieldErrors(error.fieldErrors as FieldErrors<TField>);
        if (!hasFieldErrors(error.fieldErrors)) setFormError(error.message);
        return;
      }
      setFormError("Something went wrong. Try again.");
    }
  }

  return { pending, fieldErrors, formError, submit };
}
