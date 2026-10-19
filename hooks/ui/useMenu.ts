"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useClickOutside } from "@/hooks/ui/useClickOutside";
import { getNextIndex } from "@/utils/getNextIndex";

export function useMenu(itemCount: number) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  const closeFromOutside = useCallback(() => close(false), [close]);
  useClickOutside(containerRef, closeFromOutside, open);

  useEffect(() => {
    if (open) itemRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  function openAt(index: number) {
    setActiveIndex(index);
    setOpen(true);
  }

  function onTriggerClick() {
    if (open) close(false);
    else openAt(0);
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openAt(0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openAt(itemCount - 1);
    }
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key === "Tab") {
      close(false);
      return;
    }
    const next = getNextIndex(event.key, activeIndex, itemCount);
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
  }

  function setItemRef(index: number) {
    return (element: HTMLButtonElement | null) => {
      itemRefs.current[index] = element;
    };
  }

  return {
    open,
    close,
    containerRef,
    triggerRef,
    setItemRef,
    onTriggerClick,
    onTriggerKeyDown,
    onMenuKeyDown,
  };
}
