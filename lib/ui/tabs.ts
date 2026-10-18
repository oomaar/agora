import { type TabsVariant } from "@/types/tabs";

export const TABS_LIST: Record<TabsVariant, string> = {
  underline: "flex border-b border-ag-border-subtle",
  pill: "flex flex-wrap gap-2",
};

export const TAB_BASE: Record<TabsVariant, string> = {
  underline:
    "flex flex-1 cursor-pointer items-center justify-center gap-2 border-b-2 pb-3 pt-3.5 text-[14px] outline-none transition-colors focus-visible:shadow-ag-focus-ring",
  pill: "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] outline-none transition-colors focus-visible:shadow-ag-focus-ring",
};

export const TAB_SELECTED: Record<TabsVariant, string> = {
  underline: "border-ag-accent font-semibold text-ag-text",
  pill: "border-transparent bg-ag-text font-semibold text-ag-bg",
};

export const TAB_IDLE: Record<TabsVariant, string> = {
  underline: "border-transparent text-ag-text-secondary hover:bg-ag-hover hover:text-ag-text",
  pill: "border-ag-border text-ag-text-secondary hover:text-ag-text",
};
