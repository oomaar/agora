import { setReaction } from "@/services/database/posts";
import { withViewer } from "@/lib/api/withViewer";
import { type IdParams } from "@/types/api";

// PUT adds the repost, DELETE removes it; repeating either changes nothing.
export const PUT = withViewer<IdParams>(({ params, viewerId }) =>
  setReaction(viewerId, params.id, "repost", true),
);

export const DELETE = withViewer<IdParams>(({ params, viewerId }) =>
  setReaction(viewerId, params.id, "repost", false),
);
