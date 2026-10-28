"use client";

import { useState } from "react";
import { DataProvider } from "@/context/DataContext";
import { DemoAuthProvider } from "@/context/DemoAuthContext";
import { useSaveReturnPath } from "@/hooks/demo/useSaveReturnPath";
import { readScenarioParam } from "@/utils/readScenarioParam";
import { type DemoProvidersProps } from "@/types/demo";

// The scenario is read from the first page's "?scenario=" in the browser rather than with
// useSearchParams, so demo pages still render on the server (with the default scenario).
export function DemoProviders({ children }: DemoProvidersProps) {
  useSaveReturnPath();
  const [scenario] = useState(() =>
    typeof window === "undefined"
      ? undefined
      : readScenarioParam(window.location.search),
  );
  return (
    <DataProvider preset="demo" scenario={scenario}>
      <DemoAuthProvider>{children}</DemoAuthProvider>
    </DataProvider>
  );
}
