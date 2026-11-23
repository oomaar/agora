import { Waveform } from "@/components/messages/Waveform";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { LIVE_LEVEL_BARS } from "@/lib/messages/constants";
import { formatDuration } from "@/utils/formatDuration";
import { type VoiceRecorderBarProps } from "@/types/messages";

// Stands in for the composer while recording: discard, a pulsing dot with the time
// and live loudness bars, and Send.
export function VoiceRecorderBar({
  elapsedMs,
  levels,
  starting,
  onCancel,
  onSend,
}: VoiceRecorderBarProps) {
  // New bars come in on the right.
  const bars = [
    ...Array.from({ length: LIVE_LEVEL_BARS - levels.length }, () => 0),
    ...levels,
  ];
  return (
    <div
      role="group"
      aria-label="Voice note"
      className="flex items-center gap-2"
    >
      <IconButton icon="trash" label="Discard voice note" onClick={onCancel} />
      <div className="flex h-10 min-w-0 flex-1 items-center gap-3 rounded-full border border-ag-border px-4">
        <span
          aria-hidden="true"
          className="size-2.5 flex-none rounded-full bg-ag-danger motion-safe:animate-pulse"
        />
        <span className="flex-none font-mono text-[13px] tabular-nums">
          <span className="sr-only">
            {starting ? "Opening the microphone" : "Recording"},{" "}
          </span>
          {formatDuration(elapsedMs)}
        </span>
        <Waveform
          levels={bars}
          playedClassName="bg-ag-text-secondary"
          restClassName="bg-ag-text-secondary"
          className="min-w-0 flex-1"
        />
      </div>
      <Button pill onClick={onSend} disabled={starting}>
        Send
      </Button>
    </div>
  );
}
