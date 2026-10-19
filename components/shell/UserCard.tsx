"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { Menu } from "@/components/ui/Menu";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { type MenuItem } from "@/types/menu";

const SETTINGS_HREF =
  NAV_ITEMS.find((item) => item.id === "settings")?.href ?? "/settings";

export function UserCard() {
  const router = useRouter();
  const user = useCurrentUser();
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

  if (user.status === "error") {
    return (
      <div
        role="alert"
        className="flex items-center justify-center gap-2.5 px-1.5 py-2 nav:justify-start nav:px-2.5"
      >
        <span className="hidden flex-1 text-[12.5px] text-ag-text-secondary nav:block">
          Couldn&apos;t load your account
        </span>
        <IconButton
          icon="repost"
          label="Try loading your account again"
          size="sm"
          onClick={user.retry}
        />
      </div>
    );
  }

  if (user.status !== "success") {
    return (
      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-2.5 px-1.5 py-2 nav:justify-start nav:px-2.5"
      >
        <Skeleton shape="circle" className="size-9 flex-none" />
        <span className="hidden flex-1 flex-col gap-2 nav:flex">
          <Skeleton className="w-24" />
          <Skeleton className="w-16" />
        </span>
      </div>
    );
  }

  const { name, handle } = user.data;
  return (
    <div className="flex items-center gap-1 rounded-md transition-colors nav:hover:bg-ag-nav-hover">
      <Link
        href={`/u/${handle}`}
        className="flex min-w-0 flex-1 items-center justify-center gap-2.5 rounded-md px-1.5 py-2 outline-none focus-visible:shadow-ag-focus-ring nav:justify-start nav:px-2.5"
      >
        <Avatar name={name} handle={handle} size="sm" />
        <span className="hidden min-w-0 flex-col nav:flex">
          <span className="truncate text-[13.5px] font-semibold">{name}</span>
          <span className="truncate text-[12px] text-ag-text-secondary">
            @{handle}
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
