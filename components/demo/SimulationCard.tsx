"use client";

import { ActivityList } from "@/components/demo/ActivityList";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useSession } from "@/hooks/auth/useSession";
import { useSimulation } from "@/hooks/data/useSimulation";
import { RAIL_ACTIVITY_LIMIT } from "@/lib/demo/constants";
import { NETWORK_OPTIONS, NETWORK_PROFILES } from "@/lib/simulation/constants";
import { firstName } from "@/utils/firstName";

// The demo's rail card: network conditions and what the simulated server just did.
export function SimulationCard() {
  const { session } = useSession();
  const { network, activity, setNetwork } = useSimulation();
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
      <div className="flex flex-col gap-2">
        <span className="text-[12.5px] text-ag-demo-text-muted">Network</span>
        <SegmentedControl
          label="Network"
          tone="demo"
          options={NETWORK_OPTIONS}
          value={network}
          onChange={setNetwork}
        />
        <p className="text-[12.5px] leading-[1.45] text-ag-demo-text-muted">
          {NETWORK_PROFILES[network].hint}
        </p>
      </div>
      <div className="flex flex-col gap-2 border-t border-ag-demo-border pt-3">
        <h3 className="text-[12.5px] font-normal text-ag-demo-text-muted">
          Recent activity
        </h3>
        <ActivityList entries={activity.slice(0, RAIL_ACTIVITY_LIMIT)} />
      </div>
    </section>
  );
}
