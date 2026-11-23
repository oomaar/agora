import { RECORDER_TYPES } from "@/lib/messages/constants";

// The first voice note format this browser can record, or null to let it choose.
export function pickRecorderType(): string | null {
  return (
    RECORDER_TYPES.find((type) => MediaRecorder.isTypeSupported(type)) ?? null
  );
}
