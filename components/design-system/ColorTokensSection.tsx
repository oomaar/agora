import { SectionHeader } from "@/components/design-system/SectionHeader";
import { ThemePanel } from "@/components/design-system/ThemePanel";
import {
  COLOR_GROUPS,
  CONTRAST_SAMPLES,
  THEMES,
} from "@/lib/design-system/constants";
import { cn } from "@/utils/cn";

const ROW_GRID =
  "grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)] items-center gap-4 px-4";

export function ColorTokensSection() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        index="02"
        title="Colour tokens"
        description="Same token name, one value per theme."
      />
      {COLOR_GROUPS.map((group) => (
        <div key={group.name} className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-baseline gap-x-2.5">
            <span className="text-title">{group.name}</span>
            <span className="text-[13px] text-ag-text-secondary">
              {group.description}
            </span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-ag-border-subtle">
            <div className="min-w-160">
              <div
                className={cn(
                  ROW_GRID,
                  "bg-ag-hover py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-ag-text-secondary",
                )}
              >
                <span>Token</span>
                <span>Dark</span>
                <span>Light</span>
                <span>Use</span>
              </div>
              {group.tokens.map((token) => (
                <div
                  key={token.name}
                  className={cn(
                    ROW_GRID,
                    "border-t border-ag-border-subtle py-3",
                  )}
                >
                  <span className="font-mono text-[13px]">{token.name}</span>
                  {THEMES.map((theme) => (
                    <span key={theme} className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          theme,
                          token.swatchClassName,
                          "h-6 w-9 flex-none rounded-xs border border-ag-border-strong",
                        )}
                      />
                      <span className="font-mono text-[12.5px] text-ag-text-secondary">
                        {token[theme]}
                      </span>
                    </span>
                  ))}
                  <span className="text-[13px] leading-[1.45] text-ag-text-secondary">
                    {token.use}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-1 gap-4 nav:grid-cols-2">
        {THEMES.map((theme) => (
          <ThemePanel
            key={theme}
            theme={theme}
            spacing="gap-2.5 rounded-xl p-5"
          >
            <div className="flex flex-wrap gap-2 text-[13px]">
              {CONTRAST_SAMPLES[theme].map((sample) => (
                <span
                  key={sample.label}
                  className={cn("rounded-sm px-2.5 py-1.5", sample.className)}
                >
                  {sample.label}
                </span>
              ))}
            </div>
          </ThemePanel>
        ))}
      </div>
    </section>
  );
}
