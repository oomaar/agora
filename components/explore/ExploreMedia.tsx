"use client";

import { ExploreQuery } from "@/components/explore/ExploreQuery";
import { MediaGrid } from "@/components/explore/MediaGrid";
import { useSearch } from "@/hooks/explore/useSearch";
import { hasMedia } from "@/utils/hasMedia";
import { type ExploreTabContentProps } from "@/types/explore";

export function ExploreMedia({ query }: ExploreTabContentProps) {
  const search = useSearch(query);
  return (
    <ExploreQuery
      query={search}
      errorText="Couldn't load photos and videos."
      emptyText={
        query
          ? `No photos or videos match “${query}”.`
          : "No photos or videos yet."
      }
      isEmpty={(results) => !results.posts.some(hasMedia)}
    >
      {(results) => (
        <div className="pt-4">
          <MediaGrid posts={results.posts.filter(hasMedia)} />
        </div>
      )}
    </ExploreQuery>
  );
}
