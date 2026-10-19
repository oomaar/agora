"use client";

import { useQuery } from "@/hooks/useQuery";
import { queryKeys } from "@/lib/data/queryKeys";
import { type SearchResults } from "@/types/dataSource";

export function useSearch(query: string) {
  return useQuery<SearchResults>(
    queryKeys.search(query),
    (source) => source.search(query),
    {
      isEmpty: (results) => !results.people.length && !results.posts.length,
    },
  );
}
