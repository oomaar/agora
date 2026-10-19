import { NavLink } from "@/components/shell/NavLink";
import { TAB_BAR_ITEMS } from "@/lib/shell/constants";

// Replaces the sidebar below the sm breakpoint.
export function BottomTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 flex h-19.5 justify-around border-t border-ag-border-subtle bg-ag-bg pb-[env(safe-area-inset-bottom)] sm:hidden"
    >
      {TAB_BAR_ITEMS.map((item) => (
        <NavLink key={item.id} item={item} variant="tab" />
      ))}
    </nav>
  );
}
