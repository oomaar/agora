import { type ReactNode } from "react";
import { type CounterTone } from "@/types/badge";
import { type UnreadCountKey } from "@/types/dataSource";
import { type UserView } from "@/types/domain";
import { type IconName } from "@/types/icon";
import { type QueryResult } from "@/types/query";
import { type SettingsSectionId } from "@/types/settings";

export type NavCounter = {
  // Which unread count the badge shows.
  source: UnreadCountKey;
  tone: CounterTone;
  // Singular noun for the accessible label, e.g. "3 unread notifications".
  noun: string;
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

export type SettingsSection = {
  id: SettingsSectionId;
  label: string;
};

export type AppShellProps = {
  children: ReactNode;
};

export type PageHeaderProps = {
  title: string;
  // Shows a back button before the title.
  back?: boolean;
  // Shown at the end of the title row, e.g. "Mark all as read".
  action?: ReactNode;
  // Rendered under the title, e.g. tabs; they bring their own bottom border.
  children?: ReactNode;
};

export type BackButtonProps = {
  // Where to go when there's no previous page in this tab.
  fallbackHref: string;
};

export type RailCardProps = {
  title: string;
  children: ReactNode;
};

export type NavCounterBadgeProps = {
  counter: NavCounter;
};

export type SuggestedPersonProps = {
  person: UserView;
};

export type RailSkeletonVariant = "text" | "person";

export type RailSkeletonProps = {
  variant: RailSkeletonVariant;
  rows: number;
};

export type RailQueryProps<T> = {
  query: QueryResult<T>;
  skeleton: RailSkeletonProps;
  errorText: string;
  emptyText: string;
  children: (data: T) => ReactNode;
};
