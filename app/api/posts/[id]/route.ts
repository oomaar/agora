import { getPost } from "@/services/database/posts";
import { withViewer } from "@/lib/api/withViewer";
import { type IdParams } from "@/types/api";

export const GET = withViewer<IdParams>(({ params, viewerId }) =>
  getPost(viewerId, params.id),
);
