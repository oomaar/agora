import { APP_CONTENT } from "@/lib/seed/appContent";
import { type Account } from "@/types/auth";

export const SESSION_COOKIE = "agora_session";

// 30 days.
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const ACCOUNTS_STORAGE_KEY = "agora.accounts";

export const HOME_PATH = "/home";

export const WELCOME_PATH = "/";

export const SIGNUP_PATH = "/signup";

// Signed-in visitors skip these and land on the feed.
export const SIGNED_OUT_PATHS = [WELCOME_PATH, SIGNUP_PATH];

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

// The seeded app account; the sign-in form starts filled in with it.
export const SAMPLE_ACCOUNT: Account = {
  email: "sam@example.com",
  password: "agora-2026",
  name: APP_CONTENT.self.name,
  handle: APP_CONTENT.self.handle,
};

export const PASSWORD_MIN_LENGTH = 8;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
