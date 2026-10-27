import { type SettingRowProps } from "@/types/settings";

// A setting's label and hint, with its control at the end.
export function SettingRow({ label, hint, children }: SettingRowProps) {
  return (
    <div className="flex flex-col gap-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px]">{label}</span>
        <span className="text-[12.5px] text-ag-text-secondary">{hint}</span>
      </div>
      {children}
    </div>
  );
}
