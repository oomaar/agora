import {
  type CommentView,
  type ConversationThread,
  type ConversationView,
  type MessageView,
  type NotificationView,
  type PostAudience,
  type PostView,
  type Trend,
  type UserView,
} from "@/types/domain";
import { type PostMedia } from "@/types/post";

export type FeedTab = "for-you" | "following";

export type ProfileTab = "posts" | "replies" | "media" | "likes";

export type NotificationFilter = "all" | "mentions";

export type SearchResults = {
  people: UserView[];
  posts: PostView[];
};

export type UnreadCounts = {
  notifications: number;
  conversations: number;
};

export type UnreadCountKey = keyof UnreadCounts;

export type NewPost = {
  text: string;
  audience: PostAudience;
  media: PostMedia | null;
};

export type ProfileUpdate = {
  name: string;
  handle: string;
  bio: string;
};

export type DataErrorCode = "network" | "not-found" | "validation";

// The one contract every data source implements, so the app and the demo share components.
export type DataSource = {
  getCurrentUser: () => Promise<UserView>;
  getFeed: (tab: FeedTab) => Promise<PostView[]>;
  getPost: (postId: string) => Promise<PostView>;
  getComments: (postId: string) => Promise<CommentView[]>;
  getUser: (handle: string) => Promise<UserView>;
  getUserPosts: (handle: string, tab: ProfileTab) => Promise<PostView[]>;
  search: (query: string) => Promise<SearchResults>;
  getTrends: () => Promise<Trend[]>;
  getSuggestedPeople: (limit: number) => Promise<UserView[]>;
  getNotifications: (filter: NotificationFilter) => Promise<NotificationView[]>;
  getConversations: () => Promise<ConversationView[]>;
  getConversation: (conversationId: string) => Promise<ConversationThread>;
  getUnreadCounts: () => Promise<UnreadCounts>;
  setLike: (postId: string, liked: boolean) => Promise<PostView>;
  setRepost: (postId: string, reposted: boolean) => Promise<PostView>;
  setFollow: (userId: string, following: boolean) => Promise<UserView>;
  createPost: (post: NewPost) => Promise<PostView>;
  addComment: (postId: string, text: string) => Promise<CommentView>;
  sendMessage: (conversationId: string, text: string) => Promise<MessageView>;
  markNotificationsRead: () => Promise<UnreadCounts>;
  markConversationRead: (conversationId: string) => Promise<UnreadCounts>;
  updateProfile: (update: ProfileUpdate) => Promise<UserView>;
};
