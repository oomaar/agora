import { EMAIL_PATTERN, PASSWORD_MIN_LENGTH } from "@/lib/auth/constants";
import { HANDLE_PATTERN, NAME_MAX_LENGTH } from "@/lib/data/constants";
import {
  type FieldErrors,
  type SignInDetails,
  type SignInField,
  type SignUpDetails,
  type SignUpField,
} from "@/types/auth";

function emailError(email: string): string | undefined {
  if (!email.trim()) return "Enter your email.";
  if (!EMAIL_PATTERN.test(email.trim())) return "Enter a valid email address.";
}

// Run in the form before sending, and again by the simulated server.
export function validateSignIn(
  details: SignInDetails,
): FieldErrors<SignInField> {
  return {
    email: emailError(details.email),
    password: details.password ? undefined : "Enter your password.",
  };
}

export function validateSignUp(
  details: SignUpDetails,
): FieldErrors<SignUpField> {
  const name = details.name.trim();
  const handle = normalizeHandle(details.handle);
  return {
    name: !name
      ? "Enter your name."
      : name.length > NAME_MAX_LENGTH
        ? `Your name can be up to ${NAME_MAX_LENGTH} characters.`
        : undefined,
    handle: !handle
      ? "Choose a handle."
      : HANDLE_PATTERN.test(handle)
        ? undefined
        : "Use 2–30 lowercase letters, numbers, dots or underscores.",
    email: emailError(details.email),
    password:
      details.password.length < PASSWORD_MIN_LENGTH
        ? `Use at least ${PASSWORD_MIN_LENGTH} characters.`
        : undefined,
  };
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// "@Sam" → "sam"
export function normalizeHandle(handle: string): string {
  return handle.trim().replace(/^@/, "").toLowerCase();
}
