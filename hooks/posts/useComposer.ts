"use client";

import { useState } from "react";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useSettings } from "@/hooks/settings/useSettings";
import { useToast } from "@/hooks/ui/useToast";
import { DEFAULT_SETTINGS } from "@/lib/data/constants";
import { COMPOSE_PUBLISH_ERROR } from "@/lib/posts/constants";
import { validateDraft } from "@/utils/validateDraft";
import { type Composer } from "@/types/compose";
import { type PostAudience } from "@/types/domain";

// Draft state for the compose modal. A failed publish keeps the draft and explains why.
// The audience follows the default in settings until it's changed for this post.
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
  const [invalid, setInvalid] = useState<string | null>(null);

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
    posting: create.status === "pending",
    error: invalid ?? failed,
    submit: async () => {
      const draft = { text, audience, media: null, poll };
      const problem = validateDraft(draft);
      setInvalid(problem);
      if (problem) return false;
      const post = await create.run(draft);
      if (!post) return false;
      setText("");
      setAudience(null);
      setPoll(null);
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
