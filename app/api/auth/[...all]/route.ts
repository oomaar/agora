import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth/auth";

// Better Auth's endpoints: sign-up, sign-in, Google callback, sign-out, session.
export const { GET, POST } = toNextJsHandler(auth);
