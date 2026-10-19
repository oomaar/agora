"use client";

import { useState } from "react";
import { DsCard } from "@/components/design-system/DsCard";
import { PostCard } from "@/components/post/PostCard";
import { useToast } from "@/hooks/ui/useToast";
import { SAMPLE_POSTS } from "@/lib/design-system/constants";

export function PostCardDemo() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const toast = useToast();

  return (
    <DsCard title="Post card · 1.14" flush>
      <PostCard
        pending
        author={{ name: "Maya Chen", handle: "maya.demo" }}
        time="now"
        text="Found a tiny bookshop behind the station."
        stats={{ comments: 0, reposts: 0, likes: 0 }}
      />
      {SAMPLE_POSTS.map((post) => {
        const isLiked = liked[post.author.handle] ?? false;
        return (
          <PostCard
            key={post.author.handle}
            {...post}
            liked={isLiked}
            stats={{
              ...post.stats,
              likes: post.stats.likes + (isLiked ? 1 : 0),
            }}
            onLike={() =>
              setLiked((current) => ({
                ...current,
                [post.author.handle]: !isLiked,
              }))
            }
            onOpen={() => toast.success(`Open post by ${post.author.name}`)}
            onShare={() => toast.success("Link copied")}
          />
        );
      })}
    </DsCard>
  );
}
