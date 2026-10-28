"use client";

import { Button } from "@/components/ui/Button";
import { useExitDemo } from "@/hooks/demo/useExitDemo";
import { useResetDemo } from "@/hooks/demo/useResetDemo";
import { useSimulation } from "@/hooks/data/useSimulation";
import { EXIT_DEMO_LABEL } from "@/lib/demo/constants";
import { SCENARIOS } from "@/lib/simulation/constants";

export function DemoSessionSettings() {
  const { scenario } = useSimulation();
  const reset = useResetDemo();
  const exit = useExitDemo();
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-ag-demo-border bg-ag-demo-surface p-4">
      <div className="flex flex-col gap-0.75">
        <span className="text-[14px] font-semibold">
          You&apos;re in the demo · {SCENARIOS[scenario].title}
        </span>
        <span className="text-[13px] text-ag-demo-text-muted">
          Everything here is simulated in your browser. Reset starts the
          scenario over; Exit takes you back to where you opened the demo.
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Button variant="demo" size="sm" onClick={reset}>
          Reset demo
        </Button>
        <Button variant="secondary" size="sm" onClick={exit}>
          {EXIT_DEMO_LABEL}
        </Button>
      </div>
    </div>
  );
}
