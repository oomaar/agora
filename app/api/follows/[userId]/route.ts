import { setFollow } from "@/services/database/users";
import { withViewer } from "@/lib/api/withViewer";
import { type UserIdParams } from "@/types/api";

// PUT follows, DELETE unfollows; repeating either changes nothing.
export const PUT = withViewer<UserIdParams>(({ params, viewerId }) =>
  setFollow(viewerId, params.userId, true),
);

export const DELETE = withViewer<UserIdParams>(({ params, viewerId }) =>
  setFollow(viewerId, params.userId, false),
);
