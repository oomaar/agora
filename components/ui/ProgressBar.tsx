import { PROGRESS_BAR } from "@/lib/ui/progress";
import { cn } from "@/utils/cn";
import { type ProgressBarProps } from "@/types/progress";

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  return (
    <progress
      value={value}
      max={100}
      aria-label={label}
      className={cn(PROGRESS_BAR, className)}
    />
  );
}
