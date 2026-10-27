import "server-only";
import { type NextRequest } from "next/server";
import { DataError } from "@/services/dataError";
import { normalizeHandle } from "@/services/auth/validation";
import { readOwnedMedia } from "@/services/blob/readOwnedMedia";
import {
  API_ERROR_MESSAGES,
  POST_AUDIENCES,
  UPLOAD_PURPOSES,
} from "@/lib/api/constants";
import { MAX_MEDIA_DIMENSION, MEDIA_LABELS } from "@/lib/media/constants";
import {
  BIO_MAX_LENGTH,
  HANDLE_PATTERN,
  NAME_MAX_LENGTH,
  POST_MAX_LENGTH,
} from "@/lib/data/constants";
import { requirePollOptions } from "@/utils/requirePollOptions";
import { requireText } from "@/utils/requireText";
import { type JsonBody } from "@/types/api";
import { type ProfilePhotoKind, type UploadRequest } from "@/types/media";
import { type PostMedia } from "@/types/post";
import {
  type NewPost,
  type ProfileUpdate,
  type SettingsUpdate,
} from "@/types/dataSource";

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

// Pixel size measured in the browser, so posts can show media at its own shape.
function readDimension(value: unknown): number | null {
  return Number.isInteger(value) &&
    (value as number) > 0 &&
    (value as number) <= MAX_MEDIA_DIMENSION
    ? (value as number)
    : null;
}

// The file's URL is checked; kind and label come from the server.
function readPostMedia(value: unknown, viewerId: string): PostMedia | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "object" || Array.isArray(value)) {
    invalid('"media" must be an object with a "src".');
  }
  const media = value as JsonBody;
  const { url, kind } = readOwnedMedia(media.src, "post", viewerId);
  const width = readDimension(media.width);
  const height = readDimension(media.height);
  return {
    kind,
    label: MEDIA_LABELS[kind],
    src: url,
    ...(width && height ? { width, height } : {}),
  };
}

export function readNewPost(body: JsonBody, viewerId: string): NewPost {
  return {
    text: requireText(readString(body, "text"), POST_MAX_LENGTH, "Your post"),
    audience: readOption(body.audience, POST_AUDIENCES, "Audience"),
    media: readPostMedia(body.media, viewerId),
    poll: readPoll(body.poll),
  };
}

export function readUploadRequest(body: JsonBody): UploadRequest {
  const size = body.size;
  if (typeof size !== "number" || !Number.isInteger(size)) {
    invalid('"size" must be a whole number of bytes.');
  }
  return {
    purpose: readOption(body.purpose, UPLOAD_PURPOSES, "Purpose"),
    contentType: readString(body, "contentType"),
    size,
  };
}

export function readPhotoUrl(
  body: JsonBody,
  kind: ProfilePhotoKind,
  viewerId: string,
): string {
  return readOwnedMedia(body.url, kind, viewerId).url;
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

function readOptionalBoolean(body: JsonBody, key: string): boolean | undefined {
  const value = body[key];
  if (value === undefined) return undefined;
  if (typeof value !== "boolean") invalid(`"${key}" must be true or false.`);
  return value;
}

// Every setting is optional; only the ones sent change.
export function readSettingsUpdate(body: JsonBody): SettingsUpdate {
  return {
    defaultAudience:
      body.defaultAudience === undefined
        ? undefined
        : readOption(body.defaultAudience, POST_AUDIENCES, "Default audience"),
    notifyLikes: readOptionalBoolean(body, "notifyLikes"),
    notifyReplies: readOptionalBoolean(body, "notifyReplies"),
    notifyFollows: readOptionalBoolean(body, "notifyFollows"),
  };
}
