import { type Metadata } from "next";
import { ProfileView } from "@/components/profile/ProfileView";
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
  const handle = decodeURIComponent((await params).handle);
  return (
    <>
      <PageHeader title={`@${handle}`} back />
      <ProfileView handle={handle} />
    </>
  );
}
