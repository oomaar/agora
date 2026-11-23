import { DataError } from "@/services/dataError";
import { MESSAGE_ERRORS } from "@/lib/api/constants";
import {
  MESSAGE_ATTACHMENTS_MAX,
  MESSAGE_MAX_LENGTH,
} from "@/lib/data/constants";

// A message needs text, attachments or both; returns the trimmed text.
// Used by the API and the simulated server.
export function requireMessageText(
  text: string,
  attachmentCount: number,
): string {
  const trimmed = text.trim();
  if (attachmentCount > MESSAGE_ATTACHMENTS_MAX) {
    throw new DataError(
      "validation",
      MESSAGE_ERRORS.tooManyAttachments(MESSAGE_ATTACHMENTS_MAX),
    );
  }
  if (!trimmed && !attachmentCount) {
    throw new DataError("validation", MESSAGE_ERRORS.empty);
  }
  if (trimmed.length > MESSAGE_MAX_LENGTH) {
    throw new DataError(
      "validation",
      `Your message can be up to ${MESSAGE_MAX_LENGTH} characters.`,
    );
  }
  return trimmed;
}
