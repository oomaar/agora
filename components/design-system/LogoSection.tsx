import { LogoMark } from "@/components/design-system/LogoMark";
import { SectionHeader } from "@/components/design-system/SectionHeader";
import { DsCard } from "@/components/design-system/DsCard";
import { LOGO_USAGE, THEMES } from "@/lib/design-system/constants";
import { cn } from "@/utils/cn";

const MARK_SIZES = [
  { size: 16, strokeWidth: 2.8 },
  { size: 24, strokeWidth: 2.4 },
  { size: 40, strokeWidth: 2.2 },
];

export function LogoSection() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader index="01" title="Logo" />
      <div className="grid grid-cols-1 gap-4 nav:grid-cols-2">
        {THEMES.map((theme) => (
          <div
            key={theme}
            className={cn(
              theme,
              "flex h-65 items-center justify-center gap-4 rounded-2xl border border-ag-border-subtle bg-ag-bg",
            )}
          >
            <LogoMark size={64} />
            <span className="text-[56px] font-bold tracking-[-0.035em] text-ag-text">
              agora
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 nav:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <DsCard title="Concept">
          <p className="text-body-sm leading-[1.6] text-pretty text-ag-text-secondary">
            A geometric lowercase <span className="text-ag-text">a</span>. The
            bowl is an open circle, the gathering place. The stem finishes in a
            curl that reads as the tail of a speech bubble. The amber tile
            refers to sunlit stone in a public square.
          </p>
        </DsCard>
        <DsCard title="Mark sizes">
          <div className="flex items-end gap-4.5">
            {MARK_SIZES.map(({ size, strokeWidth }) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <LogoMark size={size} strokeWidth={strokeWidth} />
                <span className="font-mono text-[11px] text-ag-text-secondary">
                  {size}
                </span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <div className="grid size-16 place-items-center rounded-[15px] border border-ag-border bg-ag-bg">
                <LogoMark size={40} strokeWidth={2.2} />
              </div>
              <span className="font-mono text-[11px] text-ag-text-secondary">
                app icon
              </span>
            </div>
          </div>
        </DsCard>
        <DsCard title="Usage" className="gap-2.5">
          {LOGO_USAGE.map((line) => (
            <p
              key={line}
              className="text-[13.5px] leading-[1.55] text-ag-text-secondary"
            >
              {line}
            </p>
          ))}
        </DsCard>
      </div>
    </section>
  );
}
