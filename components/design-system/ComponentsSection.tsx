import { SectionHeader } from "@/components/design-system/SectionHeader";
import { ThemePanel } from "@/components/design-system/ThemePanel";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Counter } from "@/components/ui/Counter";
import { Toast } from "@/components/ui/Toast";
import { PostCard } from "@/components/post/PostCard";
import { THEMES } from "@/lib/design-system/constants";

export function ComponentsSection() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        index="06"
        title="Core components"
        description="Dark and light, built from the tokens above."
      />
      <div className="grid grid-cols-1 gap-4 nav:grid-cols-2">
        {THEMES.map((theme) => (
          <ThemePanel
            key={theme}
            theme={theme}
            spacing="gap-[22px] rounded-2xl p-7"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="demo">Demo</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="follow" size="sm">
                Follow
              </Button>
            </div>
            <Input label="Comment" placeholder="Write a comment…" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ag-text px-3 py-1.5 text-[13px] font-semibold text-ag-bg">
                Top
              </span>
              <span className="rounded-full border border-ag-border px-3 py-1.5 text-[13px] text-ag-text-secondary">
                People
              </span>
              <Counter value={3} />
              <Badge variant="demo">Demo</Badge>
              <Toast kind="success" message="Post published" />
              <Toast kind="error" message="Couldn't send" />
            </div>
            <div className="overflow-hidden rounded-lg border border-ag-border-subtle">
              <PostCard
                author={{ name: "Aiko Tanaka", handle: "aiko.t" }}
                time="4m"
                text="Our library just started lending sewing machines."
                stats={{ comments: 4, reposts: 1, likes: 24 }}
                liked
                divider={false}
              />
            </div>
          </ThemePanel>
        ))}
      </div>
    </section>
  );
}
