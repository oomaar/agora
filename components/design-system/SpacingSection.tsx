import { SectionHeader } from "@/components/design-system/SectionHeader";
import { DsCard } from "@/components/design-system/DsCard";
import {
  ELEVATION_SCALE,
  LAYOUT_NOTES,
  RADIUS_SCALE,
  SPACING_SCALE,
} from "@/lib/design-system/constants";
import { cn } from "@/utils/cn";

export function SpacingSection() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader index="04" title="Spacing, radius & elevation" />
      <div className="grid grid-cols-1 items-start gap-4 nav:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <DsCard spacing="gap-2.5 p-6">
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-title">Spacing scale</span>
            <span className="text-caption text-ag-text-secondary">
              4px base, 2px half-steps under 16
            </span>
          </div>
          {SPACING_SCALE.map((step) => (
            <div
              key={step.name}
              className="grid grid-cols-[80px_48px_minmax(0,1fr)_minmax(0,1.4fr)] items-center gap-3.5"
            >
              <span className="font-mono text-[12.5px]">{step.name}</span>
              <span className="font-mono text-[12.5px] text-ag-text-secondary">
                {step.px}
              </span>
              <span
                className={cn(
                  "block h-3 max-w-full rounded-[2px] bg-ag-accent",
                  step.barClassName,
                )}
              />
              <span className="text-caption text-ag-text-secondary">
                {step.use}
              </span>
            </div>
          ))}
        </DsCard>
        <div className="flex flex-col gap-4">
          <DsCard title="Radius">
            <div className="grid grid-cols-4 gap-3">
              {RADIUS_SCALE.map((radius) => (
                <div
                  key={radius.name}
                  className="flex flex-col items-start gap-1.5"
                >
                  <div
                    className={cn(
                      "h-10 w-14 border-[1.5px] border-ag-text-secondary bg-ag-raised",
                      radius.className,
                    )}
                  />
                  <span className="font-mono text-[12px]">{radius.name}</span>
                  <span className="text-[11.5px] text-ag-text-secondary">
                    {radius.use}
                  </span>
                </div>
              ))}
            </div>
          </DsCard>
          <DsCard title="Elevation">
            <div className="grid grid-cols-3 gap-3.5">
              {ELEVATION_SCALE.map((step) => (
                <div key={step.name} className="flex flex-col gap-2">
                  <div className={cn("h-14 rounded-lg", step.className)} />
                  <span className="font-mono text-[12px]">{step.name}</span>
                  <span className="text-[11.5px] text-ag-text-secondary">
                    {step.use}
                  </span>
                </div>
              ))}
            </div>
          </DsCard>
          <DsCard title="Layout" spacing="gap-2 p-6">
            {LAYOUT_NOTES.map((note) => (
              <p
                key={note}
                className="text-[13.5px] leading-[1.55] text-ag-text-secondary"
              >
                {note}
              </p>
            ))}
          </DsCard>
        </div>
      </div>
    </section>
  );
}
