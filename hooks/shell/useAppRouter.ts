"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppPath } from "@/hooks/shell/useAppPath";
import { type AppRouter } from "@/types/shell";

// useRouter for app paths: inside the demo, "/home" goes to "/demo/home".
export function useAppRouter(): AppRouter {
  const router = useRouter();
  const appPath = useAppPath();
  return useMemo(
    () => ({
      push: (href) => router.push(appPath(href)),
      replace: (href) => router.replace(appPath(href)),
      back: () => router.back(),
    }),
    [router, appPath],
  );
}
