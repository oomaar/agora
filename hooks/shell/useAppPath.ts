"use client";

import { useCallback } from "react";
import { useIsDemo } from "@/hooks/demo/useIsDemo";
import { DEMO_PATH } from "@/lib/public/constants";

// "/home" stays "/home" in the app and becomes "/demo/home" in the demo.
export function useAppPath(): (path: string) => string {
  const isDemo = useIsDemo();
  return useCallback(
    (path: string) => (isDemo ? `${DEMO_PATH}${path}` : path),
    [isDemo],
  );
}
