import { MessagesLayout } from "@/components/messages/MessagesLayout";

// The conversation list stays mounted while moving between conversations.
export default function MessagesRouteLayout({
  children,
}: LayoutProps<"/messages">) {
  return <MessagesLayout>{children}</MessagesLayout>;
}
