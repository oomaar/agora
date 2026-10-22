"use client";

import { useState } from "react";
import { ExploreDiscover } from "@/components/explore/ExploreDiscover";
import { ExploreHeader } from "@/components/explore/ExploreHeader";
import { ExploreMedia } from "@/components/explore/ExploreMedia";
import { ExplorePeople } from "@/components/explore/ExplorePeople";
import { ExplorePosts } from "@/components/explore/ExplorePosts";
import { ExploreTopResults } from "@/components/explore/ExploreTopResults";
import { ExploreTopics } from "@/components/explore/ExploreTopics";
import { EXPLORE_TAB_ITEMS } from "@/lib/explore/constants";
import { type ExploreTab, type ExploreViewProps } from "@/types/explore";

export function ExploreView({ query }: ExploreViewProps) {
  const [tab, setTab] = useState<ExploreTab>("top");
  const content = { query, onTabChange: setTab };
  return (
    <>
      <ExploreHeader query={query} tab={tab} onTabChange={setTab} />
      <div
        role="tabpanel"
        aria-label={EXPLORE_TAB_ITEMS.find((item) => item.id === tab)?.label}
      >
        {tab === "top" &&
          (query ? <ExploreTopResults {...content} /> : <ExploreDiscover />)}
        {tab === "people" && <ExplorePeople {...content} />}
        {tab === "posts" && <ExplorePosts {...content} />}
        {tab === "media" && <ExploreMedia {...content} />}
        {tab === "topics" && <ExploreTopics {...content} />}
      </div>
    </>
  );
}
