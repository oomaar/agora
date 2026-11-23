import "server-only";
import { type NextRequest } from "next/server";
import { DataError } from "@/services/dataError";
import { normalizeHandle } from "@/services/auth/validation";
import { readOwnedMedia } from "@/services/blob/readOwnedMedia";
import {
  API_ERROR_MESSAGES,
  MESSAGE_ERRORS,
  POST_AUDIENCES,
  UPLOAD_PURPOSES,
} from "@/lib/api/constants";
import {
  ATTACHMENT_NAME_MAX_LENGTH,
  MAX_MEDIA_DIMENSION,
  MAX_UPLOAD_BYTES,
  MEDIA_LABELS,
  VOICE_NOTE_MAX_MS,
  WAVEFORM_BARS,
} from "@/lib/media/constants";
import {
  BIO_MAX_LENGTH,
  HANDLE_PATTERN,
  NAME_MAX_LENGTH,
  POST_MAX_LENGTH,
} from "@/lib/data/constants";
import { requireMessageText } from "@/utils/requireMessageText";
import { requirePollOptions } from "@/utils/requirePollOptions";
import { requireText } from "@/utils/requireText";
import { type JsonBody } from "@/types/api";
import { type MessageAttachment } from "@/types/domain";
import { type ProfilePhotoKind, type UploadRequest } from "@/types/media";
import { type PostMedia, type PostMediaKind } from "@/types/post";
import {
  type NewMessage,
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
  const uploaded = readOwnedMedia(media.src, "post", viewerId);
  const url = uploaded.url;
  // The post folder only takes photos and video.
  const kind = uploaded.kind as PostMediaKind;
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

function isObject(value: unknown): value is JsonBody {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Loudness bars of a voice note, each 0–1; anything else is dropped.
function readWaveform(value: unknown): number[] | null {
  if (
    !Array.isArray(value) ||
    !value.length ||
    value.length > WAVEFORM_BARS ||
    value.some((bar) => typeof bar !== "number" || !(bar >= 0 && bar <= 1))
  ) {
    return null;
  }
  return value.map((bar: number) => Math.round(bar * 100) / 100);
}

// The URL must be the viewer's own upload, which also gives the kind; the name,
// size and voice-note details are the browser's and only shown.
function readMessageAttachment(
  value: unknown,
  viewerId: string,
): MessageAttachment {
  if (!isObject(value)) invalid(MESSAGE_ERRORS.attachment);
  const { url, kind } = readOwnedMedia(value.url, "message", viewerId);
  const size = value.size;
  if (
    !Number.isInteger(size) ||
    (size as number) < 1 ||
    (size as number) > MAX_UPLOAD_BYTES[kind]
  ) {
    invalid(MESSAGE_ERRORS.size);
  }
  const name =
    typeof value.name === "string"
      ? value.name.trim().slice(0, ATTACHMENT_NAME_MAX_LENGTH)
      : "";
  const attachment: MessageAttachment = {
    kind,
    url,
    name: name || MEDIA_LABELS[kind],
    size: size as number,
  };
  if (kind === "image" || kind === "video") {
    const width = readDimension(value.width);
    const height = readDimension(value.height);
    if (width && height) Object.assign(attachment, { width, height });
  }
  if (kind === "audio") {
    const durationMs = value.durationMs;
    if (
      Number.isInteger(durationMs) &&
      (durationMs as number) > 0 &&
      (durationMs as number) <= VOICE_NOTE_MAX_MS
    ) {
      attachment.durationMs = durationMs as number;
    }
    const waveform = readWaveform(value.waveform);
    if (waveform) attachment.waveform = waveform;
  }
  return attachment;
}

export function readNewMessage(body: JsonBody, viewerId: string): NewMessage {
  const list = body.attachments ?? [];
  if (!Array.isArray(list)) invalid(MESSAGE_ERRORS.attachment);
  const text = requireMessageText(readString(body, "text"), list.length);
  return {
    text,
    attachments: list.map((item) => readMessageAttachment(item, viewerId)),
  };
}

// An ISO date from the query string, or null when it's missing.
export function readSince(request: NextRequest): string | null {
  const value = request.nextUrl.searchParams.get("since");
  if (value === null) return null;
  const time = Date.parse(value);
  if (Number.isNaN(time)) invalid(MESSAGE_ERRORS.since);
  return new Date(time).toISOString();
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
