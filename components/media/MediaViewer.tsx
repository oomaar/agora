"use client";

import Image from "next/image";
import { IconButton } from "@/components/ui/IconButton";
import { useDialog } from "@/hooks/ui/useDialog";
import { type MediaViewerProps } from "@/types/post";

// A photo over a dark backdrop, as large as the screen allows and never cropped,
// with its real size and a link to the original file.
export function MediaViewer({ open, onClose, media }: MediaViewerProps) {
  const {
    ref,
    onCancel,
    onClose: onDialogClose,
    onClick,
  } = useDialog(open, onClose);
  const { src, label, width, height } = media;
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onCancel={onCancel}
      onClose={onDialogClose}
      onClick={onClick}
      className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-black/85"
    >
      {open && (
        <div
          // The wrapper fills the dialog: a click on its empty space closes.
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          className="flex size-full flex-col items-center justify-center gap-3 p-4 sm:p-8"
        >
          <div className="relative min-h-0 w-full flex-1">
            <Image
              src={src}
              alt={label}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <p className="flex items-center gap-3 font-mono text-[12.5px] text-white/75">
            {width && height && (
              <span>
                {width} × {height}
              </span>
            )}
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm underline outline-none hover:text-white focus-visible:shadow-ag-focus-ring"
            >
              Open original
            </a>
          </p>
          <IconButton
            icon="close"
            label="Close"
            variant="soft"
            onClick={onClose}
            className="absolute right-4 top-4"
          />
        </div>
      )}
    </dialog>
  );
}
