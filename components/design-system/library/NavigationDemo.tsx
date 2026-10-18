"use client";

import { useState } from "react";
import { DsCard } from "@/components/design-system/DsCard";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useTheme } from "@/hooks/useTheme";
import { type Theme } from "@/types/theme";

type FeedTab = "forYou" | "following";
type ExploreTab = "top" | "people" | "posts" | "media" | "topics";
type Network = "normal" | "slow" | "offline";

export function NavigationDemo() {
  const [feedTab, setFeedTab] = useState<FeedTab>("forYou");
  const [exploreTab, setExploreTab] = useState<ExploreTab>("top");
  const [network, setNetwork] = useState<Network>("normal");
  const [likes, setLikes] = useState(true);
  const [follows, setFollows] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-1 gap-4 nav:grid-cols-2">
      <DsCard title="Tabs · 1.6">
        <Tabs
          label="Feed"
          value={feedTab}
          onChange={setFeedTab}
          items={[
            { id: "forYou", label: "For you" },
            { id: "following", label: "Following", count: 3 },
          ]}
        />
        <Tabs
          label="Explore filters"
          variant="pill"
          value={exploreTab}
          onChange={setExploreTab}
          items={[
            { id: "top", label: "Top" },
            { id: "people", label: "People" },
            { id: "posts", label: "Posts" },
            { id: "media", label: "Media" },
            { id: "topics", label: "Topics" },
          ]}
        />
        <p className="text-caption text-ag-text-secondary">
          Arrow keys, Home and End move between tabs.
        </p>
      </DsCard>
      <DsCard title="Toggle & segmented control · 1.11">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px]">Likes</span>
            <span className="text-caption text-ag-text-secondary">
              When someone likes your post
            </span>
          </div>
          <Toggle label="Likes" checked={likes} onChange={setLikes} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px]">New followers</span>
            <span className="text-caption text-ag-text-secondary">
              When someone follows you
            </span>
          </div>
          <Toggle
            label="New followers"
            checked={follows}
            onChange={setFollows}
          />
        </div>
        <SegmentedControl<Theme>
          label="Theme"
          value={theme}
          onChange={setTheme}
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
            { value: "system", label: "System" },
          ]}
        />
        <SegmentedControl<Network>
          label="Network"
          tone="demo"
          value={network}
          onChange={setNetwork}
          options={[
            { value: "normal", label: "Normal" },
            { value: "slow", label: "Slow" },
            { value: "offline", label: "Offline" },
          ]}
        />
      </DsCard>
    </div>
  );
}
