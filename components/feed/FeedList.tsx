"use client";

import { useRouter } from "next/navigation";
import { FeedLoading } from "@/components/feed/FeedLoading";
import { PostItem } from "@/components/post/PostItem";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useFeed } from "@/hooks/posts/useFeed";
import { useOpenCompose } from "@/hooks/shell/useOpenCompose";
import { FEED_EMPTY_COPY } from "@/lib/posts/constants";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { type FeedListProps } from "@/types/feed";

const EXPLORE_HREF =
  NAV_ITEMS.find((item) => item.id === "explore")?.href ?? "/explore";

export function FeedList({ tab }: FeedListProps) {
  const router = useRouter();
  const feed = useFeed(tab);
  const openCompose = useOpenCompose();

  if (feed.status === "loading") return <FeedLoading />;

  if (feed.status === "error") {
    return (
      <ErrorState
        title="Couldn't load your feed"
        description={feed.error.message}
        actions={
          <Button variant="danger" onClick={feed.retry}>
            Try again
          </Button>
        }
        className="mx-5 my-6"
      />
    );
  }

  if (feed.status === "empty") {
    return (
      <EmptyState
        {...FEED_EMPTY_COPY[tab]}
        actions={
          <>
            <Button onClick={openCompose}>Write a post</Button>
            {tab === "following" && (
              <Button
                variant="secondary"
                onClick={() => router.push(EXPLORE_HREF)}
              >
                Find people
              </Button>
            )}
          </>
        }
      />
    );
  }

  return (
    <>
      {feed.data.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <p className="p-6 text-center text-[13px] text-ag-text-placeholder">
        You&apos;re all caught up
      </p>
    </>
  );
}
