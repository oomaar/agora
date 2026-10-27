"use client";

import { useMediaUpload } from "@/hooks/media/useMediaUpload";
import { useToast } from "@/hooks/ui/useToast";
import { useSetProfilePhoto } from "@/hooks/users/useSetProfilePhoto";
import { PROFILE_PHOTO_LABELS } from "@/lib/settings/constants";
import { type UserView } from "@/types/domain";
import { type ProfilePhotoKind, type UploadedMedia } from "@/types/media";
import { type ProfilePhoto } from "@/types/settings";

// Picking a file uploads it, then saves it as the photo straight away.
// Retry repeats whichever step failed.
export function useProfilePhoto(
  user: UserView,
  kind: ProfilePhotoKind,
): ProfilePhoto {
  const upload = useMediaUpload(kind);
  const save = useSetProfilePhoto();
  const toast = useToast();
  const savedUrl = kind === "avatar" ? user.avatarUrl : user.coverUrl;
  const label = PROFILE_PHOTO_LABELS[kind];

  async function saveUrl(url: string | null) {
    const saved = await save.run({ kind, url });
    if (!saved) return;
    upload.clear();
    toast.success(`${label} ${url ? "updated" : "removed"}`);
  }

  async function saveUpload(uploading: Promise<UploadedMedia | null>) {
    const media = await uploading;
    if (media) await saveUrl(media.url);
  }

  const uploadFailed = upload.status === "failed";
  return {
    src: upload.previewUrl ?? savedUrl,
    saved: savedUrl !== null,
    uploading: upload.status === "uploading",
    busy: upload.status === "uploading" || save.status === "pending",
    progress: upload.progress,
    error: upload.error ?? save.error?.message ?? null,
    canRetry: uploadFailed
      ? upload.previewUrl !== null
      : save.status === "error",
    pick: (file) => {
      save.reset();
      void saveUpload(upload.start(file));
    },
    retry: () => {
      if (uploadFailed) void saveUpload(upload.retry());
      else void saveUrl(upload.url);
    },
    remove: () => {
      upload.clear();
      void saveUrl(null);
    },
  };
}
