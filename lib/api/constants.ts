import { type NotificationKind, type PostAudience } from "@/types/domain";
import {
  type DataErrorCode,
  type FeedTab,
  type NotificationFilter,
  type ProfileTab,
} from "@/types/dataSource";

// Allowed values for query parameters and request bodies.
export const FEED_TABS: readonly FeedTab[] = ["for-you", "following"];

export const PROFILE_TABS: readonly ProfileTab[] = [
  "posts",
  "replies",
  "media",
  "likes",
];

export const NOTIFICATION_FILTERS: readonly NotificationFilter[] = [
  "all",
  "mentions",
];

export const POST_AUDIENCES: readonly PostAudience[] = [
  "everyone",
  "following",
];

export const STATUS_BY_CODE: Record<DataErrorCode, number> = {
  validation: 400,
  unauthorized: 401,
  forbidden: 403,
  "not-found": 404,
  network: 500,
};

// Random-number suffixes tried when a generated handle is taken.
export const HANDLE_SUFFIX_ATTEMPTS = 5;

export const NOTIFICATION_LIMIT = 50;

export const PROFILE_POSTS_LIMIT = 50;

export const MESSAGE_LIMIT = 200;

export const SUGGESTION_LIMIT_MAX = 20;

// Notifications quote the post or comment they're about, cut to this length.
export const QUOTE_MAX_LENGTH = 80;

export const NOTIFICATION_TEXT: Record<
  Exclude<NotificationKind, "milestone">,
  string
> = {
  like: "liked your post",
  reply: "replied to your post",
  follow: "started following you",
  mention: "mentioned you",
};

export const NOT_FOUND = {
  user: "This account doesn't exist.",
  post: "This post isn't available. It may have been deleted.",
  conversation: "This conversation doesn't exist.",
};

export const POLL_ERRORS = {
  noPoll: "This post doesn't have a poll.",
  unknownOption: "That option isn't part of this poll.",
  alreadyVoted: "You've already voted in this poll.",
};

export const API_ERROR_MESSAGES = {
  unauthorized: "Your session has ended. Sign in again.",
  forbidden: "This request isn't allowed.",
  invalidJson: "The request body isn't valid JSON.",
  server: "Something went wrong on our side. Try again.",
  network: "Couldn't reach Agora. Check your connection and try again.",
};

// Longer search text is cut before it reaches the database.
export const SEARCH_QUERY_MAX_LENGTH = 100;
