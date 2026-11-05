// Grows a small control's hit area to at least 44 × 44 without changing how it looks:
// an invisible ::after centred on the control. The control becomes `relative`, so one
// that needs other positioning goes in a positioned wrapper instead.
export const TAP_TARGET =
  "relative after:absolute after:left-1/2 after:top-1/2 after:size-full after:min-h-11 after:min-w-11 after:-translate-x-1/2 after:-translate-y-1/2";
