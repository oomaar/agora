"use client";

import { useIsDemo } from "@/hooks/demo/useIsDemo";
import { type ModeOnlyProps } from "@/types/demo";

// For shared shell parts that differ between the app and the demo.
export function ModeOnly({ mode, children }: ModeOnlyProps) {
  const isDemo = useIsDemo();
  return (mode === "demo") === isDemo ? children : null;
}
