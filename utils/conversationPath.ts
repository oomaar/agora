import { MESSAGES_PATH } from "@/lib/messages/constants";

export function conversationPath(conversationId: string): string {
  return `${MESSAGES_PATH}/${conversationId}`;
}
