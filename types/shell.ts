import { type ReactNode } from "react";
import { type CounterTone } from "@/types/badge";
import { type IconName } from "@/types/icon";

export type ShellUser = {
  name: string;
  handle: string;
};

export type NavCounter = {
  value: number;
  tone: CounterTone;
  label: string;
};

export type NavItem = {
  id: string;
  label: string;
  // Shorter label for the mobile tab bar.
  tabLabel?: string;
  href: string;
  icon: IconName;
  // Path prefixes that mark this item as active.
  match: string[];
  counter?: NavCounter;
  inTabBar: boolean;
};

export type NavLinkVariant = "sidebar" | "tab";

export type NavLinkProps = {
  item: NavItem;
  variant: NavLinkVariant;
};

export type Trend = {
  id: string;
  category: string;
  title: string;
};

export type SettingsSection = {
  id: string;
  label: string;
};

export type AppShellProps = {
  children: ReactNode;
};

export type PageHeaderProps = {
  title: string;
};

export type RailCardProps = {
  title: string;
  children: ReactNode;
};

export type SuggestedPersonProps = {
  person: ShellUser;
};

export type PublicPlaceholderProps = {
  title: string;
  link: { href: string; label: string };
};
