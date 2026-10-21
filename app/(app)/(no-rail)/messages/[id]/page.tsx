import { type Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = { title: "Messages" };

export default function ConversationPage() {
  return <PageHeader title="Messages" />;
}
