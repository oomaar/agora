import { type Metadata } from "next";
import { ChatThread } from "@/components/messages/ChatThread";

export const metadata: Metadata = { title: "Messages" };

export default async function ConversationPage({
  params,
}: PageProps<"/messages/[id]">) {
  const { id } = await params;
  // A fresh thread per conversation, so a draft doesn't follow you to the next one.
  return <ChatThread key={id} conversationId={id} />;
}
