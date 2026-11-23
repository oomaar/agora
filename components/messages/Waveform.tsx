import { barHeight } from "@/utils/barHeight";
import { cn } from "@/utils/cn";
import { type WaveformProps } from "@/types/messages";

// Loudness bars that share the width; bars up to `progress` show as played.
export function Waveform({
  levels,
  progress = 0,
  playedClassName,
  restClassName,
  className,
}: WaveformProps) {
  const played = Math.round(progress * levels.length);
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-7 items-center gap-0.5", className)}
    >
      {levels.map((level, index) => (
        <span
          key={index}
          className={cn(
            "min-w-0.5 max-w-1 flex-1 rounded-full",
            barHeight(level),
            index < played ? playedClassName : restClassName,
          )}
        />
      ))}
    </span>
  );
}
