import { SHELL_MAIN } from "@/lib/shell/nav";

// Messages and settings use the rail's space for their own second pane.
export default function NoRailLayout({ children }: LayoutProps<"/">) {
  return <main className={SHELL_MAIN}>{children}</main>;
}
