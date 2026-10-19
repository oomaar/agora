"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Menu } from "@/components/ui/Menu";
import { CURRENT_USER, NAV_ITEMS } from "@/lib/shell/constants";
import { type MenuItem } from "@/types/menu";

const PROFILE_HREF = `/u/${CURRENT_USER.handle}`;
const SETTINGS_HREF =
  NAV_ITEMS.find((item) => item.id === "settings")?.href ?? "/settings";

export function UserCard() {
  const router = useRouter();
  const items: MenuItem[] = [
    {
      id: "settings",
      label: "Settings",
      icon: "settings",
      onSelect: () => router.push(SETTINGS_HREF),
    },
    // Auth arrives in Phase 4; until then logging out returns to the welcome page.
    {
      id: "logout",
      label: "Log out",
      danger: true,
      onSelect: () => router.push("/"),
    },
  ];
  return (
    <div className="flex items-center gap-1 rounded-md transition-colors nav:hover:bg-ag-nav-hover">
      <Link
        href={PROFILE_HREF}
        className="flex min-w-0 flex-1 items-center justify-center gap-2.5 rounded-md px-1.5 py-2 outline-none focus-visible:shadow-ag-focus-ring nav:justify-start nav:px-2.5"
      >
        <Avatar
          name={CURRENT_USER.name}
          handle={CURRENT_USER.handle}
          size="sm"
        />
        <span className="hidden min-w-0 flex-col nav:flex">
          <span className="truncate text-[13.5px] font-semibold">
            {CURRENT_USER.name}
          </span>
          <span className="truncate text-[12px] text-ag-text-secondary">
            @{CURRENT_USER.handle}
          </span>
        </span>
      </Link>
      <div className="hidden nav:block">
        <Menu
          label="Account options"
          trigger={<Icon name="more" size={18} />}
          items={items}
          side="top"
        />
      </div>
    </div>
  );
}
