import { getFeed } from "@/services/database/posts";
import { readParam } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";
import { FEED_TABS } from "@/lib/api/constants";

export const GET = withViewer(({ request, viewerId }) =>
  getFeed(viewerId, readParam(request, "tab", FEED_TABS)),
);
