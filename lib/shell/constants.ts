import { type NavItem, type SettingsSection } from "@/types/shell";

// Replaced with the signed-in account's handle when the nav renders.
export const HANDLE_TOKEN = ":handle";

export const COMPOSE_PARAM = "compose";

export const SETTINGS_SECTIONS: SettingsSection[] = [
  { id: "account", label: "Account" },
  { id: "privacy", label: "Privacy & safety" },
  { id: "notifications", label: "Notifications" },
  { id: "appearance", label: "Appearance" },
  { id: "demo", label: "Demo" },
];

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/home",
    icon: "home",
    match: ["/home", "/post"],
    inTabBar: true,
  },
  {
    id: "explore",
    label: "Explore",
    href: "/explore",
    icon: "search",
    match: ["/explore"],
    inTabBar: true,
  },
  {
    id: "notifications",
    label: "Notifications",
    tabLabel: "Alerts",
    href: "/notifications",
    icon: "bell",
    match: ["/notifications"],
    counter: { source: "notifications", tone: "accent", noun: "notification" },
    inTabBar: true,
  },
  {
    id: "messages",
    label: "Messages",
    href: "/messages",
    icon: "mail",
    match: ["/messages"],
    counter: { source: "conversations", tone: "neutral", noun: "conversation" },
    inTabBar: true,
  },
  {
    id: "profile",
    label: "Profile",
    href: `/u/${HANDLE_TOKEN}`,
    icon: "user",
    match: [`/u/${HANDLE_TOKEN}`],
    inTabBar: true,
  },
  {
    id: "settings",
    label: "Settings",
    href: `/settings/${SETTINGS_SECTIONS[0].id}`,
    icon: "settings",
    match: ["/settings"],
    inTabBar: false,
  },
];

export const TAB_BAR_ITEMS = NAV_ITEMS.filter((item) => item.inTabBar);

// Rows shown in the rail cards.
export const RAIL_TREND_LIMIT = 3;

export const RAIL_SUGGESTION_LIMIT = 2;

export const FOOTER_LINKS = ["About", "Privacy", "Terms"];

export const COPYRIGHT = "© 2026 Agora";
