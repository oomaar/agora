import {
  type ButtonSize,
  type ButtonVariant,
  type IconButtonSize,
  type IconButtonVariant,
} from "@/types/button";

export const BUTTON_BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap outline-none transition-colors focus-visible:shadow-ag-focus-ring disabled:cursor-not-allowed disabled:opacity-50";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-ag-accent font-semibold text-ag-on-accent enabled:hover:bg-ag-accent-hover",
  secondary: "border border-ag-border-strong text-ag-text enabled:hover:bg-ag-hover",
  demo: "border border-ag-demo font-semibold text-ag-demo-text enabled:hover:bg-ag-demo-soft",
  danger: "bg-ag-danger font-semibold text-ag-on-danger enabled:hover:opacity-90",
  dangerOutline: "border border-ag-danger-border text-ag-danger-text enabled:hover:bg-ag-danger-surface",
  follow: "bg-ag-text font-semibold text-ag-bg enabled:hover:opacity-90",
  following: "border border-ag-border-strong font-semibold text-ag-text enabled:hover:bg-ag-hover",
};

// Follow buttons are always pills.
export const PILL_VARIANTS: ButtonVariant[] = ["follow", "following"];

export const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-[13px]",
  md: "h-10 px-[18px] text-[14px]",
  lg: "h-11 px-6 text-[15px]",
};

export const BUTTON_ICON_SIZES: Record<ButtonSize, number> = {
  sm: 15,
  md: 17,
  lg: 18,
};

export const ICON_BUTTON_VARIANTS: Record<IconButtonVariant, string> = {
  ghost: "text-ag-text-secondary enabled:hover:bg-ag-hover enabled:hover:text-ag-text",
  outline: "border border-ag-border text-ag-text enabled:hover:bg-ag-hover",
  soft: "bg-ag-raised text-ag-text enabled:hover:bg-ag-border",
};

export const ICON_BUTTON_SIZES: Record<IconButtonSize, string> = {
  sm: "size-[30px]",
  md: "size-[34px]",
  lg: "size-11",
};

export const ICON_BUTTON_ICON_SIZES: Record<IconButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};
