import { type Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = { title: "Explore" };

export default function ExplorePage() {
  return <PageHeader title="Explore" />;
}
