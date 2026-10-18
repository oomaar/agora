import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/Spinner";
import {
  BUTTON_BASE,
  BUTTON_ICON_SIZES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  PILL_VARIANTS,
} from "@/lib/ui/button";
import { cn } from "@/utils/cn";
import { type ButtonProps } from "@/types/button";

export function Button({
  variant = "primary",
  size = "md",
  pill = false,
  fullWidth = false,
  loading = false,
  icon,
  type = "button",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const rounded =
    pill || PILL_VARIANTS.includes(variant) ? "rounded-full" : "rounded-md";
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        BUTTON_BASE,
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        rounded,
        fullWidth && "w-full",
        loading && "disabled:cursor-wait disabled:opacity-80",
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        icon && <Icon name={icon} size={BUTTON_ICON_SIZES[size]} />
      )}
      {children}
    </button>
  );
}
