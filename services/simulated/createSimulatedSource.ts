import { DataError } from "@/services/dataError";
import {
  byNewest,
  getConversation,
  getPost,
  getSelf,
  getUser,
  getUserByHandle,
  hasReaction,
  isFollowing,
  nextId,
} from "@/services/simulated/database";
import { requireText } from "@/services/simulated/validation";
import {
  toCommentView,
  toConversationView,
  toMessageView,
  toNotificationView,
  toPostView,
  toUnreadCounts,
  toUserView,
} from "@/services/simulated/views";
import {
  BIO_MAX_LENGTH,
  COMMENT_MAX_LENGTH,
  FEED_LIMIT,
  HANDLE_PATTERN,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  POST_MAX_LENGTH,
  SEARCH_LIMIT,
} from "@/lib/data/constants";
import { firstName } from "@/utils/firstName";
import { type Post, type PostView, type ReactionKind } from "@/types/domain";
import { type DataSource, type ProfileTab } from "@/types/dataSource";
import { type Database, type Network } from "@/types/simulation";

function postOwner(post: PostView): string {
  return post.author.isSelf
    ? "your post"
    : `${firstName(post.author.name)}'s post`;
}

function setReaction(
  db: Database,
  post: Post,
  kind: ReactionKind,
  on: boolean,
): void {
  const has = hasReaction(db, db.selfId, post.id, kind);
  const countKey = kind === "like" ? "likeCount" : "repostCount";
  if (on && !has) {
    db.reactions.push({
      id: nextId(db, "reaction"),
      kind,
      userId: db.selfId,
      postId: post.id,
      createdAt: new Date().toISOString(),
    });
    post[countKey] += 1;
  }
  if (!on && has) {
    db.reactions = db.reactions.filter(
      (reaction) =>
        !(
          reaction.userId === db.selfId &&
          reaction.postId === post.id &&
          reaction.kind === kind
        ),
    );
    post[countKey] = Math.max(0, post[countKey] - 1);
  }
}

function userPosts(db: Database, userId: string, tab: ProfileTab): Post[] {
  const authored = db.posts
    .filter((post) => post.authorId === userId)
    .sort(byNewest);
  if (tab === "posts") return authored;
  if (tab === "media") return authored.filter((post) => post.media);
  const activity =
    tab === "replies"
      ? db.comments.filter((comment) => comment.authorId === userId)
      : db.reactions.filter(
          (reaction) => reaction.userId === userId && reaction.kind === "like",
        );
  const postIds = [
    ...new Set([...activity].sort(byNewest).map((item) => item.postId)),
  ];
  return postIds.map((postId) => getPost(db, postId));
}

