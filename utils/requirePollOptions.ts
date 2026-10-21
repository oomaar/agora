import { DataError } from "@/services/dataError";
import { requireText } from "@/utils/requireText";
import {
  POLL_MAX_OPTIONS,
  POLL_MIN_OPTIONS,
  POLL_OPTION_MAX_LENGTH,
} from "@/lib/data/constants";

// Trims and checks poll options before saving; used by the API and the simulated server.
export function requirePollOptions(options: string[]): string[] {
  if (options.length < POLL_MIN_OPTIONS || options.length > POLL_MAX_OPTIONS) {
    throw new DataError(
      "validation",
      `A poll needs ${POLL_MIN_OPTIONS} to ${POLL_MAX_OPTIONS} options.`,
    );
  }
  const texts = options.map((option, index) =>
    requireText(option, POLL_OPTION_MAX_LENGTH, `Option ${index + 1}`),
  );
  const unique = new Set(texts.map((text) => text.toLowerCase()));
  if (unique.size !== texts.length) {
    throw new DataError(
      "validation",
      "Each poll option needs to be different.",
    );
  }
  return texts;
}
