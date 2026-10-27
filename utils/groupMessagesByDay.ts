import { formatDayLabel } from "@/utils/formatDayLabel";
import { type MessageView } from "@/types/domain";
import { type MessageDay } from "@/types/messages";

// Splits messages (oldest first) into runs on the same local day.
export function groupMessagesByDay(messages: MessageView[]): MessageDay[] {
  const days: MessageDay[] = [];
  for (const message of messages) {
    const key = new Date(message.createdAt).toDateString();
    const day = days.at(-1);
    if (day?.key === key) day.messages.push(message);
    else
      days.push({
        key,
        label: formatDayLabel(message.createdAt),
        messages: [message],
      });
  }
  return days;
}
