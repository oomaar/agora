import { type NavLinkVariant } from "@/types/shell";

type NavLinkStyles = {
  base: string;
  active: string;
  inactive: string;
  iconSize: number;
};

export const NAV_LINK_VARIANTS: Record<NavLinkVariant, NavLinkStyles> = {
  // Icon-only below the nav breakpoint, icon + label above it.
  sidebar: {
    base: "relative flex h-11 items-center justify-center gap-3.5 rounded-md px-3 text-[15px] outline-none transition-colors hover:bg-ag-nav-hover focus-visible:shadow-ag-focus-ring nav:justify-start",
    active: "bg-ag-raised font-semibold text-ag-text",
    inactive: "font-medium text-ag-text-secondary",
    iconSize: 20,
  },
  tab: {
    base: "flex h-full w-13 flex-col items-center gap-1 pt-3 text-[10.5px] outline-none focus-visible:shadow-ag-focus-ring",
    active: "text-ag-text",
    inactive: "text-ag-text-secondary",
    iconSize: 22,
  },
};

// Sticky shell columns span the viewport height and scroll on their own.
export const SHELL_COLUMN = "sticky top-0 h-dvh flex-none overflow-y-auto";

export const SHELL_MAIN = "min-w-0 flex-1 border-r border-ag-border-subtle";
