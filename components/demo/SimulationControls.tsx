"use client";

import { ActivityList } from "@/components/demo/ActivityList";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useSimulation } from "@/hooks/data/useSimulation";
import { RAIL_ACTIVITY_LIMIT } from "@/lib/demo/constants";
import { NETWORK_OPTIONS, NETWORK_PROFILES } from "@/lib/simulation/constants";

// Network conditions and what the simulated server just did: the rail's Simulation
// card, and the sheet that opens from the demo bar on smaller screens.
export function SimulationControls() {
  const { network, activity, setNetwork } = useSimulation();
  return (
    <>
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
    </>
  );
}
