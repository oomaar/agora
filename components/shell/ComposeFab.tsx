"use client";

import { Icon } from "@/components/ui/Icon";
import { useOpenCompose } from "@/hooks/shell/useOpenCompose";

// Phones only: New post floats above the bottom tab bar and opens compose full screen.
export function ComposeFab() {
  const openCompose = useOpenCompose();
  return (
    <button
      type="button"
      onClick={openCompose}
      aria-label="New post"
      className="fixed bottom-[calc(--spacing(25)+env(safe-area-inset-bottom))] right-4.5 z-30 grid size-14 cursor-pointer place-items-center rounded-full bg-ag-accent text-ag-on-accent shadow-ag-md outline-none transition-[background-color,scale] hover:bg-ag-accent-hover focus-visible:shadow-ag-focus-ring active:scale-95 sm:hidden"
    >
      <Icon name="plus" size={26} />
    </button>
  );
}
