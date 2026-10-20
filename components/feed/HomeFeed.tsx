"use client";

import { useState } from "react";
import { FeedList } from "@/components/feed/FeedList";
import { InlineComposer } from "@/components/feed/InlineComposer";
import { PageHeader } from "@/components/shell/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { FEED_TAB_ITEMS } from "@/lib/posts/constants";
import { type FeedTab } from "@/types/dataSource";

export function HomeFeed() {
  const [tab, setTab] = useState<FeedTab>("for-you");
  return (
    <>
      <PageHeader title="Home">
        <Tabs
          items={FEED_TAB_ITEMS}
          value={tab}
          onChange={setTab}
          label="Feed"
        />
      </PageHeader>
      <InlineComposer />
      <div
        role="tabpanel"
        aria-label={FEED_TAB_ITEMS.find((item) => item.id === tab)?.label}
      >
        <FeedList tab={tab} />
      </div>
    </>
  );
}
