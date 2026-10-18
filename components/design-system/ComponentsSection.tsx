import { SectionHeader } from "@/components/design-system/SectionHeader";
import { ThemePanel } from "@/components/design-system/ThemePanel";
import { THEMES } from "@/lib/design-system/constants";

const BUTTON_BASE = "inline-flex h-10 items-center rounded-md px-[18px] text-[14px]";

export function ComponentsSection() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        index="06"
        title="Core components"
        description="Dark and light, built from the tokens above."
      />
      <div className="grid grid-cols-1 gap-4 nav:grid-cols-2">
        {THEMES.map((theme) => (
          <ThemePanel key={theme} theme={theme} className="gap-[22px]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`${BUTTON_BASE} bg-ag-accent font-semibold text-ag-on-accent`}>
                Primary
              </span>
              <span className={`${BUTTON_BASE} border border-ag-border-strong text-ag-text`}>
                Secondary
              </span>
              <span className={`${BUTTON_BASE} border border-ag-demo font-semibold text-ag-demo-text`}>
                Demo
              </span>
              <span className={`${BUTTON_BASE} bg-ag-danger font-semibold text-ag-on-danger`}>
                Danger
              </span>
              <span className="inline-flex h-[34px] items-center rounded-full bg-ag-text px-4 text-[13px] font-semibold text-ag-bg">
                Follow
              </span>
            </div>
            <div className="flex h-[42px] items-center rounded-md border border-ag-border bg-ag-surface px-3.5 text-[14px] text-ag-text-placeholder">
              Write a comment…
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ag-text px-3 py-1.5 text-[13px] font-semibold text-ag-bg">
                Top
              </span>
              <span className="rounded-full border border-ag-border px-3 py-1.5 text-[13px] text-ag-text-secondary">
                People
              </span>
              <span className="grid h-5 min-w-5 place-items-center rounded-[10px] bg-ag-accent text-[11.5px] font-bold text-ag-on-accent">
                3
              </span>
              <span className="rounded-full bg-ag-demo px-2 py-0.5 text-[11.5px] font-bold text-ag-on-demo">
                DEMO
              </span>
              <span className="rounded-sm border border-ag-success-border bg-ag-success-surface px-2.5 py-1.5 text-caption text-ag-success-text">
                Post published
              </span>
              <span className="rounded-sm border border-ag-danger-border bg-ag-danger-surface px-2.5 py-1.5 text-caption text-ag-danger-text">
                Couldn&apos;t send
              </span>
            </div>
            <div className="flex gap-3 rounded-lg border border-ag-border-subtle bg-ag-bg p-4">
              <div className="grid size-10 flex-none place-items-center rounded-full bg-ag-avatar-1 text-[14px] font-semibold text-ag-on-avatar">
                AT
              </div>
              <div className="flex flex-col gap-1.5 text-[14px]">
                <span>
                  <b className="font-semibold">Aiko Tanaka</b>{" "}
                  <span className="text-ag-text-secondary">@aiko.t · 4m</span>
                </span>
                <span className="text-body">Our library just started lending sewing machines.</span>
                <span className="flex gap-6 text-[13px] text-ag-text-secondary">
                  <span>4 replies</span>
                  <span className="text-ag-danger">♥ 24</span>
                </span>
              </div>
            </div>
          </ThemePanel>
        ))}
      </div>
    </section>
  );
}
