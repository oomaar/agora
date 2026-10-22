import { type PostView } from "@/types/domain";

export function hasMedia(post: PostView): boolean {
  return post.media !== null;
}
