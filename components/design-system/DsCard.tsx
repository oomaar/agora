import { cn } from "@/utils/cn";
import { type DsCardProps } from "@/types/designSystem";

export function DsCard({
  title,
  spacing = "gap-3.5 p-6",
  flush = false,
  className,
  children,
}: DsCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-ag-border bg-ag-surface",
        flush ? "overflow-hidden" : spacing,
        className,
      )}
    >
      {title && (
        <span className={cn("text-title", flush && "px-6 pb-3.5 pt-6")}>
          {title}
        </span>
      )}
      {children}
    </div>
  );
}
