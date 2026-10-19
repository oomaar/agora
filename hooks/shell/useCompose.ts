"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COMPOSE_PARAM } from "@/lib/shell/constants";
import { removeSearchParam } from "@/utils/removeSearchParam";

// Compose is URL state: `?compose` opens it over whatever route is showing.
export function useCompose() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return {
    isOpen: searchParams.has(COMPOSE_PARAM),
    close: () =>
      router.replace(
        removeSearchParam(pathname, searchParams.toString(), COMPOSE_PARAM),
        { scroll: false },
      ),
  };
}
