import { type PostAudience } from "@/types/domain";
import { type FeedTab } from "@/types/dataSource";
import { type TabItem } from "@/types/tabs";
import { type FeedEmptyCopy } from "@/types/feed";

// The reply box's id: /post/[id]#reply lands on it with the field focused.
export const REPLY_HASH = "reply";

export const FEED_TAB_ITEMS: TabItem<FeedTab>[] = [
  { id: "for-you", label: "For you" },
  { id: "following", label: "Following" },
];

export const FEED_SKELETON_COUNT = 3;

export const FEED_EMPTY_COPY: Record<FeedTab, FeedEmptyCopy> = {
  "for-you": {
    title: "Your feed is quiet",
    description: "Nobody has posted yet. Write the first post in the square.",
  },
  following: {
    title: "Your feed is quiet",
    description:
      "Posts from you and the people you follow show up here. Follow a few people, or write a post.",
  },
};

export const AUDIENCE_LABELS: Record<PostAudience, string> = {
  everyone: "Everyone",
  following: "Followers",
};

// The character counter turns to a warning this close to the limit.
export const CHARS_WARNING_AT = 20;

export const COMPOSE_PUBLISH_ERROR =
  "Couldn't publish. Your draft is kept, so you can try again.";
