import { PostDetail } from "@/components/post/PostDetail";
import { PageHeader } from "@/components/shell/PageHeader";

export default async function PostPage({ params }: PageProps<"/post/[id]">) {
  const { id } = await params;
  return (
    <>
      <PageHeader title="Post" back />
      <PostDetail postId={id} />
    </>
  );
}
