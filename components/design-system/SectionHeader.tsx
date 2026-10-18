import { type SectionHeaderProps } from "@/types/designSystem";

export function SectionHeader({ index, title, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-mono text-[12px] font-medium text-ag-accent-text">{index}</span>
      <h2 className="text-[24px] font-semibold tracking-[-0.01em]">{title}</h2>
      {description && (
        <span className="text-[13px] text-ag-text-secondary">{description}</span>
      )}
    </div>
  );
}
