import { ACTIVITY_DOTS } from "@/lib/demo/constants";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { cn } from "@/utils/cn";
import { type ActivityListProps } from "@/types/demo";

// Newest first, in plain language ("Your like was saved").
export function ActivityList({ entries }: ActivityListProps) {
  return (
    <ul aria-live="polite" className="flex flex-col gap-2">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="flex items-baseline gap-2.5 text-[13px] leading-[1.4]"
        >
          <span
            aria-hidden="true"
            className={cn(
              "size-1.75 flex-none -translate-y-px rounded-full",
              ACTIVITY_DOTS[entry.tone],
            )}
          />
          <span className="flex-1 text-ag-demo-text">{entry.text}</span>
          <time
            dateTime={entry.time}
            className="font-mono text-[11px] text-ag-demo-text-muted"
          >
            {formatRelativeTime(entry.time)}
          </time>
        </li>
      ))}
    </ul>
  );
}
