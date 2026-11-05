"use client";

import { useSession } from "@/hooks/auth/useSession";
import { useAppRouter } from "@/hooks/shell/useAppRouter";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { type MenuItem } from "@/types/menu";

const SETTINGS_HREF =
  NAV_ITEMS.find((item) => item.id === "settings")?.href ?? "/settings";

// The account menu's items: Settings, then Log out (Exit demo inside the demo).
export function useAccountMenuItems(): MenuItem[] {
  const router = useAppRouter();
  const { signOut, signOutLabel } = useSession();
  return [
    {
      id: "settings",
      label: "Settings",
      icon: "settings",
      onSelect: () => router.push(SETTINGS_HREF),
    },
    {
      id: "logout",
      label: signOutLabel,
      danger: true,
      onSelect: signOut,
    },
  ];
}
