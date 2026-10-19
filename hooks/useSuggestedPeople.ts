"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type UserView } from "@/types/domain";

export function useSuggestedPeople(limit: number) {
  return useQuery<UserView[]>(queryKeys.suggestedPeople(limit), (source) =>
    source.getSuggestedPeople(limit),
  );
}
