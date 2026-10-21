import { type Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return <PageHeader title="Messages" />;
}
