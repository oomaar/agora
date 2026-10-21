import "server-only";
import { type NextRequest } from "next/server";
import { DataError } from "@/services/dataError";
import { normalizeHandle } from "@/services/auth/validation";
import { API_ERROR_MESSAGES, POST_AUDIENCES } from "@/lib/api/constants";
import {
  BIO_MAX_LENGTH,
  HANDLE_PATTERN,
  NAME_MAX_LENGTH,
  POST_MAX_LENGTH,
} from "@/lib/data/constants";
import { requirePollOptions } from "@/utils/requirePollOptions";
import { requireText } from "@/utils/requireText";
import { type JsonBody } from "@/types/api";
import { type NewPost, type ProfileUpdate } from "@/types/dataSource";

function invalid(message: string): never {
  throw new DataError("validation", message);
}

export async function readJson(request: NextRequest): Promise<JsonBody> {
  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    invalid(API_ERROR_MESSAGES.invalidJson);
  }
  return body as JsonBody;
}

export function readString(body: JsonBody, key: string): string {
  const value = body[key];
  if (typeof value !== "string") invalid(`"${key}" must be a string.`);
  return value;
}

export function readOption<T extends string>(
  value: unknown,
  allowed: readonly T[],
  label: string,
): T {
  if (!allowed.includes(value as T)) {
    invalid(`${label} must be one of: ${allowed.join(", ")}.`);
  }
  return value as T;
}

// A search parameter that defaults to the first allowed value when missing.
export function readParam<T extends string>(
  request: NextRequest,
  key: string,
  allowed: readonly T[],
): T {
  const value = request.nextUrl.searchParams.get(key);
  return value === null ? allowed[0] : readOption(value, allowed, `"${key}"`);
}

export function readLimit(
  request: NextRequest,
  key: string,
  max: number,
): number {
  const value = Number(request.nextUrl.searchParams.get(key) ?? max);
  if (!Number.isInteger(value) || value < 1) {
    invalid(`"${key}" must be a positive whole number.`);
  }
  return Math.min(value, max);
}

function readPoll(value: unknown): string[] | null {
  if (value === null || value === undefined) return null;
  if (
    !Array.isArray(value) ||
    value.some((option) => typeof option !== "string")
  ) {
    invalid('"poll" must be a list of option texts.');
  }
  return requirePollOptions(value);
}

export function readNewPost(body: JsonBody): NewPost {
  // Photo and video uploads arrive in the media phase; until then posts are text only.
  if (body.media !== null && body.media !== undefined) {
    invalid("Photos and videos can't be attached yet.");
  }
  return {
    text: requireText(readString(body, "text"), POST_MAX_LENGTH, "Your post"),
    audience: readOption(body.audience, POST_AUDIENCES, "Audience"),
    media: null,
    poll: readPoll(body.poll),
  };
}

export function readProfileUpdate(body: JsonBody): ProfileUpdate {
  const handle = normalizeHandle(readString(body, "handle"));
  if (!HANDLE_PATTERN.test(handle)) {
    invalid(
      "Handles use 2–30 lowercase letters, numbers, dots or underscores.",
    );
  }
  const bio = readString(body, "bio").trim();
  if (bio.length > BIO_MAX_LENGTH) {
    invalid(`Your bio can be up to ${BIO_MAX_LENGTH} characters.`);
  }
  return {
    name: requireText(readString(body, "name"), NAME_MAX_LENGTH, "Your name"),
    handle,
    bio,
  };
}
