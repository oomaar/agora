"use client";

import { useState } from "react";
import { PostList } from "@/components/post/PostList";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { useOpenCompose } from "@/hooks/shell/useOpenCompose";
import { useUserPosts } from "@/hooks/users/useUserPosts";
import {
  NAME_TOKEN,
  PROFILE_EMPTY_COPY,
  PROFILE_EMPTY_TITLES,
  PROFILE_TAB_ITEMS,
} from "@/lib/profile/constants";
import { firstName } from "@/utils/firstName";
import { type ProfileTab } from "@/types/dataSource";
import { type ProfilePostsProps } from "@/types/profile";

export function ProfilePosts({ user }: ProfilePostsProps) {
  const [tab, setTab] = useState<ProfileTab>("posts");
  const posts = useUserPosts(user.handle, tab);
  const openCompose = useOpenCompose();
  const copy = PROFILE_EMPTY_COPY[tab];
  return (
    <>
      <Tabs
        items={PROFILE_TAB_ITEMS}
        value={tab}
        onChange={setTab}
        label="Profile posts"
      />
      <div
        role="tabpanel"
        aria-label={PROFILE_TAB_ITEMS.find((item) => item.id === tab)?.label}
      >
        <PostList
          query={posts}
          errorTitle="Couldn't load these posts"
          emptyTitle={PROFILE_EMPTY_TITLES[tab]}
          emptyDescription={
            user.isSelf
              ? copy.self
              : copy.other.replace(NAME_TOKEN, firstName(user.name))
          }
          emptyActions={
            user.isSelf && tab === "posts" ? (
              <Button onClick={openCompose}>Write a post</Button>
            ) : undefined
          }
        />
      </div>
    </>
  );
}
