"use client";

import { Avatar } from "@/components/ui/Avatar";
import { FilePickerButton } from "@/components/ui/FilePickerButton";
import { Skeleton } from "@/components/ui/Skeleton";
import { useComposerDraft } from "@/hooks/posts/useComposerDraft";
import { useOpenCompose } from "@/hooks/shell/useOpenCompose";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { MEDIA_LABELS, POST_MEDIA_ACCEPT } from "@/lib/media/constants";
import { type PostMediaKind } from "@/types/post";

const MEDIA_KINDS: PostMediaKind[] = ["image", "video"];

// The prompt at the top of the feed; it opens the full compose modal. Photo and
// Video attach the file to the draft first, so it's uploading when the modal opens.
export function InlineComposer() {
  const openCompose = useOpenCompose();
  const { media } = useComposerDraft();
  const { data: user } = useCurrentUser();
  return (
    <div className="flex items-center gap-3 border-b border-ag-border-subtle px-5 py-4">
      {user ? (
        <Avatar name={user.name} handle={user.handle} src={user.avatarUrl} />
      ) : (
        <Skeleton shape="circle" className="size-10 flex-none" />
      )}
      <button
        type="button"
        onClick={openCompose}
        className="h-10 min-w-0 flex-1 cursor-text truncate rounded-md text-left text-[16px] text-ag-text-placeholder outline-none focus-visible:shadow-ag-focus-ring"
      >
        What&apos;s happening in the square?
      </button>
      {MEDIA_KINDS.map((kind) => (
        <FilePickerButton
          key={kind}
          accept={POST_MEDIA_ACCEPT[kind]}
          onPick={(file) => {
            void media.start(file);
            openCompose();
          }}
          variant="secondary"
          size="sm"
          icon={kind}
          aria-label={`Add a ${MEDIA_LABELS[kind].toLowerCase()}`}
          className="max-sm:px-2"
        >
          <span className="max-sm:hidden">{MEDIA_LABELS[kind]}</span>
        </FilePickerButton>
      ))}
      <button
        type="button"
        onClick={openCompose}
        className="flex h-8.5 flex-none cursor-pointer items-center rounded-full bg-ag-accent-soft px-4 text-[13.5px] font-semibold text-ag-accent-text outline-none transition-opacity hover:opacity-85 focus-visible:shadow-ag-focus-ring"
      >
        Post
      </button>
    </div>
  );
}
