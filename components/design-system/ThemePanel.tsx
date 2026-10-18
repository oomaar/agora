import { cn } from "@/utils/cn";
import { type ThemePanelProps } from "@/types/designSystem";

// Forces a theme on its subtree so dark and light render side by side.
export function ThemePanel({ theme, className, children }: ThemePanelProps) {
  return (
    <div
      className={cn(
        theme,
        "flex flex-col gap-5 rounded-2xl border border-ag-border-subtle bg-ag-bg p-7 text-ag-text",
        className,
      )}
    >
      <span className="font-mono text-[11px] font-medium uppercase text-ag-text-secondary">
        {theme}
      </span>
      {children}
    </div>
  );
}
