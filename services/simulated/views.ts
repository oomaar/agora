import {
  byNewest,
  getPollVote,
  getUser,
  hasReaction,
  isFollowing,
} from "@/services/simulated/database";
import {
  type Comment,
  type Conversation,
  type Message,
  type Notification,
  type Post,
  type User,
  type CommentView,
  type ConversationView,
  type MessageView,
  type NotificationView,
  type PostView,
  type UserView,
} from "@/types/domain";
import { type UnreadCounts } from "@/types/dataSource";
import { type Database } from "@/types/simulation";

// Builders that join stored entities into the shapes the data source returns.
// Every call returns fresh objects, so callers never hold references into the database.

export function toUserView(db: Database, user: User): UserView {
  return {
    ...user,
    isSelf: user.id === db.selfId,
    isFollowing: isFollowing(db, db.selfId, user.id),
  };
}

export function toPostView(db: Database, post: Post): PostView {
  return {
    ...post,
    media: post.media ? { ...post.media } : null,
    poll: post.poll
      ? { options: post.poll.options.map((option) => ({ ...option })) }
      : null,
    author: toUserView(db, getUser(db, post.authorId)),
    liked: hasReaction(db, db.selfId, post.id, "like"),
    reposted: hasReaction(db, db.selfId, post.id, "repost"),
    votedOptionId: getPollVote(db, db.selfId, post.id)?.optionId ?? null,
  };
}

export function toCommentView(db: Database, comment: Comment): CommentView {
  return {
    ...comment,
    author: toUserView(db, getUser(db, comment.authorId)),
    status: "sent",
  };
}

export function toNotificationView(
  db: Database,
  notification: Notification,
): NotificationView {
  return {
    ...notification,
    actor: notification.actorId
      ? toUserView(db, getUser(db, notification.actorId))
      : null,
  };
}

export function toMessageView(db: Database, message: Message): MessageView {
  return {
    ...message,
    fromSelf: message.senderId === db.selfId,
    status: "sent",
  };
}

export function toConversationView(
  db: Database,
  conversation: Conversation,
): ConversationView {
  const lastMessage = db.messages
    .filter((message) => message.conversationId === conversation.id)
    .sort(byNewest)[0];
  return {
    ...conversation,
    memberIds: [...conversation.memberIds],
    members: conversation.memberIds
      .filter((id) => id !== db.selfId)
      .map((id) => toUserView(db, getUser(db, id))),
    lastMessage: lastMessage ? { ...lastMessage } : null,
  };
}

export function toUnreadCounts(db: Database): UnreadCounts {
  return {
    notifications: db.notifications.filter((notification) => !notification.read)
      .length,
    conversations: db.conversations.filter(
      (conversation) => conversation.unread,
    ).length,
  };
}
