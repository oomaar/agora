"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { useToast } from "@/hooks/ui/useToast";
import { type VotePollVariables } from "@/types/query";
import { type PostView } from "@/types/domain";

function addVote(post: PostView, optionId: string, delta: number): PostView {
  if (!post.poll) return post;
  return {
    ...post,
    votedOptionId: delta > 0 ? optionId : null,
    poll: {
      options: post.poll.options.map((option) =>
        option.id === optionId
          ? { ...option, voteCount: option.voteCount + delta }
          : option,
      ),
    },
  };
}

// Optimistic: the results show at once and go back to the options if the server fails.
export function useVotePoll() {
  const toast = useToast();
  return useMutation<VotePollVariables, PostView>({
    mutate: (source, { post, optionId }) => source.votePoll(post.id, optionId),
    onMutate: (cache, { post, optionId }) => {
      cache.updateEntity<PostView>(post.id, (current) =>
        addVote(current, optionId, 1),
      );
      return () =>
        cache.updateEntity<PostView>(post.id, (current) =>
          addVote(current, optionId, -1),
        );
    },
    onSuccess: (cache, result) =>
      cache.updateEntity<PostView>(result.id, (current) => ({
        ...current,
        poll: result.poll,
        votedOptionId: result.votedOptionId,
      })),
    onError: () => toast.error("Couldn't save your vote. It was reverted."),
  });
}
