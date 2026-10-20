"use client";

import { useState } from "react";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useToast } from "@/hooks/ui/useToast";
import { COMPOSE_PUBLISH_ERROR } from "@/lib/posts/constants";
import { validateDraft } from "@/utils/validateDraft";
import { type Composer } from "@/types/compose";
import { type PostAudience } from "@/types/domain";

// Draft state for the compose modal. A failed publish keeps the draft and explains why.
export function useComposer(): Composer {
  const create = useCreatePost();
  const toast = useToast();
  const [text, setText] = useState("");
  const [audience, setAudience] = useState<PostAudience>("everyone");
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
      setAudience("everyone");
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
