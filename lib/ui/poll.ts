export const POLL_OPTION_BUTTON =
  "flex h-9.5 w-full cursor-pointer items-center rounded-md border border-ag-accent-border px-3.5 text-left text-[14px] font-semibold text-ag-accent-text outline-none transition-colors hover:bg-ag-accent-soft focus-visible:shadow-ag-focus-ring disabled:cursor-default";

// A native <progress> drawn as the result bar behind each option.
export const POLL_RESULT_BAR =
  "absolute inset-0 size-full appearance-none bg-transparent [&::-moz-progress-bar]:rounded-md [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:rounded-md";

export const POLL_RESULT_FILL = {
  voted:
    "[&::-moz-progress-bar]:bg-ag-accent-soft [&::-webkit-progress-value]:bg-ag-accent-soft",
  other:
    "[&::-moz-progress-bar]:bg-ag-raised [&::-webkit-progress-value]:bg-ag-raised",
};
