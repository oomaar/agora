import Link from "next/link";
import { DemoCard } from "@/components/shell/DemoCard";
import { NavLink } from "@/components/shell/NavLink";
import { NewPostButton } from "@/components/shell/NewPostButton";
import { UserCard } from "@/components/shell/UserCard";
import { Logo } from "@/components/ui/Logo";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { SHELL_COLUMN } from "@/lib/shell/nav";
import { cn } from "@/utils/cn";

// Hidden below sm (bottom tab bar), icons only below nav, full width above.
export function Sidebar() {
  return (
    <aside
      className={cn(
        SHELL_COLUMN,
        "hidden w-19 flex-col border-r border-ag-border-subtle px-3.5 py-4.5 sm:flex nav:w-62",
      )}
    >
      <Link
        href="/home"
        className="flex justify-center rounded-md px-2.5 pb-4.5 pt-1.5 outline-none focus-visible:shadow-ag-focus-ring nav:justify-start"
      >
        <span className="nav:hidden">
          <Logo showWordmark={false} />
        </span>
        <span className="hidden nav:block">
          <Logo />
        </span>
      </Link>
      <nav aria-label="Primary" className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.id} item={item} variant="sidebar" />
        ))}
      </nav>
      <NewPostButton />
      <div className="flex-1" />
      <DemoCard />
      <UserCard />
    </aside>
  );
}
