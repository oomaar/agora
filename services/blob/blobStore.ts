import "server-only";
import { DataError } from "@/services/dataError";
import { UPLOAD_ERRORS } from "@/lib/media/constants";

// BLOB_READ_WRITE_TOKEN looks like vercel_blob_rw_<storeId>_<secret>.
export function readWriteToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new DataError("network", UPLOAD_ERRORS.notConfigured);
  return token;
}

export function blobStoreId(token: string): string {
  return token.split("_")[3] ?? "";
}

// Where the store serves public files, e.g. https://abc123.public.blob.vercel-storage.com/
export function blobBaseUrl(): string {
  return `https://${blobStoreId(readWriteToken()).toLowerCase()}.public.blob.vercel-storage.com/`;
}
