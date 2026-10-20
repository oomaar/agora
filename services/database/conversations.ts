import "server-only";
import { DataError } from "@/services/dataError";
import { getUnreadCounts } from "@/services/database/unread";
import { query, selectView, selectViews, transaction } from "@/lib/db/query";
import { MESSAGE_LIMIT, NOT_FOUND } from "@/lib/api/constants";
import { type Queryable } from "@/types/db";
import {
  type ConversationThread,
  type ConversationView,
  type MessageView,
} from "@/types/domain";
import { type UnreadCounts } from "@/types/dataSource";

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

// Most recent conversation first.
export function getConversations(
  viewerId: string,
): Promise<ConversationView[]> {
  return selectViews(
    `select conversation_view(c, $1) as view from conversations c
     join conversation_members m on m.conversation_id = c.id and m.user_id = $1
     order by (
       select max(msg.created_at) from messages msg where msg.conversation_id = c.id
     ) desc nulls last`,
    [viewerId],
  );
}

// The conversation with its latest messages, oldest first.
export async function getConversation(
  viewerId: string,
  conversationId: string,
): Promise<ConversationThread> {
  const conversation = await selectView<ConversationView>(
    `select conversation_view(c, $1) as view from conversations c
     join conversation_members m on m.conversation_id = c.id and m.user_id = $1
     where c.id = $2`,
    [viewerId, conversationId],
    NOT_FOUND.conversation,
  );
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

// The new message marks the conversation unread for every other member.
export function sendMessage(
  viewerId: string,
  conversationId: string,
  text: string,
): Promise<MessageView> {
  return transaction(async (client) => {
    await markRead(viewerId, conversationId, client);
    const [{ id }] = await query<{ id: string }>(
      "insert into messages (conversation_id, sender_id, text) values ($1, $2, $3) returning id",
      [conversationId, viewerId, text],
      client,
    );
    await client.query(
      "update conversation_members set unread = true where conversation_id = $1 and user_id <> $2",
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
