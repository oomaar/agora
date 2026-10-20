import { toAuthError } from "@/services/auth/toAuthError";
import {
  normalizeEmail,
  normalizeHandle,
} from "@/services/auth/validation";
import { authClient } from "@/lib/auth/authClient";
import { HOME_PATH, WELCOME_PATH } from "@/lib/auth/constants";
import { type SignInDetails, type SignUpDetails } from "@/types/auth";

// Each call sets or clears the session cookie on success and throws an AuthError otherwise.

export async function signIn(details: SignInDetails): Promise<void> {
  const { error } = await authClient.signIn.email({
    email: normalizeEmail(details.email),
    password: details.password,
  });
  if (error) throw toAuthError(error);
}

export async function signUp(details: SignUpDetails): Promise<void> {
  const { error } = await authClient.signUp.email({
    name: details.name.trim(),
    handle: normalizeHandle(details.handle),
    email: normalizeEmail(details.email),
    password: details.password,
  });
  if (error) throw toAuthError(error);
}

// Leaves for Google's consent screen; Google sends the visitor back to the feed, or to the welcome page with ?error=….
export async function signInWithGoogle(): Promise<void> {
  const { error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: HOME_PATH,
    errorCallbackURL: WELCOME_PATH,
  });
  if (error) throw toAuthError(error);
}

export async function signOut(): Promise<void> {
  const { error } = await authClient.signOut();
  if (error) throw toAuthError(error);
}
