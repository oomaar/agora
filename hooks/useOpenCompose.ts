"use client";

import { usePathname, useRouter } from "next/navigation";
import { COMPOSE_PARAM } from "@/lib/shell/constants";
import { addSearchFlag } from "@/utils/addSearchFlag";

// Reads the query at click time, so callers don't need a Suspense boundary.
export function useOpenCompose() {
  const router = useRouter();
  const pathname = usePathname();
  return () =>
    router.replace(
      addSearchFlag(pathname, window.location.search, COMPOSE_PARAM),
      { scroll: false },
    );
}
