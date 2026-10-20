import "server-only";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prepareNewUser } from "@/lib/auth/prepareNewUser";
import {
  AUTH_ACCOUNT,
  AUTH_RATE_LIMIT_TABLE,
  AUTH_SESSION,
  AUTH_USER,
  AUTH_VERIFICATION,
  DISABLED_AUTH_PATHS,
} from "@/lib/auth/schema";
import {
  AUTH_COOKIE_PREFIX,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  SESSION_MAX_AGE_SECONDS,
  SESSION_UPDATE_AGE_SECONDS,
} from "@/lib/auth/constants";
import { pool } from "@/lib/db/pool";
import { createId } from "@/utils/createId";

// Email + password and Google sign-in, with sessions and rate limits stored in Postgres.
// Reads BETTER_AUTH_SECRET and BETTER_AUTH_URL from the environment.
export const auth = betterAuth({
  appName: "Agora",
  database: pool,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: PASSWORD_MIN_LENGTH,
    maxPasswordLength: PASSWORD_MAX_LENGTH,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  user: AUTH_USER,
  session: {
    ...AUTH_SESSION,
    expiresIn: SESSION_MAX_AGE_SECONDS,
    updateAge: SESSION_UPDATE_AGE_SECONDS,
  },
  account: AUTH_ACCOUNT,
  verification: AUTH_VERIFICATION,
  // Rate limiting is on in development too, so it can be tested; sign-in and sign-up allow 3 attempts per 10 seconds.
  rateLimit: { ...AUTH_RATE_LIMIT_TABLE, enabled: true, storage: "database" },
  disabledPaths: DISABLED_AUTH_PATHS,
  databaseHooks: {
    user: { create: { before: prepareNewUser } },
  },
  advanced: {
    cookiePrefix: AUTH_COOKIE_PREFIX,
    database: { generateId: ({ model }) => createId(model) },
  },
  plugins: [nextCookies()],
});
