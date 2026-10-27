import { DataError } from "@/services/dataError";
import {
  BLOB_API_URL,
  BLOB_API_VERSION,
  UPLOAD_ERRORS,
} from "@/lib/media/constants";
import { type UploadGrant, type UploadOptions } from "@/types/media";

// PUTs the file to Blob with the granted token, the request @vercel/blob's client
// `put` makes. XMLHttpRequest because fetch can't report upload progress.
export function uploadToBlob(
  file: File,
  { token, pathname }: UploadGrant,
  { onProgress, signal }: UploadOptions = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const fail = () => reject(new DataError("network", UPLOAD_ERRORS.failed));
    xhr.open("PUT", `${BLOB_API_URL}/?${new URLSearchParams({ pathname })}`);
    xhr.setRequestHeader("authorization", `Bearer ${token}`);
    xhr.setRequestHeader("x-api-version", BLOB_API_VERSION);
    xhr.setRequestHeader("x-vercel-blob-access", "public");
    xhr.setRequestHeader("x-content-type", file.type);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress?.(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      let url: string | undefined;
      try {
        url = (JSON.parse(xhr.responseText) as { url?: string }).url;
      } catch {}
      if (xhr.status >= 200 && xhr.status < 300 && url) {
        onProgress?.(100);
        resolve(url);
      } else fail();
    };
    xhr.onerror = fail;
    xhr.onabort = fail;
    signal?.addEventListener("abort", () => xhr.abort());
    xhr.send(file);
  });
}
