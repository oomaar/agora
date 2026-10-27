"use client";

import { useState } from "react";
import { useMediaUpload } from "@/hooks/media/useMediaUpload";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useSettings } from "@/hooks/settings/useSettings";
import { useToast } from "@/hooks/ui/useToast";
import { DEFAULT_SETTINGS } from "@/lib/data/constants";
import { MEDIA_LABELS, UPLOAD_ERRORS } from "@/lib/media/constants";
import { COMPOSE_PUBLISH_ERROR } from "@/lib/posts/constants";
import { validateDraft } from "@/utils/validateDraft";
import { type Composer } from "@/types/compose";
import { type PostAudience } from "@/types/domain";
import { type MediaUpload } from "@/types/media";
import { type PostMedia } from "@/types/post";

// Draft state for the compose modal. A failed publish keeps the draft and explains why.
// The audience follows the default in settings until it's changed for this post.
// The photo or video uploads as soon as it's picked; posting waits for it.
export function useComposer(): Composer {
  const create = useCreatePost();
  const settings = useSettings();
  const toast = useToast();
  const [text, setText] = useState("");
  const [chosenAudience, setAudience] = useState<PostAudience | null>(null);
  const audience =
    chosenAudience ??
    settings.data?.defaultAudience ??
    DEFAULT_SETTINGS.defaultAudience;
  const [poll, setPoll] = useState<string[] | null>(null);
  const upload = useMediaUpload("post");
  const [invalid, setInvalid] = useState<string | null>(null);
  // Changing the attachment clears a "wait for the upload" message.
  const media: MediaUpload = {
    ...upload,
    start: (file) => {
      setInvalid(null);
      return upload.start(file);
    },
    retry: () => {
      setInvalid(null);
      return upload.retry();
    },
    clear: () => {
      setInvalid(null);
      upload.clear();
    },
  };

  const failed =
    create.status === "error" && create.error
      ? create.error.code === "network"
        ? COMPOSE_PUBLISH_ERROR
        : create.error.message
      : null;

  return {
    text,
    setText,
    audience,
    setAudience,
    poll,
    setPoll,
    media,
    posting: create.status === "pending",
    error: invalid ?? failed,
    submit: async () => {
      const attached: PostMedia | null =
        media.status === "uploaded" && media.kind && media.url
          ? {
              kind: media.kind,
              label: MEDIA_LABELS[media.kind],
              src: media.url,
              ...media.size,
            }
          : null;
      const draft = { text, audience, media: attached, poll };
      const problem =
        media.status === "uploading"
          ? UPLOAD_ERRORS.pending
          : media.status === "failed" && media.previewUrl
            ? UPLOAD_ERRORS.retry
            : validateDraft(draft);
      setInvalid(problem);
      if (problem) return false;
      const post = await create.run(draft);
      if (!post) return false;
      setText("");
      setAudience(null);
      setPoll(null);
      media.clear();
      create.reset();
      toast.success("Post published");
      return true;
    },
    clearError: () => {
      setInvalid(null);
      create.reset();
    },
  };
}
