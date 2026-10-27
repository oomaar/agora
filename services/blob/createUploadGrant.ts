import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import { DataError } from "@/services/dataError";
import { blobStoreId, readWriteToken } from "@/services/blob/blobStore";
import {
  MAX_UPLOAD_BYTES,
  MEDIA_TYPES,
  UPLOAD_GRANT_TTL_MS,
} from "@/lib/media/constants";
import { checkUpload } from "@/utils/checkUpload";
import { type UploadGrant, type UploadRequest } from "@/types/media";

// Signs a Blob client token the same way @vercel/blob does: Blob only accepts the
// upload at this pathname, with this content type and size, before it expires.
// Files go in <purpose>/<userId>/, which is how the API later checks who uploaded them.
export function createUploadGrant(
  viewerId: string,
  { purpose, contentType, size }: UploadRequest,
): UploadGrant {
  const problem = checkUpload(purpose, contentType, size);
  if (problem) throw new DataError("validation", problem);
  const { kind, extension } = MEDIA_TYPES[contentType];
  const pathname = `${purpose}/${viewerId}/${randomUUID()}.${extension}`;
  const secret = readWriteToken();
  const payload = Buffer.from(
    JSON.stringify({
      pathname,
      allowedContentTypes: [contentType],
      maximumSizeInBytes: MAX_UPLOAD_BYTES[kind],
      addRandomSuffix: false,
      allowOverwrite: false,
      validUntil: Date.now() + UPLOAD_GRANT_TTL_MS,
    }),
  ).toString("base64");
  const signature = createHmac("sha256", secret).update(payload).digest("hex");
  const token = `vercel_blob_client_${blobStoreId(secret)}_${Buffer.from(`${signature}.${payload}`).toString("base64")}`;
  return { token, pathname };
}
