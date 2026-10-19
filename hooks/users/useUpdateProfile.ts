"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { type ProfileUpdate } from "@/types/dataSource";
import { type UserView } from "@/types/domain";

// Not optimistic: the form waits for the server, which validates the handle.
export function useUpdateProfile() {
  return useMutation<ProfileUpdate, UserView>({
    mutate: (source, update) => source.updateProfile(update),
    onSuccess: (cache, user) =>
      cache.updateEntity<UserView>(user.id, (current) => ({
        ...current,
        name: user.name,
        handle: user.handle,
        bio: user.bio,
      })),
  });
}
