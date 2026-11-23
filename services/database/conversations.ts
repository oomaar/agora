import "server-only";
import { DataError } from "@/services/dataError";
import { getUnreadCounts } from "@/services/database/unread";
import { getUserById } from "@/services/database/users";
import { query, selectView, selectViews, transaction } from "@/lib/db/query";
import {
  CONVERSATION_ERRORS,
  MESSAGE_LIMIT,
  NOT_FOUND,
  TYPING_TTL_SECONDS,
} from "@/lib/api/constants";
import { type Queryable } from "@/types/db";
import {
  type ConversationThread,
  type ConversationUpdates,
  type ConversationView,
  type MessageView,
} from "@/types/domain";
import { type NewMessage, type UnreadCounts } from "@/types/dataSource";

// Only members can see a conversation; to anyone else it doesn't exist.

// Marks the conversation read for the viewer, which also proves they're a member.
async function markRead(
  viewerId: string,
  conversationId: string,
  db?: Queryable,
): Promise<void> {
  const rows = await query(
    "update conversation_members set unread = false where conversation_id = $2 and user_id = $1 returning 1",
    [viewerId, conversationId],
    db,
  );
  if (!rows.length) throw new DataError("not-found", NOT_FOUND.conversation);
}

async function requireMember(
  viewerId: string,
  conversationId: string,
): Promise<void> {
  const rows = await query(
    "select 1 from conversation_members where conversation_id = $2 and user_id = $1",
    [viewerId, conversationId],
  );
  if (!rows.length) throw new DataError("not-found", NOT_FOUND.conversation);
}

function getConversationView(
  viewerId: string,
  conversationId: string,
  db?: Queryable,
): Promise<ConversationView> {
  return selectView(
    `select conversation_view(c, $1) as view from conversations c
     join conversation_members m on m.conversation_id = c.id and m.user_id = $1
     where c.id = $2`,
    [viewerId, conversationId],
    NOT_FOUND.conversation,
    db,
  );
}

// Most recent activity first; a conversation without messages counts from when it started.
export function getConversations(
  viewerId: string,
): Promise<ConversationView[]> {
  return selectViews(
    `select conversation_view(c, $1) as view from conversations c
     join conversation_members m on m.conversation_id = c.id and m.user_id = $1
     order by coalesce(
       (select max(msg.created_at) from messages msg where msg.conversation_id = c.id),
       c.created_at
     ) desc`,
    [viewerId],
  );
}

// The conversation with its latest messages, oldest first.
export async function getConversation(
  viewerId: string,
  conversationId: string,
): Promise<ConversationThread> {
  const conversation = await getConversationView(viewerId, conversationId);
  const messages = await selectViews<MessageView>(
    `select message_view(msg, $1) as view from messages msg
     where msg.id in (
       select id from messages where conversation_id = $2
       order by created_at desc limit $3
     )
     order by msg.created_at`,
    [viewerId, conversationId, MESSAGE_LIMIT],
  );
  return { conversation, messages };
}

// Returns the one-to-one conversation between the viewer and this person, creating it
// the first time. The lock on the pair stops two requests from creating it twice.
export function startConversation(
  viewerId: string,
  userId: string,
): Promise<ConversationView> {
  return transaction(async (client) => {
    await getUserById(viewerId, userId, client);
    if (userId === viewerId) {
      throw new DataError("validation", CONVERSATION_ERRORS.self);
    }
    await client.query("select pg_advisory_xact_lock(hashtext($1))", [
      [viewerId, userId].sort().join(":"),
    ]);
    const [existing] = await query<{ id: string }>(
      `select c.id from conversations c
       where c.name is null
         and exists (select 1 from conversation_members m where m.conversation_id = c.id and m.user_id = $1)
         and exists (select 1 from conversation_members m where m.conversation_id = c.id and m.user_id = $2)
         and (select count(*) from conversation_members m where m.conversation_id = c.id) = 2
       limit 1`,
      [viewerId, userId],
      client,
    );
    let conversationId = existing?.id;
    if (!conversationId) {
      const [created] = await query<{ id: string }>(
        "insert into conversations default values returning id",
        [],
        client,
      );
      conversationId = created.id;
      await client.query(
        "insert into conversation_members (conversation_id, user_id) values ($1, $2), ($1, $3)",
        [conversationId, viewerId, userId],
      );
    }
    return getConversationView(viewerId, conversationId, client);
  });
}

// Messages from the other members newer than `since`, and who's typing. Your own
// messages aren't included: this browser already has the ones it sent.
// Timestamps are compared to the millisecond, the precision the views return.
export async function getConversationUpdates(
  viewerId: string,
  conversationId: string,
  since: string | null,
): Promise<ConversationUpdates> {
  await requireMember(viewerId, conversationId);
  const messages = await selectViews<MessageView>(
    `select message_view(msg, $1) as view from messages msg
     where msg.conversation_id = $2 and msg.sender_id <> $1
       and ($3::timestamptz is null or date_trunc('milliseconds', msg.created_at) > $3::timestamptz)
     order by msg.created_at
     limit $4`,
    [viewerId, conversationId, since, MESSAGE_LIMIT],
  );
  const typing = await query<{ user_id: string }>(
    `select user_id from conversation_members
     where conversation_id = $2 and user_id <> $1
       and typing_at > now() - make_interval(secs => $3)`,
    [viewerId, conversationId, TYPING_TTL_SECONDS],
  );
  return { messages, typingIds: typing.map((row) => row.user_id) };
}

export async function setTyping(
  viewerId: string,
  conversationId: string,
  typing: boolean,
): Promise<null> {
  const rows = await query(
    `update conversation_members set typing_at = ${typing ? "now()" : "null"}
     where conversation_id = $2 and user_id = $1 returning 1`,
    [viewerId, conversationId],
  );
  if (!rows.length) throw new DataError("not-found", NOT_FOUND.conversation);
  return null;
}

// The new message marks the conversation unread for every other member, and
// ends the sender's typing status.
export function sendMessage(
  viewerId: string,
  conversationId: string,
  { text, attachments }: NewMessage,
): Promise<MessageView> {
  return transaction(async (client) => {
    await markRead(viewerId, conversationId, client);
    const [{ id }] = await query<{ id: string }>(
      "insert into messages (conversation_id, sender_id, text, attachments) values ($1, $2, $3, $4) returning id",
      [conversationId, viewerId, text, JSON.stringify(attachments)],
      client,
    );
    await client.query(
      "update conversation_members set unread = true where conversation_id = $1 and user_id <> $2",
      [conversationId, viewerId],
    );
    await client.query(
      "update conversation_members set typing_at = null where conversation_id = $1 and user_id = $2",
      [conversationId, viewerId],
    );
    return selectView<MessageView>(
      "select message_view(msg, $1) as view from messages msg where msg.id = $2",
      [viewerId, id],
      NOT_FOUND.conversation,
      client,
    );
  });
}

export async function markConversationRead(
  viewerId: string,
  conversationId: string,
): Promise<UnreadCounts> {
  await markRead(viewerId, conversationId);
  return getUnreadCounts(viewerId);
}
