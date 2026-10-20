import { addComment, getComments } from "@/services/database/comments";
import { readJson, readString } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { COMMENT_MAX_LENGTH } from "@/lib/data/constants";
import { requireText } from "@/utils/requireText";
import { type IdParams } from "@/types/api";

export const GET = withViewer<IdParams>(({ params, viewerId }) =>
  getComments(viewerId, params.id),
);

export const POST = withViewer<IdParams>(async ({ request, params, viewerId }) => {
  const text = readString(await readJson(request), "text");
  return addComment(
    viewerId,
    params.id,
    requireText(text, COMMENT_MAX_LENGTH, "Your comment"),
  );
});
