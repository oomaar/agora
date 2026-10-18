import { type BadgeVariant, type CounterTone } from "@/types/badge";

export const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  demo: "bg-ag-demo px-2 py-0.5 text-[11.5px] font-bold uppercase text-ag-on-demo",
  demoSoft:
    "border border-ag-demo-border bg-ag-demo-soft px-2.5 py-[3px] text-[12px] font-semibold text-ag-demo-text",
  accent: "border border-ag-accent-border px-2.5 py-[3px] text-caption text-ag-accent-text",
  outline:
    "border border-ag-border px-2 py-[3px] font-mono text-[11px] font-medium text-ag-text-secondary",
};

export const COUNTER_TONES: Record<CounterTone, string> = {
  accent: "bg-ag-accent text-ag-on-accent",
  neutral: "bg-ag-border text-ag-text",
};

export const COUNTER_MAX = 99;
