"use client";

import { useSimulation } from "@/hooks/data/useSimulation";
import { useToast } from "@/hooks/ui/useToast";
import { DEMO_RESET_MESSAGE } from "@/lib/demo/constants";

// Restores the current scenario's data and network.
export function useResetDemo(): () => void {
  const { reset } = useSimulation();
  const toast = useToast();
  return () => {
    reset();
    toast.success(DEMO_RESET_MESSAGE);
  };
}
