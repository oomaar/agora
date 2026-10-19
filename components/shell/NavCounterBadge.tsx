"use client";

import { Counter } from "@/components/ui/Counter";
import { useUnreadCounts } from "@/hooks/shell/useUnreadCounts";
import { pluralize } from "@/utils/pluralize";
import { type NavCounterBadgeProps } from "@/types/shell";

// Hidden until the counts load, and when there is nothing unread.
export function NavCounterBadge({ counter }: NavCounterBadgeProps) {
  const { data } = useUnreadCounts();
  const value = data?.[counter.source] ?? 0;
  return (
    <Counter
      value={value}
      tone={counter.tone}
      label={`${value} unread ${pluralize(value, counter.noun)}`}
      className="absolute right-0.5 top-0.5 nav:static"
    />
  );
}
