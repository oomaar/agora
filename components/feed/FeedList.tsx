"use client";

import { useAppRouter } from "@/hooks/shell/useAppRouter";
import { FeedLoading } from "@/components/feed/FeedLoading";
import { PostList } from "@/components/post/PostList";
import { Button } from "@/components/ui/Button";
import { useFeed } from "@/hooks/posts/useFeed";
import { useOpenCompose } from "@/hooks/shell/useOpenCompose";
import { FEED_EMPTY_COPY } from "@/lib/posts/constants";
import { NAV_ITEMS } from "@/lib/shell/constants";
import { type FeedListProps } from "@/types/feed";

const EXPLORE_HREF =
  NAV_ITEMS.find((item) => item.id === "explore")?.href ?? "/explore";

export function FeedList({ tab }: FeedListProps) {
  const router = useAppRouter();
  const feed = useFeed(tab);
  const openCompose = useOpenCompose();
  return (
    <PostList
      query={feed}
      loading={<FeedLoading />}
      errorTitle="Couldn't load your feed"
      emptyTitle={FEED_EMPTY_COPY[tab].title}
      emptyDescription={FEED_EMPTY_COPY[tab].description}
      emptyActions={
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
