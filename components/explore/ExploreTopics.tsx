"use client";

import { ExploreQuery } from "@/components/explore/ExploreQuery";
import { TrendList } from "@/components/explore/TrendList";
import { useTrends } from "@/hooks/explore/useTrends";
import { matchesTrend } from "@/utils/matchesTrend";
import { type ExploreTabContentProps } from "@/types/explore";

export function ExploreTopics({ query }: ExploreTabContentProps) {
  const trends = useTrends();
  return (
    <ExploreQuery
      query={trends}
      errorText="Couldn't load topics."
      emptyText={
        query ? `No topics match “${query}”.` : "Nothing is trending right now."
      }
      isEmpty={(items) => !items.some((trend) => matchesTrend(trend, query))}
    >
      {(items) => (
        <div className="py-2">
          <TrendList
            trends={items.filter((trend) => matchesTrend(trend, query))}
          />
        </div>
      )}
    </ExploreQuery>
  );
}
