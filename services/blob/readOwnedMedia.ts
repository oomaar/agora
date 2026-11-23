import "server-only";
import { DataError } from "@/services/dataError";
import { blobBaseUrl } from "@/services/blob/blobStore";
import {
  MEDIA_TYPES,
  UPLOAD_ERRORS,
  UPLOAD_TYPES,
} from "@/lib/media/constants";
import { type UploadedMedia, type UploadPurpose } from "@/types/media";

// Accepts only a file this viewer uploaded for this purpose (see createUploadGrant),
// and tells its kind (photo, video, voice note, document) by its extension.
export function readOwnedMedia(
  value: unknown,
  purpose: UploadPurpose,
  viewerId: string,
): UploadedMedia {
  const prefix = `${blobBaseUrl()}${purpose}/${viewerId}/`;
  if (typeof value !== "string" || !value.startsWith(prefix)) {
    throw new DataError("validation", UPLOAD_ERRORS.foreign);
  }
  const name = value.slice(prefix.length);
  const type = /^[\w-]+\.(\w+)$/.test(name)
    ? UPLOAD_TYPES[purpose]
        .map((contentType) => MEDIA_TYPES[contentType])
        .find((type) => type.extension === name.split(".")[1])
    : undefined;
  if (!type) throw new DataError("validation", UPLOAD_ERRORS.foreign);
  return { url: value, kind: type.kind };
}
