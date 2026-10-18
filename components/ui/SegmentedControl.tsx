"use client";

import { useRovingSelection } from "@/hooks/useRovingSelection";
import {
  SEGMENTED_IDLE,
  SEGMENTED_SELECTED,
  SEGMENTED_TRACK,
} from "@/lib/ui/toggle";
import { cn } from "@/utils/cn";
import { type SegmentedControlProps } from "@/types/toggle";

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  tone = "neutral",
  className,
}: SegmentedControlProps<T>) {
  const getItemProps = useRovingSelection(
    options.map((option) => option.value),
    value,
    onChange,
  );
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "flex rounded-md border p-0.75",
        SEGMENTED_TRACK[tone],
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 cursor-pointer rounded-[7px] py-1.75 text-center text-[13px] font-semibold outline-none transition-colors focus-visible:shadow-ag-focus-ring",
              selected ? SEGMENTED_SELECTED[tone] : SEGMENTED_IDLE[tone],
            )}
            {...getItemProps(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
