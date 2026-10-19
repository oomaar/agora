import Link from "next/link";
import { RailCard } from "@/components/shell/RailCard";
import { TRENDS } from "@/lib/shell/constants";

export function TrendingCard() {
  return (
    <RailCard title="Trending">
      <ul>
        {TRENDS.map((trend) => (
          <li key={trend.id} className="flex flex-col gap-0.5 px-4 py-2">
            <span className="text-[12px] text-ag-text-secondary">
              {trend.category}
            </span>
            <span className="text-[14px] font-semibold">{trend.title}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/explore"
        className="px-4 py-2.5 text-[13.5px] text-ag-accent-text outline-none hover:underline focus-visible:underline"
      >
        Show more
      </Link>
    </RailCard>
  );
}
