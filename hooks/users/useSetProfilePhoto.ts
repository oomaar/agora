"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { type UserView } from "@/types/domain";
import { type ProfilePhotoChange } from "@/types/media";

// Not optimistic: the photo is already showing as the upload's preview.
export function useSetProfilePhoto() {
  return useMutation<ProfilePhotoChange, UserView>({
    mutate: (source, { kind, url }) => source.setProfilePhoto(kind, url),
    onSuccess: (cache, user) =>
      cache.updateEntity<UserView>(user.id, (current) => ({
        ...current,
        avatarUrl: user.avatarUrl,
        coverUrl: user.coverUrl,
      })),
  });
}
