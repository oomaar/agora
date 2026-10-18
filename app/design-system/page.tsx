import { LogoMark } from "@/components/ui/LogoMark";
import { LogoSection } from "@/components/design-system/LogoSection";
import { ColorTokensSection } from "@/components/design-system/ColorTokensSection";
import { TypographySection } from "@/components/design-system/TypographySection";
import { SpacingSection } from "@/components/design-system/SpacingSection";
import { ShadowsSection } from "@/components/design-system/ShadowsSection";
import { ComponentsSection } from "@/components/design-system/ComponentsSection";
import { ComponentLibrarySection } from "@/components/design-system/ComponentLibrarySection";
import { DS_VERSION } from "@/lib/design-system/constants";

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex w-full max-w-300 flex-col gap-18 px-4 pb-24 pt-14 sm:px-12">
      <header className="flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-3">
          <LogoMark size={28} />
          <span className="text-[22px] font-bold tracking-[-0.02em]">
            agora
          </span>
          <span className="rounded-full border border-ag-border px-2 py-0.75 font-mono text-[11px] font-medium text-ag-text-secondary">
            design system · {DS_VERSION}
          </span>
        </div>
        <p className="max-w-170 text-[15px] leading-[1.55] text-pretty text-ag-text-secondary">
          Logo, colour tokens for dark and light themes, typography, spacing and
          core components. Values match the dark and light wireframes. Dark is
          the default theme.
        </p>
      </header>
      <LogoSection />
      <ColorTokensSection />
      <TypographySection />
      <SpacingSection />
      <ShadowsSection />
      <ComponentsSection />
      <ComponentLibrarySection />
    </main>
  );
}
