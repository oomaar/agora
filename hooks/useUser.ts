"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type UserView } from "@/types/domain";

export function useUser(handle: string) {
  return useQuery<UserView>(queryKeys.user(handle), (source) =>
    source.getUser(handle),
  );
}
