import { BADGE_VARIANTS } from "@/lib/ui/badge";
import { cn } from "@/utils/cn";
import { type BadgeProps } from "@/types/badge";

export function Badge({
  variant = "outline",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex flex-none items-center whitespace-nowrap rounded-full",
        BADGE_VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
