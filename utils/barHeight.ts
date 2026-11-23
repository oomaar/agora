import { WAVEFORM_HEIGHTS } from "@/lib/messages/constants";

// The height class for a loudness level (0–1).
export function barHeight(level: number): string {
  const step = Math.round(
    Math.min(1, Math.max(0, level)) * (WAVEFORM_HEIGHTS.length - 1),
  );
  return WAVEFORM_HEIGHTS[step];
}
