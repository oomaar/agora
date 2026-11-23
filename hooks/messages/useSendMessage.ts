"use client";

import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { useData } from "@/hooks/data/useData";
import { useMutation } from "@/hooks/data/useMutation";
import { queryKeys } from "@/lib/data/queryKeys";
import { createTempId } from "@/utils/createTempId";
import { toMessageAttachment } from "@/utils/toMessageAttachment";
import { withLastMessage } from "@/utils/withLastMessage";
import { type DataSource } from "@/types/dataSource";
import { type SendMessageVariables } from "@/types/query";
import {
  type ConversationThread,
  type ConversationView,
  type MessageAttachment,
  type MessageView,
  type OutgoingAttachment,
} from "@/types/domain";

// Optimistic: the message shows as Sending… straight away (attachments from their
// local previews, with upload progress), then Delivered or failed. Attachments
// upload first; a failed message stays in the thread with its files, so Retry
// sends it again without uploading the files that already made it.
export function useSendMessage(conversationId: string) {
  const { data: self } = useCurrentUser();
  const { cache } = useData();
  const key = queryKeys.conversation(conversationId);

  const patchMessage = (
    tempId: string,
    update: (message: MessageView) => MessageView,
  ) => cache.updateEntity<MessageView>(tempId, update);

  function upload(
    source: DataSource,
    tempId: string,
    outgoing: OutgoingAttachment[],
  ): Promise<MessageAttachment[]> {
    const progress = outgoing.map((attachment): number =>
      attachment.url ? 100 : 0,
    );
    const report = () =>
      patchMessage(tempId, (message) => ({
        ...message,
        progress: Math.round(
          progress.reduce((sum, percent) => sum + percent, 0) / progress.length,
        ),
      }));
    return Promise.all(
      outgoing.map(async (attachment, index) => {
        if (attachment.url)
          return toMessageAttachment(attachment, attachment.url);
        const { url } = await source.uploadMedia(attachment.file, "message", {
          onProgress: (percent) => {
            progress[index] = percent;
            report();
          },
        });
        patchMessage(tempId, (message) => ({
          ...message,
          outgoing: message.outgoing?.map((item) =>
            item.id === attachment.id ? { ...item, url } : item,
          ),
        }));
        return toMessageAttachment(attachment, url);
      }),
    );
  }

  const mutation = useMutation<SendMessageVariables, MessageView>({
    mutate: async (source, { tempId, text, outgoing }) =>
      source.sendMessage(conversationId, {
        text,
        attachments: await upload(source, tempId, outgoing),
      }),
    onMutate: (cache, { tempId, text, outgoing }) => {
      cache.setData<ConversationThread>(key, (thread) => ({
        ...thread,
        messages: thread.messages.some((message) => message.id === tempId)
          ? thread.messages.map((message) =>
              message.id === tempId
                ? { ...message, status: "sending" }
                : message,
            )
          : [
              ...thread.messages,
              {
                id: tempId,
                conversationId,
                senderId: self?.id ?? "",
                text,
                attachments: outgoing.map((attachment) =>
                  toMessageAttachment(attachment, attachment.previewUrl),
                ),
                createdAt: new Date().toISOString(),
                fromSelf: true,
                status: "sending",
                outgoing,
                progress: outgoing.length ? 0 : undefined,
              },
            ],
      }));
      return () =>
        patchMessage(tempId, (message) => ({
          ...message,
          status: "failed",
          progress: undefined,
        }));
    },
    onSuccess: (cache, message, { tempId, outgoing }) => {
      cache.setData<ConversationThread>(key, (thread) => ({
        ...thread,
        messages: thread.messages.some((item) => item.id === tempId)
          ? thread.messages.map((item) => (item.id === tempId ? message : item))
          : [...thread.messages, message],
      }));
      // The sent message shows the uploaded files now.
      outgoing.forEach((attachment) =>
        URL.revokeObjectURL(attachment.previewUrl),
      );
      cache.setData<ConversationView[]>(
        queryKeys.conversations(),
        (conversations) => withLastMessage(conversations, message, false),
      );
    },
  });

  return {
    status: mutation.status,
    error: mutation.error,
    send: (text: string, outgoing: OutgoingAttachment[]) =>
      mutation.run({ tempId: createTempId(), text, outgoing }),
    retry: (message: MessageView) =>
      mutation.run({
        tempId: message.id,
        text: message.text,
        outgoing: message.outgoing ?? [],
      }),
  };
}
