import { byLatestMessage } from "@/utils/byLatestMessage";
import { type ConversationView, type MessageView } from "@/types/domain";

// The conversation list after a message arrives in one of them: its preview and
// unread state change, and it moves to the top.
export function withLastMessage(
  conversations: ConversationView[],
  message: MessageView,
  unread: boolean,
): ConversationView[] {
  const lastMessage = {
    id: message.id,
    conversationId: message.conversationId,
    senderId: message.senderId,
    text: message.text,
    attachments: message.attachments,
    createdAt: message.createdAt,
  };
  return conversations
    .map((conversation) =>
      conversation.id === message.conversationId
        ? { ...conversation, lastMessage, unread }
        : conversation,
    )
    .sort(byLatestMessage);
}
