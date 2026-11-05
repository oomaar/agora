import { ComposeFab } from "@/components/shell/ComposeFab";
import { ContextRail } from "@/components/shell/ContextRail";
import { SHELL_MAIN } from "@/lib/shell/nav";
import { MAIN_ID } from "@/lib/site/constants";
import { cn } from "@/utils/cn";

// The compose button stays off Messages and Settings, where it would cover their controls.
export default function WithRailLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main id={MAIN_ID} tabIndex={-1} className={cn(SHELL_MAIN, "max-w-160")}>
        {children}
      </main>
      <ContextRail />
      <ComposeFab />
    </>
  );
}
