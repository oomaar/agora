import { DataError } from "@/services/dataError";
import { type ReactionKind, type User } from "@/types/domain";
import { type Database } from "@/types/simulation";

export function createEmptyDatabase(): Database {
  return {
    selfId: "",
    users: [],
    follows: [],
    posts: [],
    comments: [],
    reactions: [],
    notifications: [],
    conversations: [],
    messages: [],
    trends: [],
    nextId: 0,
  };
}

export function nextId(db: Database, prefix: string): string {
  db.nextId += 1;
  return `${prefix}_${db.nextId}`;
}

export function byNewest(
  a: { createdAt: string },
  b: { createdAt: string },
): number {
  return b.createdAt.localeCompare(a.createdAt);
}

export function getSelf(db: Database): User {
  return getUser(db, db.selfId);
}

export function getUser(db: Database, userId: string) {
  const user = db.users.find((candidate) => candidate.id === userId);
  if (!user) throw new DataError("not-found", "This account doesn't exist.");
  return user;
}

export function getUserByHandle(db: Database, handle: string) {
  const user = db.users.find((candidate) => candidate.handle === handle);
  if (!user) throw new DataError("not-found", "This account doesn't exist.");
  return user;
}

export function getPost(db: Database, postId: string) {
  const post = db.posts.find((candidate) => candidate.id === postId);
  if (!post)
    throw new DataError(
      "not-found",
      "This post isn't available. It may have been deleted.",
    );
  return post;
}

export function getConversation(db: Database, conversationId: string) {
  const conversation = db.conversations.find(
    (candidate) => candidate.id === conversationId,
  );
  if (!conversation)
    throw new DataError("not-found", "This conversation doesn't exist.");
  return conversation;
}

export function isFollowing(
  db: Database,
  followerId: string,
  followeeId: string,
): boolean {
  return db.follows.some(
    (follow) =>
      follow.followerId === followerId && follow.followeeId === followeeId,
  );
}

export function hasReaction(
  db: Database,
  userId: string,
  postId: string,
  kind: ReactionKind,
): boolean {
  return db.reactions.some(
    (reaction) =>
      reaction.userId === userId &&
      reaction.postId === postId &&
      reaction.kind === kind,
  );
}
