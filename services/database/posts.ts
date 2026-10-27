import "server-only";
import { DataError } from "@/services/dataError";
import {
  createNotification,
  notifyMentions,
  removeNotification,
} from "@/services/database/notifications";
import { getUserByHandle } from "@/services/database/users";
import { query, selectView, selectViews, transaction } from "@/lib/db/query";
import {
  NOT_FOUND,
  OWNER_ERRORS,
  POLL_ERRORS,
  PROFILE_POSTS_LIMIT,
} from "@/lib/api/constants";
import { FEED_LIMIT, SEARCH_LIMIT } from "@/lib/data/constants";
import { escapeLike } from "@/utils/escapeLike";
import { type PostTarget } from "@/types/api";
import { type Queryable } from "@/types/db";
import { type PostView, type ReactionKind } from "@/types/domain";
import {
  type FeedTab,
  type NewPost,
  type ProfileTab,
} from "@/types/dataSource";

// In every query $1 is the viewer, and can_see_post hides "following" posts from non-followers.

const COUNT_COLUMN: Record<ReactionKind, string> = {
  like: "like_count",
  repost: "repost_count",
};

// $2 is the profile's user id, $3 the limit.
const PROFILE_TAB_QUERIES: Record<ProfileTab, string> = {
  posts: `select post_view(p, $1) as view from posts p
          where p.author_id = $2 and can_see_post(p, $1)
          order by p.created_at desc limit $3`,
  media: `select post_view(p, $1) as view from posts p
          where p.author_id = $2 and p.media is not null and can_see_post(p, $1)
          order by p.created_at desc limit $3`,
  replies: `select post_view(p, $1) as view from posts p
            join (
              select post_id, max(created_at) as at from comments
              where author_id = $2 group by post_id
            ) activity on activity.post_id = p.id
            where can_see_post(p, $1)
            order by activity.at desc limit $3`,
  likes: `select post_view(p, $1) as view from posts p
          join reactions r on r.post_id = p.id and r.user_id = $2 and r.kind = 'like'
          where can_see_post(p, $1)
          order by r.created_at desc limit $3`,
};

export function getPost(
  viewerId: string,
  postId: string,
  db?: Queryable,
): Promise<PostView> {
  return selectView(
    "select post_view(p, $1) as view from posts p where p.id = $2 and can_see_post(p, $1)",
    [viewerId, postId],
    NOT_FOUND.post,
    db,
  );
}

// Locks the post for the rest of the transaction, so its counters stay consistent.
export async function lockPost(
  db: Queryable,
  viewerId: string,
  postId: string,
): Promise<PostTarget> {
  const [post] = await query<PostTarget>(
    "select author_id, text from posts p where p.id = $2 and can_see_post(p, $1) for update",
    [viewerId, postId],
    db,
  );
  if (!post) throw new DataError("not-found", NOT_FOUND.post);
  return post;
}

// For you: everyone's posts. Following: the viewer's and the people they follow.
export function getFeed(viewerId: string, tab: FeedTab): Promise<PostView[]> {
  return selectViews(
    `select post_view(p, $1) as view from posts p
     where can_see_post(p, $1)
       and (
         $2 = 'for-you'
         or p.author_id = $1
         or exists (
           select 1 from follows f where f.follower_id = $1 and f.followee_id = p.author_id
         )
       )
     order by p.created_at desc
     limit $3`,
    [viewerId, tab, FEED_LIMIT],
  );
}

export async function getUserPosts(
  viewerId: string,
  handle: string,
  tab: ProfileTab,
): Promise<PostView[]> {
  const user = await getUserByHandle(viewerId, handle);
  return selectViews(PROFILE_TAB_QUERIES[tab], [
    viewerId,
    user.id,
    PROFILE_POSTS_LIMIT,
  ]);
}

// Newest matches for a search; the most-liked posts when there's no search yet.
export function searchPosts(
  viewerId: string,
  term: string,
): Promise<PostView[]> {
  return selectViews(
    `select post_view(p, $1) as view from posts p
     where can_see_post(p, $1) and ($2 = '' or p.text ilike $3)
     order by ${term ? "p.created_at" : "p.like_count"} desc
     limit $4`,
    [viewerId, term, `%${escapeLike(term)}%`, SEARCH_LIMIT],
  );
}

