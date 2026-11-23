import { ChatAttachmentTile } from "@/components/messages/ChatAttachmentTile";
import { type ChatAttachmentTrayProps } from "@/types/messages";

// The files picked for the next message, in a row that scrolls on narrow screens.
export function ChatAttachmentTray({
  attachments,
  onRemove,
}: ChatAttachmentTrayProps) {
  return (
    <ul aria-label="Attachments" className="flex gap-2 overflow-x-auto">
      {attachments.map((attachment) => (
        <li key={attachment.id}>
          <ChatAttachmentTile
            attachment={attachment}
            onRemove={() => onRemove(attachment.id)}
          />
        </li>
      ))}
    </ul>
  );
}
