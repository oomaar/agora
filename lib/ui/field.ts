import { type FieldSize } from "@/types/field";

export const FIELD_CONTROL_BASE =
  "w-full border bg-ag-surface text-[14px] text-ag-text outline-none transition-colors placeholder:text-ag-text-placeholder focus-visible:border-ag-accent focus-visible:shadow-ag-focus-ring disabled:cursor-not-allowed disabled:opacity-50";

export const FIELD_BORDER = "border-ag-border";
export const FIELD_BORDER_ERROR = "border-ag-danger";

// 44px tall on phones, the minimum tap target.
export const FIELD_SIZES: Record<FieldSize, string> = {
  sm: "h-[38px] max-sm:h-11",
  md: "h-[42px] max-sm:h-11",
  lg: "h-11",
};
