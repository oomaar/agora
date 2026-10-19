"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type FeedTab } from "@/types/dataSource";
import { type PostView } from "@/types/domain";

export function useFeed(tab: FeedTab) {
  return useQuery<PostView[]>(queryKeys.feed(tab), (source) =>
    source.getFeed(tab),
  );
}
