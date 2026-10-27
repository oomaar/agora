"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAddComment } from "@/hooks/posts/useAddComment";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { REPLY_HASH } from "@/lib/posts/constants";
import { COMMENT_MAX_LENGTH } from "@/lib/data/constants";
import { type ReplyBoxProps } from "@/types/postDetail";

// The comment shows in the list straight away as Sending…, so the field clears on submit.
export function ReplyBox({ postId, inputRef }: ReplyBoxProps) {
  const { data: user } = useCurrentUser();
  const comment = useAddComment(postId);
  const [draft, setDraft] = useState("");
  const text = draft.trim();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!text) return;
        void comment.add(text);
        setDraft("");
      }}
      className="flex items-start gap-3 border-b border-ag-border-subtle px-5 py-4"
    >
      {user ? (
        <Avatar
          name={user.name}
          handle={user.handle}
          src={user.avatarUrl}
          size="sm"
        />
      ) : (
        <Skeleton shape="circle" className="size-9 flex-none" />
      )}
      <Input
        ref={inputRef}
        id={REPLY_HASH}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        maxLength={COMMENT_MAX_LENGTH}
        placeholder="Write a comment…"
        aria-label="Write a comment"
        autoComplete="off"
        fieldSize="sm"
        wrapperClassName="min-w-0 flex-1"
      />
      <Button type="submit" size="sm" disabled={!text} className="h-9.5">
        Reply
      </Button>
    </form>
  );
}
