import { TAP_TARGET } from "@/lib/ui/tapTarget";
import {
  type MenuAlign,
  type MenuSide,
  type MenuTriggerVariant,
} from "@/types/menu";

export const MENU_TRIGGER_BASE = `${TAP_TARGET} cursor-pointer outline-none transition-colors focus-visible:shadow-ag-focus-ring`;

export const MENU_TRIGGER_VARIANTS: Record<MenuTriggerVariant, string> = {
  icon: "grid min-h-8.5 min-w-8.5 place-items-center rounded-full text-ag-text-secondary hover:bg-ag-hover hover:text-ag-text",
  chip: "inline-flex items-center gap-1 rounded-full border border-ag-accent-border py-[3px] pl-2.5 pr-2 text-caption text-ag-accent-text hover:bg-ag-accent-soft",
};

// The menu grows out of the corner nearest its trigger.
export const MENU_POSITIONS: Record<MenuSide, Record<MenuAlign, string>> = {
  bottom: {
    end: "top-full right-0 mt-1.5 origin-top-right",
    start: "top-full left-0 mt-1.5 origin-top-left",
  },
  top: {
    end: "bottom-full right-0 mb-1.5 origin-bottom-right",
    start: "bottom-full left-0 mb-1.5 origin-bottom-left",
  },
};

export const MENU_ENTER =
  "transition-[opacity,scale] duration-150 ease-out starting:opacity-0 motion-safe:starting:scale-95";
