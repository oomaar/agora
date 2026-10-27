import {
  EMAIL_PATTERN,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/lib/auth/constants";
import {
  BIO_MAX_LENGTH,
  HANDLE_PATTERN,
  NAME_MAX_LENGTH,
} from "@/lib/data/constants";
import {
  type FieldErrors,
  type SignInDetails,
  type SignInField,
  type SignUpDetails,
  type SignUpField,
} from "@/types/auth";
import { type ProfileUpdate } from "@/types/dataSource";
import { type ProfileField } from "@/types/settings";

function emailError(email: string): string | undefined {
  if (!email.trim()) return "Enter your email.";
  if (!EMAIL_PATTERN.test(email.trim())) return "Enter a valid email address.";
}

function passwordError(password: string): string | undefined {
  if (password.length < PASSWORD_MIN_LENGTH)
    return `Use at least ${PASSWORD_MIN_LENGTH} characters.`;
  if (password.length > PASSWORD_MAX_LENGTH)
    return `Use at most ${PASSWORD_MAX_LENGTH} characters.`;
}

// Shared by the sign-up form and the server's sign-up hook.
export function nameError(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) return "Enter your name.";
  if (trimmed.length > NAME_MAX_LENGTH)
    return `Your name can be up to ${NAME_MAX_LENGTH} characters.`;
}

export function handleError(handle: string): string | undefined {
  const normalized = normalizeHandle(handle);
  if (!normalized) return "Choose a handle.";
  if (!HANDLE_PATTERN.test(normalized))
    return "Use 2–30 lowercase letters, numbers, dots or underscores.";
}

// Run in the form before sending; the server checks again.
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
  return {
    name: nameError(details.name),
    handle: handleError(details.handle),
    email: emailError(details.email),
    password: passwordError(details.password),
  };
}

// Run in the account form before saving; the server checks again.
export function validateProfile(
  details: ProfileUpdate,
): FieldErrors<ProfileField> {
  return {
    name: nameError(details.name),
    handle: handleError(details.handle),
    bio:
      details.bio.trim().length > BIO_MAX_LENGTH
        ? `Your bio can be up to ${BIO_MAX_LENGTH} characters.`
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
