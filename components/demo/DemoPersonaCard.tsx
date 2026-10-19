import { Avatar } from "@/components/ui/Avatar";
import { DEMO_CONTENT } from "@/lib/seed/demoContent";

// The demo persona is fixed, so this reads straight from the seed content.
export function DemoPersonaCard() {
  const { name, handle, following, followers } = DEMO_CONTENT.self;
  return (
    <div className="flex items-center gap-3.5 rounded-lg border border-ag-border bg-ag-surface px-4.5 py-4">
      <Avatar name={name} handle={handle} size="lg" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-semibold">
          You&apos;ll be signed in as {name}
        </span>
        <span className="text-[13px] text-ag-text-secondary">
          @{handle} · {following} following · {followers} followers
        </span>
      </div>
    </div>
  );
}
