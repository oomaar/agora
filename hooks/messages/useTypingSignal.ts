"use client";

import { useEffect, useRef } from "react";
import { useData } from "@/hooks/data/useData";
import { TYPING_PING_MS } from "@/lib/messages/constants";

// Tells the other members you're typing: once every few seconds while the draft
// has text, and once more when it's cleared or you leave. Sending a message ends
// it on the server; a "typing" still in flight then could land after the message
// and start it again, so "stopped" follows it. Failures don't matter.
export function useTypingSignal(conversationId: string) {
  const { source } = useData();
  const lastSentAt = useRef(0);
  const inFlight = useRef<Promise<unknown> | null>(null);

  useEffect(() => {
    const sent = lastSentAt;
    return () => {
      if (sent.current)
        void source.setTyping(conversationId, false).catch(() => {});
      sent.current = 0;
    };
  }, [source, conversationId]);

  const signal = (typing: boolean) => {
    const request = source.setTyping(conversationId, typing).catch(() => {});
    if (!typing) return;
    inFlight.current = request;
    void request.then(() => {
      if (inFlight.current === request) inFlight.current = null;
    });
  };

  return {
    onDraftChange: (text: string) => {
      const now = Date.now();
      if (text.trim()) {
        if (now - lastSentAt.current < TYPING_PING_MS) return;
        lastSentAt.current = now;
        signal(true);
      } else if (lastSentAt.current) {
        lastSentAt.current = 0;
        signal(false);
      }
    },
    onSent: () => {
      lastSentAt.current = 0;
      void inFlight.current?.then(() => signal(false));
    },
  };
}
