import { SIGN_UP_ERROR_CODES } from "@/lib/auth/schema";
import { type SignUpField } from "@/types/auth";

export const TOO_MANY_REQUESTS = 429;

export const CHECK_FIELDS_MESSAGE = "Check the highlighted fields.";

// Messages shown above the button, by Better Auth error code.
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "That email and password don't match an account.",
  rateLimited: "Too many attempts. Wait a few seconds and try again.",
  google: "Google sign-in didn't finish. Try again.",
  signOut: "Couldn't log out. Try again.",
  unknown: "Something went wrong. Try again.",
};

// Errors that belong under one input. Without a message, the server's message is shown.
export const AUTH_ERROR_FIELDS: Record<
  string,
  { field: SignUpField; message?: string }
> = {
  USER_ALREADY_EXISTS: {
    field: "email",
    message: "An account with this email already exists.",
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    field: "email",
    message: "An account with this email already exists.",
  },
  INVALID_EMAIL: { field: "email", message: "Enter a valid email address." },
  PASSWORD_TOO_SHORT: { field: "password" },
  PASSWORD_TOO_LONG: { field: "password" },
  [SIGN_UP_ERROR_CODES.invalidName]: { field: "name" },
  [SIGN_UP_ERROR_CODES.invalidHandle]: { field: "handle" },
  [SIGN_UP_ERROR_CODES.handleTaken]: { field: "handle" },
};
