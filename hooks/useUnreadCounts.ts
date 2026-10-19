"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type UnreadCounts } from "@/types/dataSource";

export function useUnreadCounts() {
  return useQuery<UnreadCounts>(queryKeys.unreadCounts(), (source) =>
    source.getUnreadCounts(),
  );
}
