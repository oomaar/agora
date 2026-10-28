"use client";

import { Badge } from "@/components/ui/Badge";
import { useSession } from "@/hooks/auth/useSession";
import { useExitDemo } from "@/hooks/demo/useExitDemo";
import { useResetDemo } from "@/hooks/demo/useResetDemo";
import { useSimulation } from "@/hooks/data/useSimulation";
import { EXIT_DEMO_LABEL } from "@/lib/demo/constants";
import { SCENARIOS } from "@/lib/simulation/constants";

// Pinned above the shell on every demo page: who you are, the scenario, Reset and Exit.
export function DemoBar() {
  const { session } = useSession();
  const { scenario } = useSimulation();
  const reset = useResetDemo();
  const exit = useExitDemo();
  return (
    <div
      role="region"
      aria-label="Demo"
      className="sticky top-0 z-30 flex h-9.5 flex-none items-center gap-3 border-b border-ag-demo-border bg-ag-demo-surface px-4 text-[13px] text-ag-demo-text"
    >
      <Badge variant="demo">Demo</Badge>
      <span className="min-w-0 truncate">
        Simulated data
        <span className="max-sm:hidden"> · signed in as {session.name}</span>
      </span>
      <span
        aria-hidden="true"
        className="text-ag-demo-text-muted max-sm:hidden"
      >
        ·
      </span>
      <span className="truncate text-ag-demo-text-muted max-sm:hidden">
        {SCENARIOS[scenario].title}
      </span>
      <div className="flex-1" />
      <button
        type="button"
        onClick={reset}
        className="h-6.5 flex-none cursor-pointer rounded-[6px] border border-ag-demo-border px-2.5 text-[12.5px] outline-none transition-colors hover:bg-ag-demo-soft focus-visible:shadow-ag-focus-ring"
      >
        Reset
      </button>
      <button
        type="button"
        onClick={exit}
        className="h-6.5 flex-none cursor-pointer rounded-[6px] bg-ag-demo px-2.5 text-[12.5px] font-semibold text-ag-on-demo outline-none transition-opacity hover:opacity-90 focus-visible:shadow-ag-focus-ring"
      >
        {EXIT_DEMO_LABEL}
      </button>
    </div>
  );
}
