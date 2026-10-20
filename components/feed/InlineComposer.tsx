"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { useOpenCompose } from "@/hooks/shell/useOpenCompose";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";

// The prompt at the top of the feed; it opens the full compose modal.
export function InlineComposer() {
  const openCompose = useOpenCompose();
  const { data: user } = useCurrentUser();
  return (
    <button
      type="button"
      onClick={openCompose}
      className="flex w-full cursor-text items-center gap-3 border-b border-ag-border-subtle px-5 py-4 text-left outline-none transition-colors hover:bg-ag-hover focus-visible:shadow-ag-focus-ring"
    >
      {user ? (
        <Avatar name={user.name} handle={user.handle} />
      ) : (
        <Skeleton shape="circle" className="size-10 flex-none" />
      )}
      <span className="flex-1 text-[16px] text-ag-text-placeholder">
        What&apos;s happening in the square?
      </span>
      <span
        aria-hidden="true"
        className="flex h-8.5 items-center rounded-full bg-ag-accent-soft px-4 text-[13.5px] font-semibold text-ag-accent-text"
      >
        Post
      </span>
    </button>
  );
}
