import { TOAST_KINDS } from "@/lib/ui/toast";
import { cn } from "@/utils/cn";
import { type ToastProps } from "@/types/toast";

export function Toast({ kind, message, className }: ToastProps) {
  const config = TOAST_KINDS[kind];
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4.5 py-3 text-[14px] shadow-ag-lg",
        config.className,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-2 flex-none rounded-full", config.dotClassName)}
      />
      {message}
    </div>
  );
}