// Adds or removes a like or repost and its count. Likes notify the author.
export function setReaction(
  viewerId: string,
  postId: string,
  kind: ReactionKind,
  on: boolean,
): Promise<PostView> {
  return transaction(async (client) => {
    const post = await lockPost(client, viewerId, postId);
    const changed = on
      ? await client.query(
          "insert into reactions (kind, user_id, post_id) values ($1, $2, $3) on conflict do nothing",
          [kind, viewerId, postId],
        )
      : await client.query(
          "delete from reactions where kind = $1 and user_id = $2 and post_id = $3",
          [kind, viewerId, postId],
        );
    if (changed.rowCount) {
      const column = COUNT_COLUMN[kind];
      await client.query(
        `update posts set ${column} = greatest(0, ${column} + $2) where id = $1`,
        [postId, on ? 1 : -1],
      );
      if (kind === "like") {
        const notification = {
          recipientId: post.author_id,
          kind,
          actorId: viewerId,
          postId,
        } as const;
        if (on) {
          await createNotification(client, {
            ...notification,
            quote: post.text,
          });
        } else {
          await removeNotification(client, notification);
        }
      }
    }
    return getPost(viewerId, postId, client);
  });
}

export function createPost(
  viewerId: string,
  { text, audience, media, poll }: NewPost,
): Promise<PostView> {
  return transaction(async (client) => {
    const [{ id }] = await query<{ id: string }>(
      "insert into posts (author_id, text, audience, media) values ($1, $2, $3, $4) returning id",
      [viewerId, text, audience, media && JSON.stringify(media)],
      client,
    );
    if (poll) {
      await client.query(
        `insert into poll_options (post_id, position, text)
         select $1, option.position - 1, option.text
         from unnest($2::text[]) with ordinality as option (text, position)`,
        [id, poll],
      );
    }
    await notifyMentions(client, {
      actorId: viewerId,
      postId: id,
      text,
      exclude: [],
    });
    return getPost(viewerId, id, client);
  });
}

// Only the author can edit or delete a post. Edits change the text and mark it edited.
async function lockOwnPost(
  db: Queryable,
  viewerId: string,
  postId: string,
): Promise<void> {
  const post = await lockPost(db, viewerId, postId);
  if (post.author_id !== viewerId) {
    throw new DataError("forbidden", OWNER_ERRORS.post);
  }
}

export function updatePost(
  viewerId: string,
  postId: string,
  text: string,
): Promise<PostView> {
  return transaction(async (client) => {
    await lockOwnPost(client, viewerId, postId);
    await client.query(
      "update posts set text = $2, edited_at = now() where id = $1",
      [postId, text],
    );
    return getPost(viewerId, postId, client);
  });
}

// Comments, reactions, poll votes and notifications about the post go with it.
export function deletePost(viewerId: string, postId: string): Promise<null> {
  return transaction(async (client) => {
    await lockOwnPost(client, viewerId, postId);
    await client.query("delete from posts where id = $1", [postId]);
    return null;
  });
}

// Records the viewer's vote and bumps the option's count. Voting again for the
// same option changes nothing; a different option is rejected.
export function votePoll(
  viewerId: string,
  postId: string,
  optionId: string,
): Promise<PostView> {
  return transaction(async (client) => {
    await lockPost(client, viewerId, postId);
    const options = await query<{ id: string }>(
      "select id from poll_options where post_id = $1",
      [postId],
      client,
    );
    if (!options.length) throw new DataError("validation", POLL_ERRORS.noPoll);
    if (!options.some((option) => option.id === optionId)) {
      throw new DataError("validation", POLL_ERRORS.unknownOption);
    }
    const inserted = await client.query(
      "insert into poll_votes (post_id, user_id, option_id) values ($1, $2, $3) on conflict do nothing",
      [postId, viewerId, optionId],
    );
    if (inserted.rowCount) {
      await client.query(
        "update poll_options set vote_count = vote_count + 1 where id = $1",
        [optionId],
      );
    } else {
      const [vote] = await query<{ option_id: string }>(
        "select option_id from poll_votes where post_id = $1 and user_id = $2",
        [postId, viewerId],
        client,
      );
      if (vote.option_id !== optionId) {
        throw new DataError("validation", POLL_ERRORS.alreadyVoted);
      }
    }
    return getPost(viewerId, postId, client);
  });
}
