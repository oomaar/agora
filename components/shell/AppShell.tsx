import { Suspense } from "react";
import { BottomTabBar } from "@/components/shell/BottomTabBar";
import { ComposeModal } from "@/components/shell/ComposeModal";
import { Sidebar } from "@/components/shell/Sidebar";
import { ComposerProvider } from "@/context/ComposerContext";
import { type AppShellProps } from "@/types/shell";

// Nav 248 · content · rail 340 (the rail is added by the route group layout).
export function AppShell({ children }: AppShellProps) {
  return (
    <ComposerProvider>
      <div className="mx-auto flex w-full max-w-307 flex-1 pb-19.5 sm:pb-0">
        <Sidebar />
        <div className="flex min-w-0 flex-1">{children}</div>
      </div>
      <BottomTabBar />
      {/* useSearchParams needs a Suspense boundary for static rendering. */}
      <Suspense>
        <ComposeModal />
      </Suspense>
    </ComposerProvider>
  );
}
