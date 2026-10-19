import { SAMPLE_ACCOUNT } from "@/lib/auth/constants";
import { APP_CONTENT } from "@/lib/seed/appContent";
import { type Session } from "@/types/auth";
import { type SessionSeed } from "@/types/simulation";

// The sample account gets the busy community; a new account starts fresh under its own name.
export function getSessionSeed(session: Session): SessionSeed {
  if (session.email === SAMPLE_ACCOUNT.email) {
    return { self: APP_CONTENT.self, scenario: "busy" };
  }
  return {
    self: {
      name: session.name,
      handle: session.handle,
      bio: "",
      following: 0,
      followers: 0,
    },
    scenario: "fresh",
  };
}
