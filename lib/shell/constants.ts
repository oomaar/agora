import {
  type NavItem,
  type SettingsSection,
  type ShellUser,
  type Trend,
} from "@/types/shell";

// Placeholder data until the data layer lands in Phase 3.
export const CURRENT_USER: ShellUser = { name: "Sam Rivera", handle: "sam" };

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
    counter: { value: 3, tone: "accent", label: "3 unread notifications" },
    inTabBar: true,
  },
  {
    id: "messages",
    label: "Messages",
    href: "/messages",
    icon: "mail",
    match: ["/messages"],
    counter: { value: 2, tone: "neutral", label: "2 unread conversations" },
    inTabBar: true,
  },
  {
    id: "profile",
    label: "Profile",
    href: `/u/${CURRENT_USER.handle}`,
    icon: "user",
    match: [`/u/${CURRENT_USER.handle}`],
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

export const TRENDS: Trend[] = [
  {
    id: "server-components",
    category: "Technology · Trending",
    title: "Server components",
  },
  { id: "farmers-markets", category: "Food", title: "Farmers markets" },
  { id: "october-reading", category: "Books", title: "October reading lists" },
];

export const SUGGESTED_PEOPLE: ShellUser[] = [
  { name: "Nadia Idris", handle: "nadia.dev" },
  { name: "Oliver Grant", handle: "ogrant" },
];

export const FOOTER_LINKS = ["About", "Privacy", "Terms"];

export const COPYRIGHT = "© 2026 Agora";
