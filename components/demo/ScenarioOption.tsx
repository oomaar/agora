import { SCENARIOS } from "@/lib/simulation/constants";
import { cn } from "@/utils/cn";
import { type ScenarioOptionProps } from "@/types/public";

// A native radio, visually hidden, so arrow keys and screen readers work as usual.
export function ScenarioOption({
  scenario,
  checked,
  onSelect,
}: ScenarioOptionProps) {
  const { title, description } = SCENARIOS[scenario];
  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col gap-2.5 rounded-lg border p-4.5 transition-colors has-focus-visible:shadow-ag-focus-ring",
        checked
          ? "border-ag-demo bg-ag-demo-surface"
          : "border-ag-border bg-ag-surface hover:border-ag-border-strong",
      )}
    >
      <input
        type="radio"
        name="scenario"
        value={scenario}
        checked={checked}
        onChange={() => onSelect(scenario)}
        className="sr-only"
      />
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-3.5 place-items-center rounded-full border-2",
            checked ? "border-ag-demo" : "border-ag-border-strong",
          )}
        >
          {checked && <span className="size-1.5 rounded-full bg-ag-demo" />}
        </span>
        <span className="text-title">{title}</span>
      </span>
      <span className="text-[13.5px] leading-normal text-ag-text-secondary">
        {description}
      </span>
    </label>
  );
}
