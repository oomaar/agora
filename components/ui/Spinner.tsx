import { SPINNER_SIZES } from "@/lib/ui/spinner";
import { cn } from "@/utils/cn";
import { type SpinnerProps } from "@/types/spinner";

export function Spinner({ size = "sm", label, className }: SpinnerProps) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "inline-block flex-none rounded-full border-current/30 border-t-current motion-safe:animate-spin",
        SPINNER_SIZES[size],
        className,
      )}
    />
  );
}
