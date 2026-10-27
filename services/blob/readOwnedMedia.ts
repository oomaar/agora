import "server-only";
import { DataError } from "@/services/dataError";
import { blobBaseUrl } from "@/services/blob/blobStore";
import { MEDIA_TYPES, UPLOAD_ERRORS } from "@/lib/media/constants";
import { type UploadedMedia, type UploadPurpose } from "@/types/media";

const KIND_BY_EXTENSION = new Map(
  Object.values(MEDIA_TYPES).map((type) => [type.extension, type.kind]),
);

// Accepts only a file this viewer uploaded for this purpose (see createUploadGrant),
// and tells photo from video by its extension.
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
  const kind = /^[\w-]+\.(\w+)$/.test(name)
    ? KIND_BY_EXTENSION.get(name.split(".")[1])
    : undefined;
  if (!kind || (purpose !== "post" && kind !== "image")) {
    throw new DataError("validation", UPLOAD_ERRORS.foreign);
  }
  return { url: value, kind };
}
