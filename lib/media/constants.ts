import { type PostMediaKind } from "@/types/post";
import {
  type MediaType,
  type UploadPurpose,
  type UploadState,
} from "@/types/media";

const MB = 1024 * 1024;

export const MEDIA_TYPES: Record<string, MediaType> = {
  "image/jpeg": { kind: "image", extension: "jpg" },
  "image/png": { kind: "image", extension: "png" },
  "image/webp": { kind: "image", extension: "webp" },
  "image/gif": { kind: "image", extension: "gif" },
  "video/mp4": { kind: "video", extension: "mp4" },
  "video/webm": { kind: "video", extension: "webm" },
  "video/quicktime": { kind: "video", extension: "mov" },
};

const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Posts take photos (GIFs too) and video; profile photos are still images.
export const UPLOAD_TYPES: Record<UploadPurpose, readonly string[]> = {
  post: Object.keys(MEDIA_TYPES),
  avatar: PHOTO_TYPES,
  cover: PHOTO_TYPES,
};

export const MAX_UPLOAD_BYTES: Record<PostMediaKind, number> = {
  image: 8 * MB,
  video: 50 * MB,
};

// The file picker's `accept` for each kind of post media.
export const POST_MEDIA_ACCEPT: Record<PostMediaKind, string> = {
  image: UPLOAD_TYPES.post
    .filter((type) => MEDIA_TYPES[type].kind === "image")
    .join(","),
  video: UPLOAD_TYPES.post
    .filter((type) => MEDIA_TYPES[type].kind === "video")
    .join(","),
};

export const PHOTO_ACCEPT = PHOTO_TYPES.join(",");

// Post media has no alt text field yet, so the label names the kind.
export const MEDIA_LABELS: Record<PostMediaKind, string> = {
  image: "Photo",
  video: "Video",
};

export const IDLE_UPLOAD: UploadState = {
  status: "idle",
  file: null,
  kind: null,
  previewUrl: null,
  size: null,
  progress: 0,
  url: null,
  error: null,
};

// Width or height beyond this is ignored as a measuring error.
export const MAX_MEDIA_DIMENSION = 20000;

export const BLOB_API_URL = "https://vercel.com/api/blob";

// The Blob API version the official client speaks (@vercel/blob 2.8).
export const BLOB_API_VERSION = "13";

export const UPLOAD_GRANT_TTL_MS = 10 * 60 * 1000;

export const UPLOAD_ERRORS = {
  type: {
    post: "Choose a JPG, PNG, WebP or GIF photo, or an MP4, WebM or MOV video.",
    avatar: "Choose a JPG, PNG or WebP photo.",
    cover: "Choose a JPG, PNG or WebP photo.",
  } satisfies Record<UploadPurpose, string>,
  size: (kind: PostMediaKind) =>
    `${kind === "image" ? "Photos" : "Videos"} can be up to ${MAX_UPLOAD_BYTES[kind] / MB} MB.`,
  failed: "The upload didn't finish. Check your connection and try again.",
  notConfigured: "Uploads aren't set up on this server yet.",
  foreign: "That file wasn't uploaded to Agora by you.",
  pending: "Wait for the upload to finish, or remove it.",
  retry: "The upload failed. Retry it, or remove it.",
};
