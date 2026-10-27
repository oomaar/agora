import "server-only";
import { getUnreadCounts } from "@/services/database/unread";
import { query, selectViews } from "@/lib/db/query";
import {
  NOTIFICATION_LIMIT,
  NOTIFICATION_TEXT,
  QUOTE_MAX_LENGTH,
} from "@/lib/api/constants";
import { extractMentions } from "@/utils/extractMentions";
import { truncate } from "@/utils/truncate";
import { type MentionInput, type NotificationInput } from "@/types/api";
import { type Queryable } from "@/types/db";
import { type NotificationView } from "@/types/domain";
import { type NotificationFilter, type UnreadCounts } from "@/types/dataSource";

export function getNotifications(
  viewerId: string,
  filter: NotificationFilter,
): Promise<NotificationView[]> {
  return selectViews(
    `select notification_view(n, $1) as view from notifications n
     where n.recipient_id = $1 and ($2 = 'all' or n.kind in ('reply', 'mention'))
     order by n.created_at desc
     limit $3`,
    [viewerId, filter, NOTIFICATION_LIMIT],
  );
}

export async function markNotificationsRead(
  viewerId: string,
): Promise<UnreadCounts> {
  await query(
    "update notifications set read = true where recipient_id = $1 and not read",
    [viewerId],
  );
  return getUnreadCounts(viewerId);
}

// Nobody is notified about their own activity, or about activity they switched off.
export async function createNotification(
  db: Queryable,
  { recipientId, kind, actorId, postId, quote }: NotificationInput,
): Promise<void> {
  if (recipientId === actorId) return;
  await query(
    `insert into notifications (recipient_id, kind, actor_id, post_id, text, quote)
     select $1, $2, $3, $4, $5, $6
     where wants_notification($1, $2)`,
    [
      recipientId,
      kind,
      actorId,
      postId,
      NOTIFICATION_TEXT[kind],
      quote && truncate(quote, QUOTE_MAX_LENGTH),
    ],
    db,
  );
}

// Undoing a like or follow takes its notification back.
export async function removeNotification(
  db: Queryable,
  { recipientId, kind, actorId, postId }: Omit<NotificationInput, "quote">,
): Promise<void> {
  await query(
    `delete from notifications
     where recipient_id = $1 and kind = $2 and actor_id = $3 and post_id is not distinct from $4`,
    [recipientId, kind, actorId, postId],
    db,
  );
}

// Notifies everyone @mentioned in `text` who can see the post and wants mentions.
export async function notifyMentions(
  db: Queryable,
  { actorId, postId, text, exclude }: MentionInput,
): Promise<void> {
  const handles = extractMentions(text);
  if (!handles.length) return;
  await query(
    `insert into notifications (recipient_id, kind, actor_id, post_id, text, quote)
     select u.id, 'mention', $1, $2, $3, $4
     from users u
     join posts p on p.id = $2
     where u.handle = any($5)
       and u.id <> $1
       and not (u.id = any($6))
       and can_see_post(p, u.id)
       and wants_notification(u.id, 'mention')`,
    [
      actorId,
      postId,
      NOTIFICATION_TEXT.mention,
      truncate(text, QUOTE_MAX_LENGTH),
      handles,
      exclude,
    ],
    db,
  );
}
