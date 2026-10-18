import { COUNTER_MAX, COUNTER_TONES } from "@/lib/ui/badge";
import { formatCounter } from "@/utils/formatCounter";
import { cn } from "@/utils/cn";
import { type CounterProps } from "@/types/badge";

export function Counter({
  value,
  max = COUNTER_MAX,
  tone = "accent",
  label,
  className,
}: CounterProps) {
  if (value <= 0) return null;
  return (
    <span
      aria-label={label}
      className={cn(
        "inline-grid h-5 min-w-5 flex-none place-items-center rounded-md px-1.5 text-[11.5px] font-bold leading-none",
        COUNTER_TONES[tone],
        className,
      )}
    >
      {formatCounter(value, max)}
    </span>
  );
}
