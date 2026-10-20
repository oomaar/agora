import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { AUTH_USER } from "@/lib/auth/schema";

// Talks to /api/auth on the same origin.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields({ user: AUTH_USER.additionalFields })],
});
