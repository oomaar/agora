// BLOB_READ_WRITE_TOKEN looks like vercel_blob_rw_<storeId>_<secret>; the store serves
// public files from <storeid>.public.blob.vercel-storage.com.
export function blobHostname(token: string): string {
  const storeId = token.split("_")[3] ?? "";
  return `${storeId.toLowerCase()}.public.blob.vercel-storage.com`;
}
