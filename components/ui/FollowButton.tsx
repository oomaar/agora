"use client";

import { Button } from "@/components/ui/Button";
import { type FollowButtonProps } from "@/types/button";

export function FollowButton({
  following,
  onToggle,
  size = "sm",
  ...props
}: FollowButtonProps) {
  return (
    <Button
      variant={following ? "following" : "follow"}
      size={size}
      aria-pressed={following}
      onClick={() => onToggle(!following)}
      {...props}
    >
      {following ? "Following" : "Follow"}
    </Button>
  );
}
