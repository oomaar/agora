"use client";

import { createContext, useState } from "react";
import { createSimulation } from "@/services/simulated/createSimulation";
import { createQueryCache } from "@/lib/data/queryCache";
import { DATA_PRESETS } from "@/lib/data/presets";
import { type DataContextValue, type DataProviderProps } from "@/types/query";

export const DataContext = createContext<DataContextValue | null>(null);

// Swapping the preset swaps the data source; components only see the DataSource contract.
export function DataProvider({
  preset,
  scenario,
  self,
  children,
}: DataProviderProps) {
  const [value] = useState<DataContextValue>(() => {
    const base = DATA_PRESETS[preset];
    const config = self
      ? { ...base, content: { ...base.content, self } }
      : base;
    const { source, controls } = createSimulation(config, scenario);
    return { source, cache: createQueryCache(), simulation: controls };
  });
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
