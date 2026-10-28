import { SettingsNav } from "@/components/settings/SettingsNav";
import { type SettingsLayoutProps } from "@/types/settings";

// Sections on the left, the open section on the right; on phones the sections scroll across the top.
export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col sm:min-h-[calc(100dvh-var(--ag-shell-top,0px))] sm:flex-row">
      <SettingsNav />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
