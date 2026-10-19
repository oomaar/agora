"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { useToast } from "@/hooks/ui/useToast";
import { queryKeys } from "@/lib/data/queryKeys";
import { firstName } from "@/utils/firstName";
import { type UserView } from "@/types/domain";

// Optimistic: the button and both follower counts change at once and revert on failure.
export function useToggleFollow() {
  const toast = useToast();
  return useMutation<UserView, UserView>({
    mutate: (source, user) => source.setFollow(user.id, !user.isFollowing),
    onMutate: (cache, user) => {
      const delta = user.isFollowing ? -1 : 1;
      const apply = (sign: number) => {
        cache.updateEntity<UserView>(user.id, (current) => ({
          ...current,
          isFollowing: sign > 0 ? !user.isFollowing : user.isFollowing,
          followerCount: current.followerCount + delta * sign,
        }));
        cache.setData<UserView>(queryKeys.currentUser(), (self) => ({
          ...self,
          followingCount: self.followingCount + delta * sign,
        }));
      };
      apply(1);
      return () => apply(-1);
    },
    onSuccess: (cache, result) => {
      cache.updateEntity<UserView>(result.id, (current) => ({
        ...current,
        isFollowing: result.isFollowing,
        followerCount: result.followerCount,
      }));
      cache.invalidate((key) => key === queryKeys.feed("following"));
    },
    onError: (_error, user) =>
      toast.error(
        `Couldn't ${user.isFollowing ? "unfollow" : "follow"} ${firstName(user.name)}. It was reverted.`,
      ),
  });
}
