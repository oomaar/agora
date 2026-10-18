"use client";

import { Counter } from "@/components/ui/Counter";
import { useRovingSelection } from "@/hooks/useRovingSelection";
import { TAB_BASE, TAB_IDLE, TAB_SELECTED, TABS_LIST } from "@/lib/ui/tabs";
import { cn } from "@/utils/cn";
import { type TabsProps } from "@/types/tabs";

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  label,
  variant = "underline",
  className,
}: TabsProps<T>) {
  const getItemProps = useRovingSelection(
    items.map((item) => item.id),
    value,
    onChange,
  );
  return (
    <div role="tablist" aria-label={label} className={cn(TABS_LIST[variant], className)}>
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={cn(TAB_BASE[variant], selected ? TAB_SELECTED[variant] : TAB_IDLE[variant])}
            {...getItemProps(item.id)}
          >
            {item.label}
            {item.count !== undefined && (
              <Counter value={item.count} label={`${item.count} new`} />
            )}
          </button>
        );
      })}
    </div>
  );
}
