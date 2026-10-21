import { votePoll } from "@/services/database/posts";
import { readJson, readString } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { type IdParams } from "@/types/api";

// Body: { optionId }. Repeating the same vote changes nothing.
export const PUT = withViewer<IdParams>(async ({ request, params, viewerId }) =>
  votePoll(
    viewerId,
    params.id,
    readString(await readJson(request), "optionId"),
  ),
);
