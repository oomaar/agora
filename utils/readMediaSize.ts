import { type MediaSize } from "@/types/media";
import { type PostMediaKind } from "@/types/post";

// The picked file's pixel size, read from its local preview; null if it can't be read.
export function readMediaSize(
  url: string,
  kind: PostMediaKind,
): Promise<MediaSize | null> {
  return new Promise((resolve) => {
    const done = (width: number, height: number) =>
      resolve(width > 0 && height > 0 ? { width, height } : null);
    if (kind === "image") {
      const image = new Image();
      image.onload = () => done(image.naturalWidth, image.naturalHeight);
      image.onerror = () => resolve(null);
      image.src = url;
      return;
    }
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => done(video.videoWidth, video.videoHeight);
    video.onerror = () => resolve(null);
    video.src = url;
  });
}
