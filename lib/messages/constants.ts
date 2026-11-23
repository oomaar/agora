import { WAVEFORM_BARS } from "@/lib/media/constants";
import { type MediaKind } from "@/types/media";

export const MESSAGES_PATH = "/messages";

// Someone counts as active when their latest message is this recent.
export const ACTIVE_NOW_MINUTES = 5;

export const PEOPLE_SEARCH_DELAY_MS = 250;

export const CONVERSATION_SKELETON_COUNT = 6;

export const NO_MESSAGES_PREVIEW = "No messages yet";

export const PEOPLE_SKELETON_COUNT = 4;

// Width and side of each placeholder bubble while a conversation loads.
export const BUBBLE_SKELETONS = ["w-[55%]", "w-[40%] self-end", "w-[60%]"];

// While a conversation is open (and the tab is visible), new messages and typing
// status are checked this often.
export const CHAT_POLL_MS = 2000;

// While you type, the other members are told at most this often.
export const TYPING_PING_MS = 3000;

export const ATTACHMENT_SUMMARY_PLURALS: Record<MediaKind, string> = {
  image: "photos",
  video: "videos",
  audio: "voice notes",
  file: "files",
};

// Voice note formats, in order of preference: Chrome and Firefox record WebM,
// Safari records MP4.
export const RECORDER_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
];

// How often the microphone's loudness is sampled while recording.
export const VOICE_LEVEL_SAMPLE_MS = 100;

// Live bars shown while recording.
export const LIVE_LEVEL_BARS = 28;

// Shorter recordings aren't sent.
export const VOICE_NOTE_MIN_MS = 1000;

export const VOICE_ERRORS = {
  permission:
    "Agora can't use your microphone. Allow it in your browser's settings and try again.",
  tooShort: "That voice note was too short to send.",
  failed: "The recording didn't work. Try again.",
};

// Bar heights for waveforms, from silent to loudest (classes, so no inline styles).
export const WAVEFORM_HEIGHTS = [
  "h-[12%]",
  "h-[20%]",
  "h-[30%]",
  "h-[40%]",
  "h-[50%]",
  "h-[60%]",
  "h-[70%]",
  "h-[80%]",
  "h-[90%]",
  "h-full",
];

// Waveform shown for a voice note recorded without loudness data.
export const FLAT_WAVEFORM = Array.from({ length: WAVEFORM_BARS }, () => 0.3);

// The three typing dots start one after another.
export const TYPING_DOT_DELAYS = [
  "[animation-delay:0ms]",
  "[animation-delay:160ms]",
  "[animation-delay:320ms]",
];

// Tile shapes for 1–4 photos and videos in a message.
export const MEDIA_GRID_COLUMNS = [
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-2",
  "grid-cols-2",
];
