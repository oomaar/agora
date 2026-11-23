"use client";

import { Waveform } from "@/components/messages/Waveform";
import { Icon } from "@/components/ui/Icon";
import { useVoicePlayer } from "@/hooks/messages/useVoicePlayer";
import { FLAT_WAVEFORM } from "@/lib/messages/constants";
import { TAP_TARGET } from "@/lib/ui/tapTarget";
import { formatDuration } from "@/utils/formatDuration";
import { cn } from "@/utils/cn";
import { type VoiceNotePlayerProps } from "@/types/messages";

// Play / pause, the waveform (a slider underneath, for seeking with a pointer or
// the arrow keys) and the time: the length until it plays, then the position.
export function VoiceNotePlayer({
  attachment,
  fromSelf,
}: VoiceNotePlayerProps) {
  const { ref, audioProps, ...player } = useVoicePlayer(attachment.durationMs);
  const levels = attachment.waveform?.length
    ? attachment.waveform
    : FLAT_WAVEFORM;
  const progress = player.totalMs ? player.currentMs / player.totalMs : 0;
  const started = player.playing || player.currentMs > 0;
  return (
    <div className="flex w-64 max-w-full items-center gap-2.5 py-1 pl-1 pr-2.5">
      <button
        type="button"
        onClick={player.toggle}
        aria-label={player.playing ? "Pause voice note" : "Play voice note"}
        className={cn(
          TAP_TARGET,
          "grid size-9 flex-none cursor-pointer place-items-center rounded-full outline-none transition-[scale] active:scale-95 focus-visible:shadow-ag-focus-ring",
          fromSelf
            ? "bg-ag-on-accent text-ag-accent"
            : "bg-ag-accent text-ag-on-accent",
        )}
      >
        <Icon name={player.playing ? "pause" : "play"} size={16} />
      </button>
      <span className="relative flex min-w-0 flex-1 rounded-sm has-focus-visible:shadow-ag-focus-ring">
        <Waveform
          levels={levels}
          progress={progress}
          playedClassName={fromSelf ? "bg-ag-on-accent" : "bg-ag-accent"}
          restClassName={
            fromSelf ? "bg-ag-on-accent/45" : "bg-ag-text-secondary/45"
          }
          className="w-full"
        />
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.round(player.totalMs))}
          step={100}
          value={Math.round(player.currentMs)}
          onChange={(event) => player.seek(Number(event.target.value))}
          disabled={!player.totalMs}
          aria-label="Voice note position"
          aria-valuetext={`${formatDuration(player.currentMs)} of ${formatDuration(player.totalMs)}`}
          className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-default"
        />
      </span>
      <span
        className={cn(
          "w-8.5 flex-none text-right font-mono text-[11.5px]",
          fromSelf ? "text-ag-on-accent" : "text-ag-text-secondary",
        )}
      >
        {formatDuration(started ? player.currentMs : player.totalMs)}
      </span>
      <audio
        ref={ref}
        src={attachment.url}
        preload="metadata"
        {...audioProps}
      />
    </div>
  );
}
