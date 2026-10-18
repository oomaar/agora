import { type ToastKind, type ToastKindConfig } from "@/types/toast";

export const TOAST_DURATION_MS = 3200;
export const TOAST_LIMIT = 3;

export const TOAST_KINDS: Record<ToastKind, ToastKindConfig> = {
  success: {
    className: "border-ag-success-border bg-ag-success-surface text-ag-success-text",
    dotClassName: "bg-ag-success",
  },
  error: {
    className: "border-ag-danger-border bg-ag-danger-surface text-ag-danger-text",
    dotClassName: "bg-ag-danger",
  },
};
