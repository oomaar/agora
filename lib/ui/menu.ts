import { type MenuTriggerVariant } from "@/types/menu";

export const MENU_TRIGGER_BASE =
  "cursor-pointer outline-none transition-colors focus-visible:shadow-ag-focus-ring";

export const MENU_TRIGGER_VARIANTS: Record<MenuTriggerVariant, string> = {
  icon: "grid min-h-8.5 min-w-8.5 place-items-center rounded-full text-ag-text-secondary hover:bg-ag-hover hover:text-ag-text",
  chip: "inline-flex items-center gap-1 rounded-full border border-ag-accent-border py-[3px] pl-2.5 pr-2 text-caption text-ag-accent-text hover:bg-ag-accent-soft",
};
