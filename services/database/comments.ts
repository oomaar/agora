import "server-only";
import { DataError } from "@/services/dataError";
import {
  createNotification,
  notifyMentions,
  removeNotification,
} from "@/services/database/notifications";
import { getPost, lockPost } from "@/services/database/posts";
import { query, selectView, selectViews, transaction } from "@/lib/db/query";
import { NOT_FOUND, OWNER_ERRORS } from "@/lib/api/constants";
import { type CommentTarget } from "@/types/api";
import { type Queryable } from "@/types/db";
import { type CommentView } from "@/types/domain";

export async function getComments(
  viewerId: string,
  postId: string,
): Promise<CommentView[]> {
  await getPost(viewerId, postId);
  return selectViews(
    `select comment_view(c, $1) as view from comments c
     where c.post_id = $2
     order by c.created_at desc`,
    [viewerId, postId],
  );
}

// Saves the comment, bumps the post's count and notifies the author and anyone mentioned.
export function addComment(
  viewerId: string,
  postId: string,
  text: string,
): Promise<CommentView> {
  return transaction(async (client) => {
    const post = await lockPost(client, viewerId, postId);
    const [{ id }] = await query<{ id: string }>(
      "insert into comments (post_id, author_id, text) values ($1, $2, $3) returning id",
      [postId, viewerId, text],
      client,
    );
    await client.query(
      "update posts set comment_count = comment_count + 1 where id = $1",
      [postId],
    );
    await createNotification(client, {
      recipientId: post.author_id,
      kind: "reply",
      actorId: viewerId,
      postId,
      quote: text,
    });
    await notifyMentions(client, {
      actorId: viewerId,
      postId,
      text,
      exclude: [post.author_id],
    });
    return selectView<CommentView>(
      "select comment_view(c, $1) as view from comments c where c.id = $2",
      [viewerId, id],
      NOT_FOUND.post,
      client,
    );
  });
}

// Locks the viewer's own comment on a post they can still see.
async function lockOwnComment(
  db: Queryable,
  viewerId: string,
  commentId: string,
): Promise<CommentTarget> {
  const [comment] = await query<CommentTarget>(
    `select c.author_id, c.post_id, p.author_id as post_author_id
     from comments c join posts p on p.id = c.post_id
     where c.id = $2 and can_see_post(p, $1)
     for update of c`,
    [viewerId, commentId],
    db,
  );
  if (!comment) throw new DataError("not-found", NOT_FOUND.comment);
  if (comment.author_id !== viewerId) {
    throw new DataError("forbidden", OWNER_ERRORS.comment);
  }
  return comment;
}

export function updateComment(
  viewerId: string,
  commentId: string,
  text: string,
): Promise<CommentView> {
  return transaction(async (client) => {
    await lockOwnComment(client, viewerId, commentId);
    await client.query(
      "update comments set text = $2, edited_at = now() where id = $1",
      [commentId, text],
    );
    return selectView<CommentView>(
      "select comment_view(c, $1) as view from comments c where c.id = $2",
      [viewerId, commentId],
      NOT_FOUND.comment,
      client,
    );
  });
}

// Drops the post's count. The author's "replied" notification goes once the
// viewer has no comments left on the post.
export function deleteComment(
  viewerId: string,
  commentId: string,
): Promise<null> {
  return transaction(async (client) => {
    const comment = await lockOwnComment(client, viewerId, commentId);
    await lockPost(client, viewerId, comment.post_id);
    await client.query("delete from comments where id = $1", [commentId]);
    await client.query(
      "update posts set comment_count = greatest(0, comment_count - 1) where id = $1",
      [comment.post_id],
    );
    const [{ remaining }] = await query<{ remaining: number }>(
      "select count(*)::int as remaining from comments where post_id = $1 and author_id = $2",
      [comment.post_id, viewerId],
      client,
    );
    if (!remaining) {
      await removeNotification(client, {
        recipientId: comment.post_author_id,
        kind: "reply",
        actorId: viewerId,
        postId: comment.post_id,
      });
    }
    return null;
  });
}
