import { type Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return <PageHeader title="Notifications" />;
}
