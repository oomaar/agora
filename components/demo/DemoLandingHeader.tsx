import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { WELCOME_PATH } from "@/lib/auth/constants";

// Back goes to the welcome page; signed-in visitors are sent on to their feed.
export function DemoLandingHeader() {
  return (
    <header className="flex h-15 flex-none items-center gap-3 border-b border-ag-border-subtle px-4 sm:px-8">
      <Logo />
      <Badge variant="demoSoft">Demo</Badge>
      <div className="flex-1" />
      <Link
        href={WELCOME_PATH}
        className="inline-flex h-8.5 items-center rounded-sm border border-ag-border px-3.5 text-[13px] outline-none transition-colors hover:bg-ag-hover focus-visible:shadow-ag-focus-ring"
      >
        Back
      </Link>
    </header>
  );
}
