import { type Metadata } from "next";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Messages" };

// The thread pane before a conversation is picked; phones show only the list here.
export default function MessagesPage() {
  return (
    <EmptyState
      icon="mail"
      title="Your messages"
      description="Pick a conversation, or start a new one with the + button."
      className="m-auto"
    />
  );
}
