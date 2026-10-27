import { setProfilePhoto } from "@/services/database/users";
import { readJson, readOption, readPhotoUrl } from "@/lib/api/input";
import { PROFILE_PHOTO_KINDS } from "@/lib/api/constants";
import { withViewer } from "@/lib/api/withViewer";
import { type PhotoParams } from "@/types/api";

// PUT { url } sets the profile photo or cover to an uploaded file; DELETE removes it.
export const PUT = withViewer<PhotoParams>(
  async ({ request, params, viewerId }) => {
    const kind = readOption(params.kind, PROFILE_PHOTO_KINDS, "Photo");
    const url = readPhotoUrl(await readJson(request), kind, viewerId);
    return setProfilePhoto(viewerId, kind, url);
  },
);

export const DELETE = withViewer<PhotoParams>(({ params, viewerId }) =>
  setProfilePhoto(
    viewerId,
    readOption(params.kind, PROFILE_PHOTO_KINDS, "Photo"),
    null,
  ),
);
