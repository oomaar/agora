import { type PostMediaKind } from "@/types/post";
import {
  type MediaKind,
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
  // Voice notes, as each browser records them. Extensions stay unique, so the
  // API can tell the kind from a file's URL (webm audio is .weba).
  "audio/webm": { kind: "audio", extension: "weba" },
  "audio/mp4": { kind: "audio", extension: "m4a" },
  "audio/ogg": { kind: "audio", extension: "ogg" },
  "application/pdf": { kind: "file", extension: "pdf" },
  "application/msword": { kind: "file", extension: "doc" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    kind: "file",
    extension: "docx",
  },
  "application/vnd.ms-excel": { kind: "file", extension: "xls" },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    kind: "file",
    extension: "xlsx",
  },
  "application/vnd.ms-powerpoint": { kind: "file", extension: "ppt" },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    kind: "file",
    extension: "pptx",
  },
  "text/plain": { kind: "file", extension: "txt" },
  "text/csv": { kind: "file", extension: "csv" },
};

const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

function typesOf(...kinds: MediaKind[]): string[] {
  return Object.keys(MEDIA_TYPES).filter((type) =>
    kinds.includes(MEDIA_TYPES[type].kind),
  );
}

// Posts take photos (GIFs too) and video; profile photos are still images;
// messages take everything, voice notes included.
export const UPLOAD_TYPES: Record<UploadPurpose, readonly string[]> = {
  post: typesOf("image", "video"),
  avatar: PHOTO_TYPES,
  cover: PHOTO_TYPES,
  message: Object.keys(MEDIA_TYPES),
};

export const MAX_UPLOAD_BYTES: Record<MediaKind, number> = {
  image: 8 * MB,
  video: 50 * MB,
  audio: 10 * MB,
  file: 20 * MB,
};

// The chat's file picker: photos, video and documents. Voice notes are recorded.
export const MESSAGE_ATTACHMENT_ACCEPT = typesOf("image", "video", "file").join(
  ",",
);

// A voice note stops recording at this length.
export const VOICE_NOTE_MAX_MS = 2 * 60 * 1000;

// Bars in a voice note's waveform.
export const WAVEFORM_BARS = 40;

// Longer file names are cut before they're saved.
export const ATTACHMENT_NAME_MAX_LENGTH = 120;

// The file picker's `accept` for each kind of post media.
export const POST_MEDIA_ACCEPT: Record<PostMediaKind, string> = {
  image: typesOf("image").join(","),
  video: typesOf("video").join(","),
};

export const PHOTO_ACCEPT = PHOTO_TYPES.join(",");

// Media has no alt text field yet, so the label names the kind.
export const MEDIA_LABELS: Record<MediaKind, string> = {
  image: "Photo",
  video: "Video",
  audio: "Voice note",
  file: "Document",
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

const UPLOAD_SIZE_LABELS: Record<MediaKind, string> = {
  image: "Photos",
  video: "Videos",
  audio: "Voice notes",
  file: "Documents",
};

export const UPLOAD_ERRORS = {
  type: {
    post: "Choose a JPG, PNG, WebP or GIF photo, or an MP4, WebM or MOV video.",
    avatar: "Choose a JPG, PNG or WebP photo.",
    cover: "Choose a JPG, PNG or WebP photo.",
    message:
      "Choose a photo, a video, or a PDF, Word, Excel, PowerPoint, text or CSV file.",
  } satisfies Record<UploadPurpose, string>,
  size: (kind: MediaKind) =>
    `${UPLOAD_SIZE_LABELS[kind]} can be up to ${MAX_UPLOAD_BYTES[kind] / MB} MB.`,
  failed: "The upload didn't finish. Check your connection and try again.",
  notConfigured: "Uploads aren't set up on this server yet.",
  foreign: "That file wasn't uploaded to Agora by you.",
  pending: "Wait for the upload to finish, or remove it.",
  retry: "The upload failed. Retry it, or remove it.",
};
