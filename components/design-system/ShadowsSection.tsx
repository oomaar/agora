import { SectionHeader } from "@/components/design-system/SectionHeader";
import { ThemePanel } from "@/components/design-system/ThemePanel";
import { SHADOW_NOTES, SHADOW_TOKENS, THEMES } from "@/lib/design-system/constants";
import { cn } from "@/utils/cn";

const ROW_GRID =
  "grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1.6fr)_minmax(0,1.3fr)] items-center gap-4 px-4";

export function ShadowsSection() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        index="05"
        title="Shadows"
        description="Dark theme leans on borders and surface steps. Shadows mark things that float above the page."
      />
      <div className="grid grid-cols-1 gap-4 nav:grid-cols-2">
        {THEMES.map((theme) => (
          <ThemePanel key={theme} theme={theme}>
            <div className="grid grid-cols-3 gap-x-5 gap-y-6">
              {SHADOW_TOKENS.map((shadow) => (
                <div key={shadow.name} className="flex flex-col gap-2.5">
                  <div
                    className={cn(
                      "h-[72px] rounded-lg border",
                      shadow.className,
                      theme === "dark"
                        ? cn("border-ag-border", shadow.darkSurfaceClassName)
                        : "border-ag-border-subtle bg-ag-surface",
                    )}
                  />
                  <span className="break-all font-mono text-[12px]">{shadow.name}</span>
                </div>
              ))}
            </div>
          </ThemePanel>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-ag-border-subtle">
        <div className="min-w-[720px]">
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
          {SHADOW_TOKENS.map((shadow) => (
            <div key={shadow.name} className={cn(ROW_GRID, "border-t border-ag-border-subtle py-3")}>
              <span className="font-mono text-[13px]">{shadow.name}</span>
              <span className="font-mono text-[12px] leading-[1.5] text-ag-text-secondary">
                {shadow.dark}
              </span>
              <span className="font-mono text-[12px] leading-[1.5] text-ag-text-secondary">
                {shadow.light}
              </span>
              <span className="text-[13px] leading-[1.45] text-ag-text-secondary">{shadow.use}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 text-[13.5px] leading-[1.55] text-ag-text-secondary nav:grid-cols-3">
        {SHADOW_NOTES.map((note) => (
          <p key={note.title}>
            <span className="font-semibold text-ag-text">{note.title}</span> {note.body}
          </p>
        ))}
      </div>
    </section>
  );
}
