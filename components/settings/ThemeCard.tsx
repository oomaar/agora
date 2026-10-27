import { cn } from "@/utils/cn";
import { type ThemeCardProps } from "@/types/settings";

export function ThemeCard({
  option,
  selected,
  onSelect,
  ...itemProps
}: ThemeCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex min-w-0 flex-1 cursor-pointer flex-col gap-2 rounded-md border bg-ag-surface p-3 text-left outline-none transition-colors focus-visible:shadow-ag-focus-ring",
        selected
          ? "border-ag-accent"
          : "border-ag-border hover:border-ag-border-strong",
      )}
      {...itemProps}
    >
      <span
        aria-hidden="true"
        className="flex h-11 overflow-hidden rounded-[6px] border border-ag-border"
      >
        {option.swatches.map((swatch) => (
          <span key={swatch} className={cn("flex-1", swatch)} />
        ))}
      </span>
      <span className="text-[13.5px] font-semibold">{option.label}</span>
    </button>
  );
}
