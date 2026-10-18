import { ICON_SHAPES } from "@/lib/ui/iconShapes";
import { cn } from "@/utils/cn";
import { type IconProps } from "@/types/icon";

export function Icon({
  name,
  size = 20,
  filled = false,
  strokeWidth = 1.8,
  title,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("block flex-none", className)}
      {...props}
    >
      {title && <title>{title}</title>}
      {ICON_SHAPES[name]}
    </svg>
  );
}
