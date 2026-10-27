"use client";

import { useMutation } from "@/hooks/data/useMutation";
import { useToast } from "@/hooks/ui/useToast";
import { queryKeys } from "@/lib/data/queryKeys";
import { type ConversationView, type UserView } from "@/types/domain";

// Not optimistic: the conversation needs its id from the server before it can open.
export function useStartConversation() {
  const toast = useToast();
  return useMutation<UserView, ConversationView>({
    mutate: (source, person) => source.startConversation(person.id),
    onSuccess: (cache, conversation) =>
      cache.setData<ConversationView[]>(
        queryKeys.conversations(),
        (conversations) =>
          conversations.some((item) => item.id === conversation.id)
            ? conversations
            : [conversation, ...conversations],
      ),
    onError: (error) => toast.error(error.message),
  });
}
