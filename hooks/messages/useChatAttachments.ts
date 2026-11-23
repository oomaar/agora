"use client";

import { useEffect, useRef, useState } from "react";
import { MESSAGE_ERRORS } from "@/lib/api/constants";
import { MESSAGE_ATTACHMENTS_MAX } from "@/lib/data/constants";
import { MEDIA_TYPES } from "@/lib/media/constants";
import { checkUpload } from "@/utils/checkUpload";
import { createTempId } from "@/utils/createTempId";
import { readMediaSize } from "@/utils/readMediaSize";
import { type OutgoingAttachment } from "@/types/domain";

// The files picked for the next message (up to 4), each with a local preview.
// Nothing uploads until the message is sent. `take` hands the files and their
// previews to the message; whatever is still here on unmount is freed.
export function useChatAttachments() {
  const [attachments, setAttachments] = useState<OutgoingAttachment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const previews = useRef(new Set<string>());

  useEffect(() => {
    const owned = previews.current;
    return () => owned.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function measure({ id, kind, previewUrl }: OutgoingAttachment) {
    if (kind !== "image" && kind !== "video") return;
    void readMediaSize(previewUrl, kind).then((size) => {
      if (!size) return;
      setAttachments((list) =>
        list.map((item) => (item.id === id ? { ...item, ...size } : item)),
      );
    });
  }

  return {
    attachments,
    error,
    add: (files: File[]) => {
      const room = MESSAGE_ATTACHMENTS_MAX - attachments.length;
      let problem =
        files.length > room
          ? MESSAGE_ERRORS.tooManyAttachments(MESSAGE_ATTACHMENTS_MAX)
          : null;
      const added: OutgoingAttachment[] = [];
      for (const file of files.slice(0, Math.max(0, room))) {
        const rejected = checkUpload("message", file.type, file.size);
        if (rejected) {
          problem ??= rejected;
          continue;
        }
        const previewUrl = URL.createObjectURL(file);
        previews.current.add(previewUrl);
        added.push({
          id: createTempId(),
          file,
          kind: MEDIA_TYPES[file.type].kind,
          previewUrl,
          url: "",
          name: file.name,
          size: file.size,
        });
      }
      setError(problem);
      setAttachments([...attachments, ...added]);
      added.forEach(measure);
    },
    remove: (id: string) => {
      const attachment = attachments.find((item) => item.id === id);
      if (!attachment) return;
      URL.revokeObjectURL(attachment.previewUrl);
      previews.current.delete(attachment.previewUrl);
      setAttachments(attachments.filter((item) => item.id !== id));
      setError(null);
    },
    take: (): OutgoingAttachment[] => {
      previews.current.clear();
      setAttachments([]);
      setError(null);
      return attachments;
    },
    showError: setError,
    dismissError: () => setError(null),
  };
}
