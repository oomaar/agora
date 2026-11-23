import {
  type CommentView,
  type ConversationThread,
  type ConversationUpdates,
  type ConversationView,
  type MessageAttachment,
  type MessageView,
  type NotificationView,
  type PostAudience,
  type PostView,
  type Trend,
  type UserSettings,
  type UserView,
} from "@/types/domain";
import {
  type ProfilePhotoKind,
  type UploadedMedia,
  type UploadOptions,
  type UploadPurpose,
} from "@/types/media";
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
  // Option texts, or null for a post without a poll.
  poll: string[] | null;
};

export type NewMessage = {
  text: string;
  // Already uploaded; the API checks each URL and takes the kind from it.
  attachments: MessageAttachment[];
};

export type ProfileUpdate = {
  name: string;
  handle: string;
  bio: string;
};

export type SettingsUpdate = Partial<UserSettings>;

export type DataErrorCode =
  "network" | "not-found" | "validation" | "unauthorized" | "forbidden";

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
  // Polled while a conversation is open. `since` is the latest message from
  // someone else already on screen (null when there's none).
  getConversationUpdates: (
    conversationId: string,
    since: string | null,
  ) => Promise<ConversationUpdates>;
  getUnreadCounts: () => Promise<UnreadCounts>;
  getSettings: () => Promise<UserSettings>;
  setLike: (postId: string, liked: boolean) => Promise<PostView>;
  setRepost: (postId: string, reposted: boolean) => Promise<PostView>;
  setFollow: (userId: string, following: boolean) => Promise<UserView>;
  votePoll: (postId: string, optionId: string) => Promise<PostView>;
  createPost: (post: NewPost) => Promise<PostView>;
  // Editing and deleting are for the author only.
  updatePost: (postId: string, text: string) => Promise<PostView>;
  deletePost: (postId: string) => Promise<null>;
  addComment: (postId: string, text: string) => Promise<CommentView>;
  updateComment: (commentId: string, text: string) => Promise<CommentView>;
  deleteComment: (commentId: string) => Promise<null>;
  // Opens the one-to-one conversation with this person, creating it the first time.
  startConversation: (userId: string) => Promise<ConversationView>;
  sendMessage: (
    conversationId: string,
    message: NewMessage,
  ) => Promise<MessageView>;
  // Tells the other members you're typing (true) or stopped (false).
  setTyping: (conversationId: string, typing: boolean) => Promise<null>;
  markNotificationsRead: () => Promise<UnreadCounts>;
  markConversationRead: (conversationId: string) => Promise<UnreadCounts>;
  updateProfile: (update: ProfileUpdate) => Promise<UserView>;
  // Sets the photo to an uploaded file's URL, or removes it with null.
  setProfilePhoto: (
    kind: ProfilePhotoKind,
    url: string | null,
  ) => Promise<UserView>;
  uploadMedia: (
    file: File,
    purpose: UploadPurpose,
    options?: UploadOptions,
  ) => Promise<UploadedMedia>;
  updateSettings: (update: SettingsUpdate) => Promise<UserSettings>;
};
