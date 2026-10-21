import { type Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";

export async function generateMetadata({
  params,
}: PageProps<"/u/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  return { title: `@${decodeURIComponent(handle)}` };
}

export default async function ProfilePage({
  params,
}: PageProps<"/u/[handle]">) {
  const { handle } = await params;
  return <PageHeader title={`@${decodeURIComponent(handle)}`} />;
}
