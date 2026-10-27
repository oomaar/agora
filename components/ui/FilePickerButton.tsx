"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { type FilePickerButtonProps } from "@/types/button";

// A button that opens the file picker; the input stays hidden behind it.
export function FilePickerButton({
  accept,
  onPick,
  ...props
}: FilePickerButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button {...props} onClick={() => inputRef.current?.click()} />
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          // Cleared so picking the same file again still fires a change.
          event.target.value = "";
          if (file) onPick(file);
        }}
      />
    </>
  );
}
