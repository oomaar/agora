import "server-only";
import {
  createNotification,
  notifyMentions,
} from "@/services/database/notifications";
import { getPost, lockPost } from "@/services/database/posts";
import { query, selectView, selectViews, transaction } from "@/lib/db/query";
import { NOT_FOUND } from "@/lib/api/constants";
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
