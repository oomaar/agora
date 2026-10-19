"use client";

import { useSyncExternalStore } from "react";
import { useData } from "@/hooks/data/useData";
import { type UseSimulationResult } from "@/types/query";

// Network condition, scenario and activity log of the simulated backend.
export function useSimulation(): UseSimulationResult {
  const { simulation, cache } = useData();
  const state = useSyncExternalStore(
    simulation.subscribe,
    simulation.getState,
    simulation.getServerState,
  );
  return {
    ...state,
    setNetwork: simulation.setNetwork,
    reset: (scenario) => {
      simulation.reset(scenario);
      cache.reset();
    },
  };
}
