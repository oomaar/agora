import { createApiSource } from "@/services/api/createApiSource";
import { createSimulation } from "@/services/simulated/createSimulation";
import { createQueryCache } from "@/lib/data/queryCache";
import { DATA_PRESETS } from "@/lib/data/presets";
import { type DataContextValue, type DataProviderProps } from "@/types/query";

// The app reads the real API; the demo runs the simulated backend in the browser.
export function createDataValue({
  preset,
  scenario,
}: Omit<DataProviderProps, "children">): DataContextValue {
  if (preset === "app") {
    return {
      source: createApiSource(),
      cache: createQueryCache(),
      simulation: null,
    };
  }
  const { source, controls } = createSimulation(DATA_PRESETS.demo, scenario);
  return { source, cache: createQueryCache(), simulation: controls };
}
