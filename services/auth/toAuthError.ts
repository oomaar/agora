import { AuthError } from "@/services/auth/authError";
import {
  AUTH_ERROR_FIELDS,
  AUTH_ERROR_MESSAGES,
  CHECK_FIELDS_MESSAGE,
  TOO_MANY_REQUESTS,
} from "@/lib/auth/errors";
import { type AuthClientError } from "@/types/auth";

// Turns a Better Auth error into the form's shape: a field error when it belongs
// to one input, otherwise a message above the button.
export function toAuthError(error: AuthClientError): AuthError {
  if (error.status === TOO_MANY_REQUESTS) {
    return new AuthError(AUTH_ERROR_MESSAGES.rateLimited);
  }
  const code = error.code ?? "";
  const field = AUTH_ERROR_FIELDS[code];
  if (field) {
    return new AuthError(CHECK_FIELDS_MESSAGE, {
      [field.field]: field.message ?? error.message,
    });
  }
  return new AuthError(
    AUTH_ERROR_MESSAGES[code] ?? AUTH_ERROR_MESSAGES.unknown,
  );
}
