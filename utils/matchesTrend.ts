import { type Trend } from "@/types/domain";

// Case-insensitive match on a trend's title or category; an empty search matches everything.
export function matchesTrend(trend: Trend, query: string): boolean {
  const term = query.toLowerCase();
  return [trend.title, trend.category].some((field) => field.toLowerCase().includes(term));
}
