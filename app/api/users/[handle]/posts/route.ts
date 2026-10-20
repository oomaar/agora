import { getUserPosts } from "@/services/database/posts";
import { readParam } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { PROFILE_TABS } from "@/lib/api/constants";
import { type HandleParams } from "@/types/api";

export const GET = withViewer<HandleParams>(({ request, params, viewerId }) =>
  getUserPosts(viewerId, params.handle, readParam(request, "tab", PROFILE_TABS)),
);
