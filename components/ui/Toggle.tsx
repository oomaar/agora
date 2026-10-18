"use client";

import { cn } from "@/utils/cn";
import { type ToggleProps } from "@/types/toggle";

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
  className,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-10 flex-none cursor-pointer rounded-xl outline-none transition-colors focus-visible:shadow-ag-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-ag-accent" : "bg-ag-border",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0.75 top-0.75 size-4.5 rounded-full bg-ag-knob transition-transform",
          checked && "translate-x-4",
        )}
      />
    </button>
  );
}
