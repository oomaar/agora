import { DsCard } from "@/components/design-system/DsCard";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

export function StatesDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 nav:grid-cols-3">
      <DsCard title="Skeleton · 1.12" flush>
        <div className="flex items-center gap-2 border-b border-ag-border-subtle px-5 py-3 text-[13px] text-ag-text-secondary">
          <Spinner className="text-ag-demo" />
          Loading your feed…
        </div>
        <PostSkeleton />
        <PostSkeleton withMedia={false} divider={false} />
      </DsCard>
      <DsCard title="Empty · 1.13">
        <EmptyState
          compact
          title="Your feed is quiet"
          description="Write a first post, or load the sample community."
          actions={
            <>
              <Button size="sm">Write a post</Button>
              <Button size="sm" variant="secondary">
                Load sample
              </Button>
            </>
          }
        />
      </DsCard>
      <DsCard title="Error · 1.13">
        <ErrorState
          compact
          title="Couldn't load your feed"
          description="The simulated server didn't respond. This happens on the Offline and Flaky settings."
          actions={
            <>
              <Button size="sm" variant="danger">
                Try again
              </Button>
              <Button size="sm" variant="dangerOutline">
                Normal network
              </Button>
            </>
          }
        />
      </DsCard>
    </div>
  );
}
