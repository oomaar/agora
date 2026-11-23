import { MessageFile } from "@/components/messages/MessageFile";
import { MessageMediaGrid } from "@/components/messages/MessageMediaGrid";
import { VoiceNotePlayer } from "@/components/messages/VoiceNotePlayer";
import { type MessageAttachmentsProps } from "@/types/messages";

// Photos and video in a grid, then voice notes, then documents.
export function MessageAttachments({
  attachments,
  fromSelf,
}: MessageAttachmentsProps) {
  const media = attachments.filter(
    (attachment) => attachment.kind === "image" || attachment.kind === "video",
  );
  const voiceNotes = attachments.filter(
    (attachment) => attachment.kind === "audio",
  );
  const files = attachments.filter((attachment) => attachment.kind === "file");
  return (
    <>
      {media.length > 0 && <MessageMediaGrid media={media} />}
      {voiceNotes.map((attachment, index) => (
        <VoiceNotePlayer
          key={`${index}:${attachment.url}`}
          attachment={attachment}
          fromSelf={fromSelf}
        />
      ))}
      {files.map((attachment, index) => (
        <MessageFile
          key={`${index}:${attachment.url}`}
          attachment={attachment}
          fromSelf={fromSelf}
        />
      ))}
    </>
  );
}
