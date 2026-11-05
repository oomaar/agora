"use client";

import { useState } from "react";
import { SimulationSheet } from "@/components/demo/SimulationSheet";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { useSession } from "@/hooks/auth/useSession";
import { useExitDemo } from "@/hooks/demo/useExitDemo";
import { useResetDemo } from "@/hooks/demo/useResetDemo";
import { useSimulation } from "@/hooks/data/useSimulation";
import { DEMO_BAR_BUTTON, EXIT_DEMO_LABEL } from "@/lib/demo/constants";
import { NETWORK_PROFILES, SCENARIOS } from "@/lib/simulation/constants";
import { cn } from "@/utils/cn";

// Pinned above the shell on every demo page: who you are, the scenario, Reset and Exit.
// Without the rail (below 1100px) the network opens the Simulation sheet; on phones
// Reset moves into that sheet.
export function DemoBar() {
  const { session } = useSession();
  const { scenario, network } = useSimulation();
  const reset = useResetDemo();
  const exit = useExitDemo();
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <div
      role="region"
      aria-label="Demo"
      className="sticky top-0 z-30 flex h-9.5 flex-none items-center gap-3 border-b border-ag-demo-border bg-ag-demo-surface px-4 text-[13px] text-ag-demo-text max-sm:gap-2 max-sm:px-3.5"
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
        onClick={() => setSheetOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={sheetOpen}
        className={cn(
          DEMO_BAR_BUTTON,
          "flex items-center gap-1 text-ag-demo-text-muted hover:text-ag-demo-text rail:hidden",
        )}
      >
        Network: {NETWORK_PROFILES[network].label}
        <Icon name="chevronDown" size={14} />
      </button>
      <button
        type="button"
        onClick={reset}
        className={cn(
          DEMO_BAR_BUTTON,
          "border border-ag-demo-border px-2.5 hover:bg-ag-demo-soft max-sm:hidden",
        )}
      >
        Reset
      </button>
      <button
        type="button"
        onClick={exit}
        aria-label={EXIT_DEMO_LABEL}
        className={cn(
          DEMO_BAR_BUTTON,
          "bg-ag-demo px-2.5 font-semibold text-ag-on-demo hover:opacity-90",
        )}
      >
        Exit<span className="max-sm:hidden"> demo</span>
      </button>
      <SimulationSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}
