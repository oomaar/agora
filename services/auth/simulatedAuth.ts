import { AuthError } from "@/services/auth/authError";
import { readAccounts, saveAccount } from "@/services/auth/accountStore";
import {
  normalizeEmail,
  normalizeHandle,
  validateSignIn,
  validateSignUp,
} from "@/services/auth/validation";
import { APP_CONTENT } from "@/lib/seed/appContent";
import { PERSON_NAMES } from "@/lib/seed/pools";
import { NETWORK_PROFILES } from "@/lib/simulation/constants";
import { hasFieldErrors } from "@/utils/hasFieldErrors";
import { toHandle } from "@/utils/toHandle";
import { wait } from "@/utils/wait";
import {
  type Account,
  type Session,
  type SignInDetails,
  type SignUpDetails,
} from "@/types/auth";

const CHECK_FIELDS_MESSAGE = "Check the highlighted fields.";

// Handles already used by the seeded community, so a new account never collides with one.
const COMMUNITY_HANDLES = [
  ...APP_CONTENT.people.map((person) => person.handle),
  ...PERSON_NAMES.map(toHandle),
];

function simulateLatency(): Promise<void> {
  const { minLatencyMs, maxLatencyMs } = NETWORK_PROFILES.normal;
  return wait(minLatencyMs + Math.random() * (maxLatencyMs - minLatencyMs));
}

function toSession({ email, name, handle }: Account): Session {
  return { email, name, handle };
}

// Stands in for an auth API: same latency as the simulated server, validation on its side too.
export async function signIn(details: SignInDetails): Promise<Session> {
  await simulateLatency();
  const errors = validateSignIn(details);
  if (hasFieldErrors(errors)) throw new AuthError(CHECK_FIELDS_MESSAGE, errors);
  const email = normalizeEmail(details.email);
  const account = readAccounts().find((item) => item.email === email);
  if (!account || account.password !== details.password) {
    throw new AuthError("That email and password don't match an account.");
  }
  return toSession(account);
}

export async function signUp(details: SignUpDetails): Promise<Session> {
  await simulateLatency();
  const errors = validateSignUp(details);
  const accounts = readAccounts();
  const email = normalizeEmail(details.email);
  const handle = normalizeHandle(details.handle);
  if (
    !errors.handle &&
    (COMMUNITY_HANDLES.includes(handle) ||
      accounts.some((account) => account.handle === handle))
  ) {
    errors.handle = `@${handle} is already taken.`;
  }
  if (!errors.email && accounts.some((account) => account.email === email)) {
    errors.email = "An account with this email already exists.";
  }
  if (hasFieldErrors(errors)) throw new AuthError(CHECK_FIELDS_MESSAGE, errors);
  const account: Account = {
    email,
    handle,
    name: details.name.trim(),
    password: details.password,
  };
  saveAccount(account);
  return toSession(account);
}
