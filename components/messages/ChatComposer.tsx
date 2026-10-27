"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MESSAGE_MAX_LENGTH } from "@/lib/data/constants";
import { type ChatComposerProps } from "@/types/messages";

// Enter sends. The message shows in the thread straight away as Sending…, so the field clears.
export function ChatComposer({ onSend }: ChatComposerProps) {
  const [draft, setDraft] = useState("");
  const text = draft.trim();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!text) return;
        onSend(text);
        setDraft("");
      }}
      className="flex flex-none gap-2.5 border-t border-ag-border-subtle px-5 py-3.5"
    >
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        maxLength={MESSAGE_MAX_LENGTH}
        placeholder="Write a message…"
        aria-label="Write a message"
        autoComplete="off"
        pill
        wrapperClassName="min-w-0 flex-1"
      />
      <Button type="submit" pill disabled={!text}>
        Send
      </Button>
    </form>
  );
}
