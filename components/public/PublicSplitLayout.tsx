import { Logo } from "@/components/ui/Logo";
import { PITCH } from "@/lib/public/constants";
import { type PublicSplitLayoutProps } from "@/types/public";

// Pitch on the left, the form column on the right; stacked below the nav breakpoint.
export function PublicSplitLayout({ children }: PublicSplitLayoutProps) {
  return (
    <main className="grid flex-1 nav:grid-cols-2">
      <section className="flex flex-col gap-8 border-ag-border-subtle px-4 pt-8 sm:px-12 sm:pt-12 nav:justify-between nav:border-r nav:p-16">
        <Logo />
        <div className="flex max-w-110 flex-col gap-4.5">
          <h1 className="text-h1 nav:text-display">{PITCH.headline}</h1>
          <p className="text-body text-ag-text-secondary nav:text-[16px] nav:leading-[1.55]">
            {PITCH.body}
          </p>
        </div>
        <div
          aria-hidden="true"
          className="hidden aspect-16/7 w-full place-items-center rounded-xl border border-ag-border-subtle font-mono text-mono text-ag-text-placeholder media-stripes nav:grid"
        >
          product screenshot
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-10 sm:p-12">
        <div className="flex w-full max-w-95 flex-col gap-4.5">{children}</div>
      </section>
    </main>
  );
}
