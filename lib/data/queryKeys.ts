import {
  type FeedTab,
  type NotificationFilter,
  type ProfileTab,
} from "@/types/dataSource";

export const queryKeys = {
  currentUser: () => "current-user",
  feed: (tab: FeedTab) => `feed:${tab}`,
  post: (postId: string) => `post:${postId}`,
  comments: (postId: string) => `comments:${postId}`,
  user: (handle: string) => `user:${handle}`,
  userPosts: (handle: string, tab: ProfileTab) => `user-posts:${handle}:${tab}`,
  search: (query: string) => `search:${query}`,
  trends: () => "trends",
  suggestedPeople: (limit: number) => `suggested-people:${limit}`,
  notifications: (filter: NotificationFilter) => `notifications:${filter}`,
  conversations: () => "conversations",
  conversation: (conversationId: string) => `conversation:${conversationId}`,
  unreadCounts: () => "unread-counts",
  settings: () => "settings",
};
