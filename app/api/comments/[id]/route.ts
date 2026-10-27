import { deleteComment, updateComment } from "@/services/database/comments";
import { readJson, readString } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { COMMENT_MAX_LENGTH } from "@/lib/data/constants";
import { requireText } from "@/utils/requireText";
import { type IdParams } from "@/types/api";

export const PATCH = withViewer<IdParams>(
  async ({ request, params, viewerId }) => {
    const text = readString(await readJson(request), "text");
    return updateComment(
      viewerId,
      params.id,
      requireText(text, COMMENT_MAX_LENGTH, "Your comment"),
    );
  },
);

export const DELETE = withViewer<IdParams>(({ params, viewerId }) =>
  deleteComment(viewerId, params.id),
);
