import { type PostMediaKind } from "@/types/post";

// What an upload is for; each purpose has its own folder in the Blob store.
export type UploadPurpose = "post" | "avatar" | "cover";

export type ProfilePhotoKind = Exclude<UploadPurpose, "post">;

export type MediaType = {
  kind: PostMediaKind;
  extension: string;
};

export type UploadRequest = {
  purpose: UploadPurpose;
  contentType: string;
  size: number;
};

// A short-lived permission to upload one file straight to Blob at `pathname`.
export type UploadGrant = {
  token: string;
  pathname: string;
};

export type UploadedMedia = {
  url: string;
  kind: PostMediaKind;
};

export type UploadOptions = {
  // 0–100.
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
};

export type UploadStatus = "idle" | "uploading" | "uploaded" | "failed";

export type MediaSize = {
  width: number;
  height: number;
};

export type UploadState = {
  status: UploadStatus;
  file: File | null;
  kind: PostMediaKind | null;
  previewUrl: string | null;
  // Measured from the preview, so posts can show the file at its own shape.
  size: MediaSize | null;
  progress: number;
  url: string | null;
  error: string | null;
};

// The upload in flight and the preview it owns.
export type ActiveUpload = {
  controller: AbortController;
  previewUrl: string;
};

export type MediaUpload = {
  status: UploadStatus;
  kind: PostMediaKind | null;
  // A local preview of the picked file.
  previewUrl: string | null;
  size: MediaSize | null;
  progress: number;
  url: string | null;
  error: string | null;
  // Resolves with the upload, or null if it failed or was replaced.
  start: (file: File) => Promise<UploadedMedia | null>;
  retry: () => Promise<UploadedMedia | null>;
  clear: () => void;
};

export type ProfilePhotoChange = {
  kind: ProfilePhotoKind;
  // null removes the photo.
  url: string | null;
};
