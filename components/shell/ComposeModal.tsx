"use client";

import { useEffect, useRef } from "react";
import { AudiencePicker } from "@/components/compose/AudiencePicker";
import { CharacterCounter } from "@/components/compose/CharacterCounter";
import { ComposeError } from "@/components/compose/ComposeError";
import { MediaAttachment } from "@/components/compose/MediaAttachment";
import { PollEditor } from "@/components/compose/PollEditor";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { FilePickerButton } from "@/components/ui/FilePickerButton";
import { Modal } from "@/components/ui/Modal";
import { useComposerDraft } from "@/hooks/posts/useComposerDraft";
import { useCompose } from "@/hooks/shell/useCompose";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { POLL_MIN_OPTIONS, POST_MAX_LENGTH } from "@/lib/data/constants";
import { MEDIA_LABELS, POST_MEDIA_ACCEPT } from "@/lib/media/constants";
import { type PostMediaKind } from "@/types/post";

const MEDIA_KINDS: PostMediaKind[] = ["image", "video"];

// Stays mounted while closed; the draft lives in ComposerContext, so it survives
// closing and reopening.
export function ComposeModal() {
  const { isOpen, close } = useCompose();
  const { data: user } = useCurrentUser();
  const composer = useComposerDraft();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { posting, poll, media } = composer;

  // Runs after the dialog opens, so the cursor lands in the text box.
  useEffect(() => {
    if (isOpen) textareaRef.current?.focus();
  }, [isOpen]);

  const onClose = () => {
    if (posting) return;
    composer.clearError();
    close();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="New post"
      footer={
        <>
          {MEDIA_KINDS.map((kind) => (
            <FilePickerButton
              key={kind}
              accept={POST_MEDIA_ACCEPT[kind]}
              onPick={(file) => void media.start(file)}
              variant="secondary"
              size="sm"
              icon={kind}
              disabled={posting}
            >
              {MEDIA_LABELS[kind]}
            </FilePickerButton>
          ))}
          <Button
            variant="secondary"
            size="sm"
            icon="poll"
            aria-pressed={poll !== null}
            disabled={posting}
            onClick={() =>
              composer.setPoll(poll ? null : Array.from({ length: POLL_MIN_OPTIONS }, () => ""))
            }
          >
            Poll
          </Button>
          <span className="ml-auto" />
          <CharacterCounter length={composer.text.length} max={POST_MAX_LENGTH} />
          <Button
            pill
            loading={posting}
            disabled={!composer.text.trim() || media.status === "uploading"}
            onClick={async () => {
              if (await composer.submit()) close();
            }}
          >
            {posting ? "Posting…" : "Post"}
          </Button>
        </>
      }
    >
      <div className="flex gap-3 p-4.5">
        {user ? (
          <Avatar name={user.name} handle={user.handle} src={user.avatarUrl} />
        ) : (
          <Skeleton shape="circle" className="size-10 flex-none" />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <AudiencePicker value={composer.audience} onChange={composer.setAudience} disabled={posting} />
          <textarea
            ref={textareaRef}
            value={composer.text}
            onChange={(event) => composer.setText(event.target.value)}
            readOnly={posting}
            aria-label="Post text"
            placeholder="What's happening in the square?"
            className="min-h-30 w-full resize-none bg-transparent text-[18px] leading-normal text-ag-text outline-none placeholder:text-ag-text-placeholder"
          />
          <MediaAttachment media={media} disabled={posting} />
          {poll && <PollEditor options={poll} onChange={composer.setPoll} disabled={posting} />}
        </div>
      </div>
      {composer.error && <ComposeError message={composer.error} />}
    </Modal>
  );
}
