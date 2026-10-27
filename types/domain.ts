import { type PostMedia } from "@/types/post";

// Ids carry a prefix (user_, post_, comment_ …) so they are unique across
// entity kinds; the query cache relies on that to patch an entity everywhere.

export type User = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  location: string | null;
  joinedAt: string;
  followingCount: number;
  followerCount: number;
};

export type PostAudience = "everyone" | "following";

export type PollOption = {
  id: string;
  text: string;
  voteCount: number;
};

export type Poll = {
  options: PollOption[];
};

// One vote per person per poll; the vote can't be changed.
export type PollVote = {
  postId: string;
  userId: string;
  optionId: string;
};

export type Post = {
  id: string;
  authorId: string;
  text: string;
  media: PostMedia | null;
  poll: Poll | null;
  audience: PostAudience;
  createdAt: string;
  likeCount: number;
  repostCount: number;
  commentCount: number;
};

export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type ReactionKind = "like" | "repost";

export type Reaction = {
  id: string;
  kind: ReactionKind;
  userId: string;
  postId: string;
  createdAt: string;
};

export type Follow = {
  followerId: string;
  followeeId: string;
};

export type NotificationKind =
  | "like"
  | "reply"
  | "follow"
  | "mention"
  | "milestone";

export type Notification = {
  id: string;
  kind: NotificationKind;
  // null when Agora itself is the sender (milestones).
  actorId: string | null;
  postId: string | null;
  text: string;
  quote: string | null;
  createdAt: string;
  read: boolean;
};

export type Conversation = {
  id: string;
  memberIds: string[];
  // Group conversations have a name; one-to-one conversations use the other member's name.
  name: string | null;
  unread: boolean;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

// Per-person settings; notification switches decide which activity creates a notification.
export type UserSettings = {
  defaultAudience: PostAudience;
  notifyLikes: boolean;
  // Replies and mentions.
  notifyReplies: boolean;
  notifyFollows: boolean;
};

export type Trend = {
  id: string;
  category: string;
  title: string;
  postCount: number;
};

// Shapes returned by a data source: entities joined with what the signed-in user needs to see.

export type UserView = User & {
  isSelf: boolean;
  isFollowing: boolean;
};

export type PostView = Post & {
  author: UserView;
  liked: boolean;
  reposted: boolean;
  // The option the signed-in user voted for; null before voting or without a poll.
  votedOptionId: string | null;
};

export type DeliveryStatus = "sending" | "sent" | "failed";

export type CommentView = Comment & {
  author: UserView;
  status: DeliveryStatus;
};

export type NotificationView = Notification & {
  actor: UserView | null;
};

export type ConversationView = Conversation & {
  members: UserView[];
  lastMessage: Message | null;
};

export type MessageView = Message & {
  fromSelf: boolean;
  status: DeliveryStatus;
};

export type ConversationThread = {
  conversation: ConversationView;
  messages: MessageView[];
};
