import { toDataError } from "@/services/dataError";
import { requirePollOptions } from "@/utils/requirePollOptions";
import { requireText } from "@/utils/requireText";
import { POST_MAX_LENGTH } from "@/lib/data/constants";
import { type NewPost } from "@/types/dataSource";

// The server's own checks, run before sending; returns the first problem or null.
export function validateDraft({ text, poll }: NewPost): string | null {
  try {
    requireText(text, POST_MAX_LENGTH, "Your post");
    if (poll) requirePollOptions(poll);
    return null;
  } catch (error) {
    return toDataError(error).message;
  }
}
