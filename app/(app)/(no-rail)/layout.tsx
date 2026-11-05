import { SHELL_MAIN } from "@/lib/shell/nav";
import { MAIN_ID } from "@/lib/site/constants";

// Messages and settings use the rail's space for their own second pane.
export default function NoRailLayout({ children }: LayoutProps<"/">) {
  return (
    <main id={MAIN_ID} tabIndex={-1} className={SHELL_MAIN}>
      {children}
    </main>
  );
}
