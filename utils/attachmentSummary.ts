import { ATTACHMENT_SUMMARY_PLURALS } from "@/lib/messages/constants";
import { MEDIA_LABELS } from "@/lib/media/constants";
import { formatDuration } from "@/utils/formatDuration";
import { type MessageAttachment } from "@/types/domain";

// Stands in for the text of a message that's only attachments: "Photo",
// "Voice note · 0:12", "Report.pdf", "3 photos", "2 attachments".
export function attachmentSummary(attachments: MessageAttachment[]): string {
  const [first] = attachments;
  if (!first) return "";
  if (attachments.length === 1) {
    if (first.kind === "file") return first.name;
    if (first.kind === "audio" && first.durationMs) {
      return `${MEDIA_LABELS.audio} · ${formatDuration(first.durationMs)}`;
    }
    return MEDIA_LABELS[first.kind];
  }
  const sameKind = attachments.every(
    (attachment) => attachment.kind === first.kind,
  );
  return `${attachments.length} ${sameKind ? ATTACHMENT_SUMMARY_PLURALS[first.kind] : "attachments"}`;
}
