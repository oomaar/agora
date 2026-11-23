"use client";

import { useRef, useState } from "react";
import { ChatAttachmentTray } from "@/components/messages/ChatAttachmentTray";
import { ChatNotice } from "@/components/messages/ChatNotice";
import { VoiceRecorderBar } from "@/components/messages/VoiceRecorderBar";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { useChatAttachments } from "@/hooks/messages/useChatAttachments";
import { useTypingSignal } from "@/hooks/messages/useTypingSignal";
import { useVoiceRecorder } from "@/hooks/messages/useVoiceRecorder";
import {
  MESSAGE_ATTACHMENTS_MAX,
  MESSAGE_MAX_LENGTH,
} from "@/lib/data/constants";
import { MESSAGE_ATTACHMENT_ACCEPT } from "@/lib/media/constants";
import { type ChatComposerProps } from "@/types/messages";

// Text, up to 4 photos, videos or documents, or a voice note. Enter sends; the
// message shows in the thread straight away as Sending…, so everything clears.
// With nothing to send, the mic takes Send's place.
export function ChatComposer({ conversationId, onSend }: ChatComposerProps) {
  const [draft, setDraft] = useState("");
  const pickerRef = useRef<HTMLInputElement>(null);
  const files = useChatAttachments();
  const typing = useTypingSignal(conversationId);
  const recorder = useVoiceRecorder(() => void sendVoiceNote());
  const text = draft.trim();
  const canSend = Boolean(text || files.attachments.length);
  const error = files.error ?? recorder.error;

  async function sendVoiceNote() {
    const voiceNote = await recorder.stop();
    if (voiceNote) onSend("", [voiceNote]);
  }

  return (
    <div className="flex flex-none flex-col gap-2.5 border-t border-ag-border-subtle px-3 py-3 sm:px-5 sm:py-3.5">
      {files.attachments.length > 0 && (
        <ChatAttachmentTray
          attachments={files.attachments}
          onRemove={files.remove}
        />
      )}
      {error && (
        <ChatNotice
          message={error}
          onDismiss={() => {
            files.dismissError();
            recorder.dismissError();
          }}
        />
      )}
      {recorder.status === "idle" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSend) return;
            onSend(text, files.take());
            typing.onSent();
            setDraft("");
          }}
          className="flex items-center gap-1.5 sm:gap-2"
        >
          <IconButton
            icon="attach"
            label="Attach photos, videos or files"
            onClick={() => pickerRef.current?.click()}
            disabled={files.attachments.length >= MESSAGE_ATTACHMENTS_MAX}
          />
          <input
            ref={pickerRef}
            type="file"
            multiple
            accept={MESSAGE_ATTACHMENT_ACCEPT}
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
            onChange={(event) => {
              const picked = Array.from(event.target.files ?? []);
              // Cleared so picking the same file again still fires a change.
              event.target.value = "";
              if (picked.length) files.add(picked);
            }}
          />
          <Input
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              typing.onDraftChange(event.target.value);
            }}
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder="Write a message…"
            aria-label="Write a message"
            autoComplete="off"
            pill
            wrapperClassName="min-w-0 flex-1"
          />
          {recorder.supported && !canSend ? (
            <IconButton
              icon="mic"
              label="Record a voice note"
              variant="outline"
              size="lg"
              onClick={recorder.start}
            />
          ) : (
            <Button type="submit" pill disabled={!canSend}>
              Send
            </Button>
          )}
        </form>
      ) : (
        <VoiceRecorderBar
          elapsedMs={recorder.elapsedMs}
          levels={recorder.levels}
          starting={recorder.status === "starting"}
          onCancel={recorder.cancel}
          onSend={() => void sendVoiceNote()}
        />
      )}
    </div>
  );
}
