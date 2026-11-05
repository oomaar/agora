import { type ModalVariant } from "@/types/modal";

// The open attribute drives the motion: fade in on open, fade out on close.
// transition-discrete keeps the dialog shown, and in the top layer, until it has
// faded out. Reduced motion keeps the fade but drops the movement.
export const DIALOG_FADE =
  "opacity-0 transition-[opacity,translate,scale,display,overlay] transition-discrete duration-200 ease-out open:opacity-100 starting:open:opacity-0 backdrop:opacity-0 backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-200 open:backdrop:opacity-100 starting:open:backdrop:opacity-0";

export const MODAL_VARIANTS: Record<ModalVariant, string> = {
  modal:
    "mx-auto mb-auto mt-20 w-145 max-w-[calc(100%-32px)] rounded-2xl elev-2 motion-safe:scale-97 motion-safe:open:scale-100 motion-safe:starting:open:scale-97",
  // Full width on phones; a narrower card at the bottom on wider screens.
  sheet:
    "mx-0 mb-0 mt-auto w-full max-w-none rounded-t-[22px] border border-b-0 border-ag-border bg-ag-surface shadow-ag-xl sm:mx-auto sm:max-w-120 motion-safe:translate-y-full motion-safe:open:translate-y-0 motion-safe:starting:open:translate-y-full",
};

// A modal that fills the screen below `sm` and slides up like a sheet.
export const MODAL_FULL_SCREEN_ON_PHONE =
  "max-sm:m-0 max-sm:h-dvh max-sm:max-h-none max-sm:w-full max-sm:max-w-none max-sm:rounded-none max-sm:border-0 max-sm:motion-safe:translate-y-full max-sm:motion-safe:open:translate-y-0 max-sm:motion-safe:starting:open:translate-y-full";
