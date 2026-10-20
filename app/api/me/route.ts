import { getUserById, updateProfile } from "@/services/database/users";
import { readJson, readProfileUpdate } from "@/lib/api/input";
import { withViewer } from "@/lib/api/withViewer";

export const GET = withViewer(({ viewerId }) =>
  getUserById(viewerId, viewerId),
);

export const PATCH = withViewer(async ({ request, viewerId }) =>
  updateProfile(viewerId, readProfileUpdate(await readJson(request))),
);
