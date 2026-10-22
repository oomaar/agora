import { type ReactNode } from "react";
import { type PostView, type Trend, type UserView } from "@/types/domain";
import { type QueryResult } from "@/types/query";

export type ExploreTab = "top" | "people" | "posts" | "media" | "topics";

export type ExploreViewProps = {
  // The search from ?q=, trimmed; empty shows discovery instead of results.
  query: string;
};

export type ExploreHeaderProps = {
  query: string;
  tab: ExploreTab;
  onTabChange: (tab: ExploreTab) => void;
};

export type ExploreSectionProps = {
  title: string;
  children: ReactNode;
};

export type ExploreQueryProps<T> = {
  query: QueryResult<T>;
  errorText: string;
  emptyText: string;
  // Data can load and still have nothing to show for this tab.
  isEmpty?: (data: T) => boolean;
  skeletonRows?: number;
  children: (data: T) => ReactNode;
};

export type TrendListProps = {
  trends: Trend[];
};

export type PersonProps = {
  person: UserView;
};

export type MediaGridProps = {
  posts: PostView[];
};

export type MediaTileProps = {
  post: PostView;
};

export type ExploreTabContentProps = {
  query: string;
  onTabChange: (tab: ExploreTab) => void;
};
