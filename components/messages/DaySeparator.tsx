import { type DaySeparatorProps } from "@/types/messages";

export function DaySeparator({ label }: DaySeparatorProps) {
  return (
    <p className="self-center pb-2 pt-1 text-[12px] text-ag-text-secondary">
      {label}
    </p>
  );
}
