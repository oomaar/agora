"use client";

import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import { type DataContextValue } from "@/types/query";

export function useData(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used inside <DataProvider>");
  return context;
}
