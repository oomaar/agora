import { type PostView } from "@/types/domain";
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
