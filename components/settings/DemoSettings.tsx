"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DemoSessionSettings } from "@/components/settings/DemoSessionSettings";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { useIsDemo } from "@/hooks/demo/useIsDemo";
import { demoLandingPath } from "@/utils/demoLandingPath";

// From the app it opens the demo; inside the demo it resets or leaves it.
export function DemoSettings() {
  const pathname = usePathname();
  const isDemo = useIsDemo();
  return (
    <SettingsPanel title="Demo">
      {isDemo ? (
        <DemoSessionSettings />
      ) : (
        <div className="flex flex-col gap-4 rounded-lg border border-ag-demo-border bg-ag-demo-surface p-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-col gap-0.75">
            <span className="text-[14px] font-semibold">Try the demo</span>
            <span className="text-[13px] text-ag-demo-text-muted">
              Open a sandbox copy of Agora with simulated data. Your real
              account isn&apos;t touched.
            </span>
          </div>
          <Link
            href={demoLandingPath(pathname)}
            className="grid h-9 flex-none place-items-center self-start rounded-sm border border-ag-demo px-3.5 text-[13px] font-semibold text-ag-demo-text outline-none transition-colors hover:bg-ag-demo-soft focus-visible:shadow-ag-focus-ring sm:self-auto"
          >
            Open demo
          </Link>
        </div>
      )}
    </SettingsPanel>
  );
}
