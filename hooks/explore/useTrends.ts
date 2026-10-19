"use client";

import { useQuery } from "@/hooks/data/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type Trend } from "@/types/domain";

export function useTrends() {
  return useQuery<Trend[]>(queryKeys.trends(), (source) => source.getTrends());
}
