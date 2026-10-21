"use client";

import { useRouter } from "next/navigation";
import { IconButton } from "@/components/ui/IconButton";
import { type BackButtonProps } from "@/types/shell";

export function BackButton({ fallbackHref }: BackButtonProps) {
  const router = useRouter();
  return (
    <IconButton
      icon="arrowLeft"
      label="Back"
      variant="outline"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push(fallbackHref);
      }}
    />
  );
}
