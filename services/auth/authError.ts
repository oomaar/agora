import { type FieldErrors } from "@/types/auth";

// A rejected sign-in or sign-up: field errors sit under their inputs, the message above the button.
export class AuthError extends Error {
  readonly fieldErrors: FieldErrors<string>;

  constructor(message: string, fieldErrors: FieldErrors<string> = {}) {
    super(message);
    this.name = "AuthError";
    this.fieldErrors = fieldErrors;
  }
}
