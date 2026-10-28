"use client";

import { useData } from "@/hooks/data/useData";

// Only the demo runs a simulated backend.
export function useIsDemo(): boolean {
  return useData().simulation !== null;
}
