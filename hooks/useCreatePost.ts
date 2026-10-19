"use client";

import { useMutation } from "@/hooks/useMutation";
import { queryKeys } from "@/lib/data/queryKeys";
import { type NewPost } from "@/types/dataSource";
import { type PostView } from "@/types/domain";

// Not optimistic: the composer shows Posting… and keeps the draft if publishing fails.
export function useCreatePost() {
  return useMutation<NewPost, PostView>({
    mutate: (source, post) => source.createPost(post),
    onSuccess: (cache, post) => {
      const prepend = (posts: PostView[]) => [post, ...posts];
      cache.setData(queryKeys.feed("for-you"), prepend);
      cache.setData(queryKeys.feed("following"), prepend);
      cache.setData(queryKeys.userPosts(post.author.handle, "posts"), prepend);
      if (post.media)
        cache.setData(
          queryKeys.userPosts(post.author.handle, "media"),
          prepend,
        );
    },
  });
}
