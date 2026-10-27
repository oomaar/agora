import {
  MAX_UPLOAD_BYTES,
  MEDIA_TYPES,
  UPLOAD_ERRORS,
  UPLOAD_TYPES,
} from "@/lib/media/constants";
import { type UploadPurpose } from "@/types/media";

// Why a file can't be uploaded for this purpose, or null when it can.
// The browser checks before uploading; the server checks again before granting.
export function checkUpload(
  purpose: UploadPurpose,
  contentType: string,
  size: number,
): string | null {
  if (!UPLOAD_TYPES[purpose].includes(contentType)) {
    return UPLOAD_ERRORS.type[purpose];
  }
  const { kind } = MEDIA_TYPES[contentType];
  if (size <= 0 || size > MAX_UPLOAD_BYTES[kind]) {
    return UPLOAD_ERRORS.size(kind);
  }
  return null;
}
