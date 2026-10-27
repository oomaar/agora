import Link from "next/link";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { DEMO_PATH } from "@/lib/public/constants";

export function DemoSettings() {
  return (
    <SettingsPanel title="Demo">
      <div className="flex flex-col gap-4 rounded-lg border border-ag-demo-border bg-ag-demo-surface p-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 flex-col gap-0.75">
          <span className="text-[14px] font-semibold">Try the demo</span>
          <span className="text-[13px] text-ag-demo-text-muted">
            Open a sandbox copy of Agora with simulated data. Your real account
            isn&apos;t touched.
          </span>
        </div>
        <Link
          href={DEMO_PATH}
          className="grid h-9 flex-none place-items-center self-start rounded-sm border border-ag-demo px-3.5 text-[13px] font-semibold text-ag-demo-text outline-none transition-colors hover:bg-ag-demo-soft focus-visible:shadow-ag-focus-ring sm:self-auto"
        >
          Open demo
        </Link>
      </div>
    </SettingsPanel>
  );
}
