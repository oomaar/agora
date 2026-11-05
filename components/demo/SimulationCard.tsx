"use client";

import { SimulationControls } from "@/components/demo/SimulationControls";
import { useSession } from "@/hooks/auth/useSession";
import { firstName } from "@/utils/firstName";

// The demo's rail card: network conditions and what the simulated server just did.
export function SimulationCard() {
  const { session } = useSession();
  return (
    <section
      aria-labelledby="simulation-title"
      className="flex flex-col gap-3.5 rounded-xl border border-ag-demo-border bg-ag-demo-surface p-4"
    >
      <header className="flex items-center justify-between gap-3">
        <h2 id="simulation-title" className="text-title">
          Simulation
        </h2>
        <span className="text-[12px] text-ag-demo-text-muted">
          {firstName(session.name)}&apos;s sandbox
        </span>
      </header>
      <SimulationControls />
    </section>
  );
}
