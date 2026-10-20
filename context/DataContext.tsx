"use client";

import { createContext, useState } from "react";
import { createDataValue } from "@/lib/data/createDataValue";
import { type DataContextValue, type DataProviderProps } from "@/types/query";

export const DataContext = createContext<DataContextValue | null>(null);

// Swapping the preset swaps the data source; components only see the DataSource contract.
export function DataProvider({ preset, scenario, children }: DataProviderProps) {
  const [value] = useState(() => createDataValue({ preset, scenario }));
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
