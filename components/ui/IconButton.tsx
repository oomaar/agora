import { Icon } from "@/components/ui/Icon";
import {
  ICON_BUTTON_BASE,
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
        ICON_BUTTON_BASE,
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
