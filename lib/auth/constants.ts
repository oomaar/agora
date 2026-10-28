import { type SignInDetails } from "@/types/auth";

// Session cookies are named agora.session_token (with __Secure- on https).
export const AUTH_COOKIE_PREFIX = "agora";

// 30 days, extended once a day while the session is in use.
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const SESSION_UPDATE_AGE_SECONDS = 60 * 60 * 24;

export const HOME_PATH = "/home";

export const WELCOME_PATH = "/";

export const SIGNUP_PATH = "/signup";

export const SIGN_OUT_LABEL = "Log out";

// Signed-out visitors are sent to the welcome page from these.
export const PROTECTED_PATHS = [
  HOME_PATH,
  "/post",
  "/u",
  "/explore",
  "/notifications",
  "/messages",
  "/settings",
];

// The seeded account; the sign-in form starts filled in with it.
export const SAMPLE_ACCOUNT: SignInDetails = {
  email: "sam@example.com",
  password: "agora-2026",
};

// The rest of the seeded community are profiles without a sign-in, on a reserved domain.
export const SEED_EMAIL_DOMAIN = "example.com";

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_MAX_LENGTH = 128;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Better Auth sends visitors back here with ?error=… when Google sign-in fails or is cancelled.
export const OAUTH_ERROR_PARAM = "error";
