import { PageHeader } from "@/components/shell/PageHeader";

export default async function ProfilePage({
  params,
}: PageProps<"/u/[handle]">) {
  const { handle } = await params;
  return <PageHeader title={`@${decodeURIComponent(handle)}`} />;
}
