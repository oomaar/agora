import { createPost } from "@/services/database/posts";
import { readJson, readNewPost } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";

export const POST = withViewer(async ({ request, viewerId }) =>
  createPost(viewerId, readNewPost(await readJson(request))),
);
