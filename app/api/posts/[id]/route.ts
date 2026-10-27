import { deletePost, getPost, updatePost } from "@/services/database/posts";
import { readJson, readString } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { POST_MAX_LENGTH } from "@/lib/data/constants";
import { requireText } from "@/utils/requireText";
import { type IdParams } from "@/types/api";

export const GET = withViewer<IdParams>(({ params, viewerId }) =>
  getPost(viewerId, params.id),
);

// The author edits the text; media, poll and audience stay as posted.
export const PATCH = withViewer<IdParams>(
  async ({ request, params, viewerId }) => {
    const text = readString(await readJson(request), "text");
    return updatePost(
      viewerId,
      params.id,
      requireText(text, POST_MAX_LENGTH, "Your post"),
    );
  },
);

export const DELETE = withViewer<IdParams>(({ params, viewerId }) =>
  deletePost(viewerId, params.id),
);
