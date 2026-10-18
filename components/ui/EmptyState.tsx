import { Icon } from "@/components/ui/Icon";
import { cn } from "@/utils/cn";
import { type EmptyStateProps } from "@/types/stateBlock";

export function EmptyState({
  title,
  description,
  icon = "plus",
  actions,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center",
        compact ? "gap-2.5 px-6 py-10" : "gap-3.5 px-12 py-18",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid place-items-center border border-dashed border-ag-border-strong text-ag-text-placeholder",
          compact ? "size-11 rounded-lg" : "size-14 rounded-2xl",
        )}
      >
        <Icon name={icon} size={compact ? 18 : 22} />
      </span>
      <h3 className={compact ? "text-[16px] font-semibold" : "text-h3"}>
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "max-w-95 text-pretty text-ag-text-secondary",
            compact
              ? "text-[13px] leading-normal"
              : "text-[14.5px] leading-[1.55]",
          )}
        >
          {description}
        </p>
      )}
      {actions && (
        <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">
          {actions}
        </div>
      )}
    </div>
  );
}
