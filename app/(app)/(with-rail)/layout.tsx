import { ContextRail } from "@/components/shell/ContextRail";
import { SHELL_MAIN } from "@/lib/shell/nav";
import { cn } from "@/utils/cn";

export default function WithRailLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main className={cn(SHELL_MAIN, "max-w-160")}>{children}</main>
      <ContextRail />
    </>
  );
}
