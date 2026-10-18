import { type SegmentedTone } from "@/types/toggle";

export const SEGMENTED_TRACK: Record<SegmentedTone, string> = {
  neutral: "border-ag-border bg-ag-bg",
  demo: "border-ag-demo-border bg-ag-bg",
};

export const SEGMENTED_SELECTED: Record<SegmentedTone, string> = {
  neutral: "bg-ag-raised text-ag-text",
  demo: "bg-ag-demo text-ag-on-demo",
};

export const SEGMENTED_IDLE: Record<SegmentedTone, string> = {
  neutral: "text-ag-text-secondary hover:text-ag-text",
  demo: "text-ag-demo-text-muted hover:text-ag-demo-text",
};
