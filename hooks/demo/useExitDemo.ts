"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { loadReturnPath } from "@/lib/demo/returnPath";
import { WELCOME_PATH } from "@/lib/auth/constants";
import { readReturnPath } from "@/utils/readReturnPath";

// Back to the page the demo was opened from, or the welcome page.
export function useExitDemo(): () => void {
  const router = useRouter();
  return useCallback(() => {
    router.push(readReturnPath(loadReturnPath()) ?? WELCOME_PATH);
  }, [router]);
}
