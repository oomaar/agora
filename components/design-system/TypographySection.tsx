import { SectionHeader } from "@/components/design-system/SectionHeader";
import { DsCard } from "@/components/design-system/DsCard";
import { TYPE_SCALE } from "@/lib/design-system/constants";
import { cn } from "@/utils/cn";

export function TypographySection() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader index="03" title="Typography" />
      <div className="grid grid-cols-1 gap-4 nav:grid-cols-2">
        <DsCard className="gap-2">
          <span className="font-mono text-[11px] font-medium text-ag-text-secondary">
            UI · GEIST
          </span>
          <span className="text-display">Aa Bb Gg 0123</span>
          <span className="text-[13.5px] text-ag-text-secondary">
            Regular 400 · Medium 500 · Semibold 600 · Bold 700 (wordmark only)
          </span>
        </DsCard>
        <DsCard className="gap-2">
          <span className="font-mono text-[11px] font-medium text-ag-text-secondary">
            DATA · GEIST MONO
          </span>
          <span className="font-mono text-[40px] font-medium leading-[1.1] tracking-[-0.02em]">
            /demo/home
          </span>
          <span className="text-[13.5px] text-ag-text-secondary">
            Routes, timestamps in the demo activity list, counters, labels
          </span>
        </DsCard>
      </div>
      <div className="overflow-x-auto rounded-xl border border-ag-border-subtle">
        <div className="min-w-160">
          {TYPE_SCALE.map((style, i) => (
            <div
              key={style.name}
              className={cn(
                "grid grid-cols-[160px_minmax(0,1fr)_220px] items-baseline gap-6 px-5 py-4",
                i > 0 && "border-t border-ag-border-subtle",
              )}
            >
              <span className="font-mono text-[13px]">{style.name}</span>
              <span className={cn(style.className, "truncate")}>
                {style.sample}
              </span>
              <span className="font-mono text-[12px] text-ag-text-secondary">
                {style.spec}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
