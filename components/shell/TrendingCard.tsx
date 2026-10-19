"use client";

import Link from "next/link";
import { RailCard } from "@/components/shell/RailCard";
import { RailQuery } from "@/components/shell/RailQuery";
import { useTrends } from "@/hooks/explore/useTrends";
import { RAIL_TREND_LIMIT } from "@/lib/shell/constants";

export function TrendingCard() {
  const trends = useTrends();
  return (
    <RailCard title="Trending">
      <RailQuery
        query={trends}
        skeleton={{ variant: "text", rows: RAIL_TREND_LIMIT }}
        errorText="Couldn't load trends."
        emptyText="Nothing is trending right now."
      >
        {(items) => (
          <ul>
            {items.slice(0, RAIL_TREND_LIMIT).map((trend) => (
              <li key={trend.id} className="flex flex-col gap-0.5 px-4 py-2">
                <span className="text-[12px] text-ag-text-secondary">
                  {trend.category}
                </span>
                <span className="text-[14px] font-semibold">{trend.title}</span>
              </li>
            ))}
          </ul>
        )}
      </RailQuery>
      <Link
        href="/explore"
        className="px-4 py-2.5 text-[13.5px] text-ag-accent-text outline-none hover:underline focus-visible:underline"
      >
        Show more
      </Link>
    </RailCard>
  );
}
