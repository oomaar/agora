import { type Pool } from "pg";
import { generateSeed } from "@/services/seed/generateSeed";
import { insertMany } from "@/lib/db/insertMany";
import { withTransaction } from "@/lib/db/withTransaction";
import { SAMPLE_ACCOUNT, SEED_EMAIL_DOMAIN } from "@/lib/auth/constants";
import { DATA_PRESETS } from "@/lib/data/presets";
import { SCENARIOS } from "@/lib/simulation/constants";
import { createId } from "@/utils/createId";
import { type Database } from "@/types/simulation";

// Replaces everything with the app preset's starter community. The signed-in
// user becomes the sample account; everyone else is a profile without a sign-in.
export async function seedDatabase(
  pool: Pool,
  passwordHash: string,
): Promise<Database> {
  const preset = DATA_PRESETS.app;
  const db = generateSeed({
    content: preset.content,
    scenario: SCENARIOS[preset.scenario],
    seed: preset.seed,
    now: Date.now(),
  });

  await withTransaction(pool, async (client) => {
    await client.query(
      "truncate users, conversations, trends, verifications, rate_limits cascade",
    );
    await insertMany(
      client,
      "users",
      {
        id: "text",
        name: "text",
        email: "text",
        email_verified: "boolean",
        handle: "text",
        bio: "text",
        location: "text",
        following_count: "integer",
        follower_count: "integer",
        created_at: "timestamptz",
        updated_at: "timestamptz",
      },
      db.users.map((user) => ({
        id: user.id,
        name: user.name,
        email:
          user.id === db.selfId
            ? SAMPLE_ACCOUNT.email
            : `${user.handle}@${SEED_EMAIL_DOMAIN}`,
        email_verified: user.id === db.selfId,
        handle: user.handle,
        bio: user.bio,
        location: user.location,
        following_count: user.followingCount,
        follower_count: user.followerCount,
        created_at: user.joinedAt,
        updated_at: user.joinedAt,
      })),
    );
    await insertMany(
      client,
      "accounts",
      {
        id: "text",
        user_id: "text",
        account_id: "text",
        provider_id: "text",
        password: "text",
      },
      [
        {
          id: createId("account"),
          user_id: db.selfId,
          account_id: db.selfId,
          provider_id: "credential",
          password: passwordHash,
        },
      ],
    );
    await insertMany(
      client,
      "follows",
      { follower_id: "text", followee_id: "text" },
      db.follows.map((follow) => ({
        follower_id: follow.followerId,
        followee_id: follow.followeeId,
      })),
    );
    await insertMany(
      client,
      "posts",
      {
        id: "text",
        author_id: "text",
        text: "text",
        media: "jsonb",
        audience: "text",
        like_count: "integer",
        repost_count: "integer",
        comment_count: "integer",
        created_at: "timestamptz",
      },
      db.posts.map((post) => ({
        id: post.id,
        author_id: post.authorId,
        text: post.text,
        media: post.media ? JSON.stringify(post.media) : null,
        audience: post.audience,
        like_count: post.likeCount,
        repost_count: post.repostCount,
        comment_count: post.commentCount,
        created_at: post.createdAt,
      })),
    );
    await insertMany(
      client,
      "comments",
      {
        id: "text",
        post_id: "text",
        author_id: "text",
        text: "text",
        created_at: "timestamptz",
      },
      db.comments.map((comment) => ({
        id: comment.id,
        post_id: comment.postId,
        author_id: comment.authorId,
        text: comment.text,
        created_at: comment.createdAt,
      })),
    );
    await insertMany(
      client,
      "reactions",
      {
        id: "text",
        kind: "text",
        user_id: "text",
        post_id: "text",
        created_at: "timestamptz",
      },
      db.reactions.map((reaction) => ({
        id: reaction.id,
        kind: reaction.kind,
        user_id: reaction.userId,
        post_id: reaction.postId,
        created_at: reaction.createdAt,
      })),
    );
    await insertMany(
      client,
      "notifications",
      {
        id: "text",
        recipient_id: "text",
        kind: "text",
        actor_id: "text",
        post_id: "text",
        text: "text",
        quote: "text",
        read: "boolean",
        created_at: "timestamptz",
      },
      db.notifications.map((notification) => ({
        id: notification.id,
        recipient_id: db.selfId,
        kind: notification.kind,
        actor_id: notification.actorId,
        post_id: notification.postId,
        text: notification.text,
        quote: notification.quote,
        read: notification.read,
        created_at: notification.createdAt,
      })),
    );
    await insertMany(
      client,
      "conversations",
      { id: "text", name: "text" },
      db.conversations.map((conversation) => ({
        id: conversation.id,
        name: conversation.name,
      })),
    );
    await insertMany(
      client,
      "conversation_members",
      { conversation_id: "text", user_id: "text", unread: "boolean" },
      db.conversations.flatMap((conversation) =>
        conversation.memberIds.map((userId) => ({
          conversation_id: conversation.id,
          user_id: userId,
          unread: userId === db.selfId && conversation.unread,
        })),
      ),
    );
    await insertMany(
      client,
      "messages",
      {
        id: "text",
        conversation_id: "text",
        sender_id: "text",
        text: "text",
        created_at: "timestamptz",
      },
      db.messages.map((message) => ({
        id: message.id,
        conversation_id: message.conversationId,
        sender_id: message.senderId,
        text: message.text,
        created_at: message.createdAt,
      })),
    );
    await insertMany(
      client,
      "trends",
      {
        id: "text",
        category: "text",
        title: "text",
        post_count: "integer",
        position: "integer",
      },
      db.trends.map((trend, position) => ({
        id: trend.id,
        category: trend.category,
        title: trend.title,
        post_count: trend.postCount,
        position,
      })),
    );
  });

  return db;
}
