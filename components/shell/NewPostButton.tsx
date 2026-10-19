"use client";

import { Icon } from "@/components/ui/Icon";
import { useOpenCompose } from "@/hooks/shell/useOpenCompose";

export function NewPostButton() {
  const openCompose = useOpenCompose();
  return (
    <button
      type="button"
      onClick={openCompose}
      className="mt-3.5 grid size-11.5 flex-none cursor-pointer place-items-center self-center rounded-full bg-ag-accent text-[15px] font-semibold text-ag-on-accent outline-none transition-colors hover:bg-ag-accent-hover focus-visible:shadow-ag-focus-ring nav:w-full nav:rounded-lg"
    >
      <Icon name="plus" size={22} className="nav:hidden" />
      <span className="sr-only nav:not-sr-only">New post</span>
    </button>
  );
}
