import { DemoBar } from "@/components/demo/DemoBar";
import { DemoProviders } from "@/components/demo/DemoProviders";
import { AppShell } from "@/components/shell/AppShell";
import { DEMO_SHELL_OFFSET } from "@/lib/demo/constants";
import { cn } from "@/utils/cn";

// The same shell and pages as the app, on the simulated backend. No sign-in needed.
export default function DemoAppLayout({ children }: LayoutProps<"/demo">) {
  return (
    <DemoProviders>
      <div className={cn("flex flex-1 flex-col", DEMO_SHELL_OFFSET)}>
        <DemoBar />
        <AppShell>{children}</AppShell>
      </div>
    </DemoProviders>
  );
}
