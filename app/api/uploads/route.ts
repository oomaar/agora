import { createUploadGrant } from "@/services/blob/createUploadGrant";
import { readJson, readUploadRequest } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";

// Grants a short-lived token to upload one file from the browser straight to Blob.
export const POST = withViewer(async ({ request, viewerId }) =>
  createUploadGrant(viewerId, readUploadRequest(await readJson(request))),
);
