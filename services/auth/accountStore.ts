import { ACCOUNTS_STORAGE_KEY, SAMPLE_ACCOUNT } from "@/lib/auth/constants";
import { type Account } from "@/types/auth";

function isAccount(value: unknown): value is Account {
  if (typeof value !== "object" || value === null) return false;
  const account = value as Record<string, unknown>;
  return ["email", "password", "name", "handle"].every(
    (key) => typeof account[key] === "string",
  );
}

// Accounts created on this device. Storage can be unavailable (private mode), so it falls back to none.
function readStoredAccounts(): Account[] {
  try {
    const data: unknown = JSON.parse(
      localStorage.getItem(ACCOUNTS_STORAGE_KEY) ?? "[]",
    );
    return Array.isArray(data) ? data.filter(isAccount) : [];
  } catch {
    return [];
  }
}

export function readAccounts(): Account[] {
  return [SAMPLE_ACCOUNT, ...readStoredAccounts()];
}

export function saveAccount(account: Account): void {
  try {
    localStorage.setItem(
      ACCOUNTS_STORAGE_KEY,
      JSON.stringify([...readStoredAccounts(), account]),
    );
  } catch {
    // Without storage the account still signs in; it just isn't remembered.
  }
}
