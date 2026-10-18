import { cn } from "@/utils/cn";
import { type ErrorStateProps } from "@/types/stateBlock";

export function ErrorState({
  title,
  description,
  actions,
  compact = false,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-start border border-ag-danger-border bg-ag-danger-surface",
        compact ? "gap-2 rounded-lg p-5" : "gap-2.5 rounded-xl p-7",
        className,
      )}
    >
      <h3
        className={cn(
          "font-semibold text-ag-danger-text",
          compact ? "text-[15px]" : "text-[17px]",
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "max-w-115 text-pretty text-ag-danger-text-muted",
            compact
              ? "text-[13px] leading-normal"
              : "text-[14px] leading-[1.55]",
          )}
        >
          {description}
        </p>
      )}
      {actions && <div className="mt-1 flex flex-wrap gap-2.5">{actions}</div>}
    </div>
  );
}
