"use client";

import { useState } from "react";
import { DsCard } from "@/components/design-system/DsCard";
import { Button } from "@/components/ui/Button";
import { FollowButton } from "@/components/ui/FollowButton";
import { IconButton } from "@/components/ui/IconButton";
import { type ButtonSize, type ButtonVariant } from "@/types/button";

const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "demo",
  "danger",
  "dangerOutline",
];
const SIZES: ButtonSize[] = ["sm", "md", "lg"];

export function ButtonsDemo() {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  function simulateSave() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <DsCard title="Button · 1.3">
      <div className="flex flex-wrap items-center gap-2.5">
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
        <FollowButton following={following} onToggle={setFollowing} />
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {SIZES.map((size) => (
          <Button key={size} size={size}>
            Size {size}
          </Button>
        ))}
        <Button pill>Post</Button>
        <Button icon="plus">New post</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
        <Button loading={loading} onClick={simulateSave}>
          {loading ? "Posting…" : "Click to load"}
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <IconButton icon="arrowLeft" label="Back" variant="outline" />
        <IconButton icon="close" label="Close" variant="soft" size="sm" />
        <IconButton icon="more" label="More" />
        <IconButton
          icon="plus"
          label="New message"
          variant="outline"
          size="sm"
        />
        <IconButton icon="settings" label="Settings" size="lg" />
      </div>
    </DsCard>
  );
}
