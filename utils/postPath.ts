// "post_12" → "/post/post_12"; pass `hash` to land on a part of the page, e.g. the reply box.
export function postPath(postId: string, hash?: string): string {
  return `/post/${encodeURIComponent(postId)}${hash ? `#${hash}` : ""}`;
}
