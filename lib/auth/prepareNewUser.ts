import "server-only";
import { APIError } from "better-auth/api";
import {
  findAvailableHandle,
  isHandleTaken,
} from "@/services/database/handles";
import {
  handleError,
  nameError,
  normalizeHandle,
} from "@/services/auth/validation";
import { SIGN_UP_ERROR_CODES } from "@/lib/auth/schema";
import { NAME_MAX_LENGTH } from "@/lib/data/constants";
import { type NewAuthUser } from "@/types/auth";

function reject(code: string, message: string): never {
  throw APIError.from("BAD_REQUEST", { code, message });
}

// Runs before Better Auth creates a user. Email sign-ups bring a name and handle,
// checked like the form does; Google sign-ups get a handle made from their name.
export async function prepareNewUser(user: NewAuthUser) {
  if (typeof user.handle !== "string") {
    const name = user.name.trim().slice(0, NAME_MAX_LENGTH);
    const handle = await findAvailableHandle(name || user.email.split("@")[0]);
    return { data: { ...user, name, handle } };
  }
  const invalidName = nameError(user.name);
  if (invalidName) reject(SIGN_UP_ERROR_CODES.invalidName, invalidName);
  const invalidHandle = handleError(user.handle);
  if (invalidHandle) reject(SIGN_UP_ERROR_CODES.invalidHandle, invalidHandle);
  const handle = normalizeHandle(user.handle);
  if (await isHandleTaken(handle)) {
    reject(SIGN_UP_ERROR_CODES.handleTaken, `@${handle} is already taken.`);
  }
  return { data: { ...user, name: user.name.trim(), handle } };
}
