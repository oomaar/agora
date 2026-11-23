import { getConversation, nextId } from "@/services/simulated/database";
import {
  CHAT_REPLIES,
  REPLY_DELAY_MS,
  TYPING_MAX_MS,
  TYPING_MIN_MS,
  TYPING_MS_PER_CHARACTER,
} from "@/lib/simulation/constants";
import { type Message } from "@/types/domain";
import {
  type ChatPartners,
  type ChatReplyTopic,
  type Database,
  type PendingReply,
} from "@/types/simulation";

function replyTopic(message: Message): ChatReplyTopic {
  const kinds = message.attachments.map((attachment) => attachment.kind);
  if (kinds.includes("audio")) return "voice";
  if (kinds.includes("file")) return "file";
  return kinds.length ? "media" : "text";
}

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// After you send a message, someone else in the conversation types for a moment,
// then replies. Several messages in a row get one reply. A reply belongs to the
// database it started in, so resetting the simulation drops it.
export function createChatPartners(getDb: () => Database): ChatPartners {
  const pending = new Map<string, PendingReply>();

  return {
    typingIds: (conversationId) => {
      const reply = pending.get(conversationId);
      return reply?.typing && reply.db === getDb() ? [reply.userId] : [];
    },
    replyTo: (conversationId, message) => {
      const db = getDb();
      const conversation = getConversation(db, conversationId);
      const others = conversation.memberIds.filter((id) => id !== db.selfId);
      if (!others.length) return;
      const previous = pending.get(conversationId);
      if (previous) clearTimeout(previous.timer);
      const text = pick(CHAT_REPLIES[replyTopic(message)]);
      const typingMs = Math.min(
        TYPING_MAX_MS,
        Math.max(TYPING_MIN_MS, text.length * TYPING_MS_PER_CHARACTER),
      );
      const reply: PendingReply = {
        db,
        userId: previous?.db === db ? previous.userId : pick(others),
        typing: false,
        timer: setTimeout(() => {
          reply.typing = true;
          reply.timer = setTimeout(() => {
            pending.delete(conversationId);
            if (getDb() !== db) return;
            db.messages.push({
              id: nextId(db, "message"),
              conversationId,
              senderId: reply.userId,
              text,
              attachments: [],
              createdAt: new Date().toISOString(),
            });
            conversation.unread = true;
          }, typingMs);
        }, REPLY_DELAY_MS),
      };
      pending.set(conversationId, reply);
    },
  };
}