// The DataSource contract implemented against the in-browser database.
// `getDb` is read on every call because resetting the simulation swaps the database.
export function createSimulatedSource(
  getDb: () => Database,
  network: Network,
): DataSource {
  const { request } = network;

  return {
    getCurrentUser: () => request(() => toUserView(getDb(), getSelf(getDb()))),

    getFeed: (tab) =>
      request(
        () => {
          const db = getDb();
          return db.posts
            .filter(
              (post) =>
                tab === "for-you" ||
                post.authorId === db.selfId ||
                isFollowing(db, db.selfId, post.authorId),
            )
            .sort(byNewest)
            .slice(0, FEED_LIMIT)
            .map((post) => toPostView(db, post));
        },
        {
          success: (posts) =>
            posts.length
              ? `Feed loaded · ${posts.length} posts`
              : "Feed loaded · no posts yet",
          failure: "Feed request failed",
        },
      ),

    getPost: (postId) =>
      request(() => toPostView(getDb(), getPost(getDb(), postId)), {
        success: (post) => `Opened ${postOwner(post)}`,
        failure: "Post request failed",
      }),

    getComments: (postId) =>
      request(() => {
        const db = getDb();
        getPost(db, postId);
        return db.comments
          .filter((comment) => comment.postId === postId)
          .sort(byNewest)
          .map((comment) => toCommentView(db, comment));
      }),

    getUser: (handle) =>
      request(() => toUserView(getDb(), getUserByHandle(getDb(), handle)), {
        success: (user) => `Opened @${user.handle}'s profile`,
        failure: "Profile request failed",
      }),

    getUserPosts: (handle, tab) =>
      request(() => {
        const db = getDb();
        const user = getUserByHandle(db, handle);
        return userPosts(db, user.id, tab).map((post) => toPostView(db, post));
      }),

    search: (query) =>
      request(
        () => {
          const db = getDb();
          const term = query.trim().toLowerCase();
          const people = db.users
            .filter((user) => user.id !== db.selfId)
            .filter(
              (user) =>
                !term ||
                [user.name, user.handle, user.bio].some((field) =>
                  field.toLowerCase().includes(term),
                ),
            )
            .sort((a, b) => b.followerCount - a.followerCount)
            .slice(0, SEARCH_LIMIT)
            .map((user) => toUserView(db, user));
          const posts = db.posts
            .filter((post) => !term || post.text.toLowerCase().includes(term))
            .sort((a, b) => (term ? byNewest(a, b) : b.likeCount - a.likeCount))
            .slice(0, SEARCH_LIMIT)
            .map((post) => toPostView(db, post));
          return { people, posts };
        },
        {
          success: (results) =>
            query.trim()
              ? `Searched for “${query.trim()}” · ${results.people.length + results.posts.length} results`
              : "Explore loaded",
          failure: "Search failed",
        },
      ),

    getTrends: () =>
      request(() => getDb().trends.map((trend) => ({ ...trend }))),

    getSuggestedPeople: (limit) =>
      request(() => {
        const db = getDb();
        return db.users
          .filter(
            (user) =>
              user.id !== db.selfId && !isFollowing(db, db.selfId, user.id),
          )
          .slice(0, limit)
          .map((user) => toUserView(db, user));
      }),

    getNotifications: (filter) =>
      request(
        () => {
          const db = getDb();
          return db.notifications
            .filter(
              (notification) =>
                filter === "all" ||
                notification.kind === "reply" ||
                notification.kind === "mention",
            )
            .sort(byNewest)
            .map((notification) => toNotificationView(db, notification));
        },
        {
          success: () => "Notifications loaded",
          failure: "Notifications request failed",
        },
      ),

    getConversations: () =>
      request(
        () => {
          const db = getDb();
          return db.conversations
            .map((conversation) => toConversationView(db, conversation))
            .sort((a, b) =>
              (b.lastMessage?.createdAt ?? "").localeCompare(
                a.lastMessage?.createdAt ?? "",
              ),
            );
        },
        {
          success: () => "Conversations loaded",
          failure: "Conversations request failed",
        },
      ),

    getConversation: (conversationId) =>
      request(() => {
        const db = getDb();
        const conversation = getConversation(db, conversationId);
        return {
          conversation: toConversationView(db, conversation),
          messages: db.messages
            .filter((message) => message.conversationId === conversationId)
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((message) => toMessageView(db, message)),
        };
      }),

    getUnreadCounts: () => request(() => toUnreadCounts(getDb())),

    setLike: (postId, liked) =>
      request(
        () => {
          const db = getDb();
          setReaction(db, getPost(db, postId), "like", liked);
          return toPostView(db, getPost(db, postId));
        },
        {
          success: (post) =>
            `${liked ? "Like" : "Unlike"} saved on ${postOwner(post)}`,
          failure: `${liked ? "Like" : "Unlike"} failed · reverted`,
        },
      ),

    setRepost: (postId, reposted) =>
      request(
        () => {
          const db = getDb();
          setReaction(db, getPost(db, postId), "repost", reposted);
          return toPostView(db, getPost(db, postId));
        },
        {
          success: (post) =>
            reposted
              ? `Reposted ${postOwner(post)}`
              : `Repost removed from ${postOwner(post)}`,
          failure: `${reposted ? "Repost" : "Undo repost"} failed · reverted`,
        },
      ),

    setFollow: (userId, following) =>
      request(
        () => {
          const db = getDb();
          const self = getSelf(db);
          const user = getUser(db, userId);
          if (user.id === self.id)
            throw new DataError("validation", "You can't follow yourself.");
          const already = isFollowing(db, self.id, user.id);
          if (following && !already) {
            db.follows.push({ followerId: self.id, followeeId: user.id });
            user.followerCount += 1;
            self.followingCount += 1;
          }
          if (!following && already) {
            db.follows = db.follows.filter(
              (follow) =>
                !(
                  follow.followerId === self.id && follow.followeeId === user.id
                ),
            );
            user.followerCount = Math.max(0, user.followerCount - 1);
            self.followingCount = Math.max(0, self.followingCount - 1);
          }
          return toUserView(db, user);
        },
        {
          success: (user) =>
            `${following ? "Followed" : "Unfollowed"} ${firstName(user.name)}`,
          failure: `${following ? "Follow" : "Unfollow"} failed · reverted`,
        },
      ),

    createPost: ({ text, audience, media }) =>
      request(
        () => {
          const db = getDb();
          const post: Post = {
            id: nextId(db, "post"),
            authorId: db.selfId,
            text: requireText(text, POST_MAX_LENGTH, "Your post"),
            media: media ? { ...media } : null,
            audience,
            createdAt: new Date().toISOString(),
            likeCount: 0,
            repostCount: 0,
            commentCount: 0,
          };
          db.posts.push(post);
          return toPostView(db, post);
        },
        { success: () => "Post published", failure: "Post failed to publish" },
      ),

    addComment: (postId, text) =>
      request(
        () => {
          const db = getDb();
          const post = getPost(db, postId);
          const comment = {
            id: nextId(db, "comment"),
            postId,
            authorId: db.selfId,
            text: requireText(text, COMMENT_MAX_LENGTH, "Your comment"),
            createdAt: new Date().toISOString(),
          };
          db.comments.push(comment);
          post.commentCount += 1;
          return toCommentView(db, comment);
        },
        { success: () => "Comment posted", failure: "Comment failed to send" },
      ),

    sendMessage: (conversationId, text) =>
      request(
        () => {
          const db = getDb();
          const conversation = getConversation(db, conversationId);
          const message = {
            id: nextId(db, "message"),
            conversationId,
            senderId: db.selfId,
            text: requireText(text, MESSAGE_MAX_LENGTH, "Your message"),
            createdAt: new Date().toISOString(),
          };
          db.messages.push(message);
          conversation.unread = false;
          return toMessageView(db, message);
        },
        { success: () => "Message delivered", failure: "Message failed" },
      ),

    markNotificationsRead: () =>
      request(
        () => {
          const db = getDb();
          db.notifications.forEach((notification) => {
            notification.read = true;
          });
          return toUnreadCounts(db);
        },
        {
          success: () => "Notifications marked as read",
          failure: "Couldn't mark notifications as read",
        },
      ),

    markConversationRead: (conversationId) =>
      request(() => {
        const db = getDb();
        getConversation(db, conversationId).unread = false;
        return toUnreadCounts(db);
      }),

    updateProfile: ({ name, handle, bio }) =>
      request(
        () => {
          const db = getDb();
          const self = getSelf(db);
          const nextHandle = handle.trim().toLowerCase();
          if (!HANDLE_PATTERN.test(nextHandle)) {
            throw new DataError(
              "validation",
              "Handles use 2–30 lowercase letters, numbers, dots or underscores.",
            );
          }
          if (
            db.users.some(
              (user) => user.handle === nextHandle && user.id !== self.id,
            )
          ) {
            throw new DataError(
              "validation",
              `@${nextHandle} is already taken.`,
            );
          }
          const nextBio = bio.trim();
          if (nextBio.length > BIO_MAX_LENGTH) {
            throw new DataError(
              "validation",
              `Your bio can be up to ${BIO_MAX_LENGTH} characters.`,
            );
          }
          self.name = requireText(name, NAME_MAX_LENGTH, "Your name");
          self.handle = nextHandle;
          self.bio = nextBio;
          return toUserView(db, self);
        },
        {
          success: () => "Profile saved",
          failure: "Profile changes weren't saved",
        },
      ),
  };
}
