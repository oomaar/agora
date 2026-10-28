"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { demoLandingPath } from "@/utils/demoLandingPath";

// Exit demo comes back to the page it was opened from.
export function DemoCard() {
  const pathname = usePathname();
  return (
    <div className="mb-3 hidden flex-col gap-2 rounded-lg border border-ag-demo-border bg-ag-demo-surface p-3.5 nav:flex">
      <div className="flex items-center gap-2 text-[14px] font-semibold">
        <span
          aria-hidden="true"
          className="size-1.75 rounded-full bg-ag-demo"
        />
        Try the demo
      </div>
      <p className="text-caption text-ag-demo-text-muted">
        A sandbox copy of Agora with simulated people and a fake backend.
      </p>
      <Link
        href={demoLandingPath(pathname)}
        className="grid h-8 place-items-center rounded-sm border border-ag-demo text-[13px] font-semibold text-ag-demo-text outline-none transition-colors hover:bg-ag-demo-soft focus-visible:shadow-ag-focus-ring"
      >
        Open demo
      </Link>
    </div>
  );
}
