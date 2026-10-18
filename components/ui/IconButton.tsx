import { Icon } from "@/components/ui/Icon";
import {
  ICON_BUTTON_ICON_SIZES,
  ICON_BUTTON_SIZES,
  ICON_BUTTON_VARIANTS,
} from "@/lib/ui/button";
import { cn } from "@/utils/cn";
import { type IconButtonProps } from "@/types/button";

export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "grid flex-none cursor-pointer place-items-center rounded-full outline-none transition-colors focus-visible:shadow-ag-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        ICON_BUTTON_VARIANTS[variant],
        ICON_BUTTON_SIZES[size],
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={ICON_BUTTON_ICON_SIZES[size]} />
    </button>
  );
}
