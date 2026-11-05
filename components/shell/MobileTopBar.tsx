"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/ui/Logo";
import { Menu } from "@/components/ui/Menu";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAccountMenuItems } from "@/hooks/shell/useAccountMenuItems";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";

// Phones only, at the top of the feed: your avatar opens the account menu (Settings
// isn't in the tab bar), with the logo in the middle.
export function MobileTopBar() {
  const { data: user } = useCurrentUser();
  const items = useAccountMenuItems();
  return (
    <div className="flex h-13 items-center justify-between border-b border-ag-border-subtle px-4 sm:hidden">
      {user ? (
        <Menu
          label="Account options"
          trigger={
            <Avatar
              name={user.name}
              handle={user.handle}
              src={user.avatarUrl}
              size="xs"
            />
          }
          items={items}
          align="start"
        />
      ) : (
        <Skeleton shape="circle" className="size-7 flex-none" />
      )}
      <Logo />
      {/* Balances the avatar so the logo stays centred. */}
      <span aria-hidden="true" className="w-8.5" />
    </div>
  );
}
