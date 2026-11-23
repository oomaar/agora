import {
  type MessageAttachment,
  type OutgoingAttachment,
} from "@/types/domain";

// What's sent and shown for a file the browser holds, at `url` (its upload, or
// its local preview while it's sending).
export function toMessageAttachment(
  { kind, name, size, width, height, durationMs, waveform }: OutgoingAttachment,
  url: string,
): MessageAttachment {
  return { kind, url, name, size, width, height, durationMs, waveform };
}
