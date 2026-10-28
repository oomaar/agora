import { AppLink } from "@/components/shell/AppLink";
import { explorePath } from "@/utils/explorePath";
import { pluralize } from "@/utils/pluralize";
import { type TrendListProps } from "@/types/explore";

// Each trend searches for its title.
export function TrendList({ trends }: TrendListProps) {
  return (
    <ul>
      {trends.map((trend) => (
        <li key={trend.id}>
          <AppLink
            href={explorePath(trend.title)}
            className="flex flex-col gap-0.75 px-5 py-3 outline-none transition-colors hover:bg-ag-hover focus-visible:shadow-ag-focus-ring"
          >
            <span className="text-[12.5px] text-ag-text-secondary">
              {trend.category}
            </span>
            <span className="text-[15px] font-semibold">{trend.title}</span>
            <span className="text-[12.5px] text-ag-text-secondary">
              {trend.postCount.toLocaleString("en-US")}{" "}
              {pluralize(trend.postCount, "post")}
            </span>
          </AppLink>
        </li>
      ))}
    </ul>
  );
}
