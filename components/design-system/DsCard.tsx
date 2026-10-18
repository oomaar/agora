import { cn } from "@/utils/cn";
import { type DsCardProps } from "@/types/designSystem";

export function DsCard({ title, className, children }: DsCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3.5 rounded-xl border border-ag-border bg-ag-surface p-6",
        className,
      )}
    >
      {title && <span className="text-title">{title}</span>}
      {children}
    </div>
  );
}
