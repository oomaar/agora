import {
  type FeedTab,
  type NotificationFilter,
  type ProfileTab,
} from "@/types/dataSource";

const encode = encodeURIComponent;

// Every API path, built in one place for the API data source.
export const API_PATHS = {
  me: "/api/me",
  feed: (tab: FeedTab) => `/api/feed?tab=${tab}`,
  posts: "/api/posts",
  post: (postId: string) => `/api/posts/${encode(postId)}`,
  comments: (postId: string) => `/api/posts/${encode(postId)}/comments`,
  like: (postId: string) => `/api/posts/${encode(postId)}/like`,
  repost: (postId: string) => `/api/posts/${encode(postId)}/repost`,
  user: (handle: string) => `/api/users/${encode(handle)}`,
  userPosts: (handle: string, tab: ProfileTab) =>
    `/api/users/${encode(handle)}/posts?tab=${tab}`,
  follow: (userId: string) => `/api/follows/${encode(userId)}`,
  search: (query: string) => `/api/search?q=${encode(query)}`,
  trends: "/api/trends",
  suggestions: (limit: number) => `/api/suggestions?limit=${limit}`,
  notifications: (filter: NotificationFilter) =>
    `/api/notifications?filter=${filter}`,
  notificationsRead: "/api/notifications/read",
  conversations: "/api/conversations",
  conversation: (conversationId: string) =>
    `/api/conversations/${encode(conversationId)}`,
  messages: (conversationId: string) =>
    `/api/conversations/${encode(conversationId)}/messages`,
  conversationRead: (conversationId: string) =>
    `/api/conversations/${encode(conversationId)}/read`,
  unread: "/api/unread",
};
