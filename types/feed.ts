import { type ReactNode } from "react";
import { type PostView } from "@/types/domain";
import { type QueryResult } from "@/types/query";
import { type FeedTab } from "@/types/dataSource";

export type FeedEmptyCopy = {
  title: string;
  description: string;
};

export type PostItemProps = {
  post: PostView;
};

export type FeedListProps = {
  tab: FeedTab;
};

export type PostListProps = {
  query: QueryResult<PostView[]>;
  emptyTitle: string;
  emptyDescription: string;
  emptyActions?: ReactNode;
  errorTitle: string;
  // Replaces the default skeletons while loading.
  loading?: ReactNode;
};
