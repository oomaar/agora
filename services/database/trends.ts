import "server-only";
import { selectViews } from "@/lib/db/query";
import { type Trend } from "@/types/domain";

export function getTrends(): Promise<Trend[]> {
  return selectViews(
    "select trend_view(t) as view from trends t order by t.position",
    [],
  );
}
