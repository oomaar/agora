"use client";

import { SimulationControls } from "@/components/demo/SimulationControls";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useExitDemo } from "@/hooks/demo/useExitDemo";
import { useResetDemo } from "@/hooks/demo/useResetDemo";
import { EXIT_DEMO_LABEL } from "@/lib/demo/constants";
import { type SimulationSheetProps } from "@/types/demo";

// The rail's Simulation card for screens without the rail, opened from the demo bar.
// It closes before Reset so the confirmation toast isn't hidden behind it.
export function SimulationSheet({ open, onClose }: SimulationSheetProps) {
  const reset = useResetDemo();
  const exit = useExitDemo();
  return (
    <Modal open={open} onClose={onClose} title="Simulation" variant="sheet">
      <div className="flex flex-col gap-3.5 px-4.5 pb-[max(--spacing(8),env(safe-area-inset-bottom))]">
        <SimulationControls />
        <div className="flex gap-2.5 pt-1">
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Reset demo
          </Button>
          <Button
            variant="demoSolid"
            size="lg"
            fullWidth
            onClick={() => {
              onClose();
              exit();
            }}
          >
            {EXIT_DEMO_LABEL}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
