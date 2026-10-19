import Form from "next/form";
import { TrendingCard } from "@/components/shell/TrendingCard";
import { WhoToFollowCard } from "@/components/shell/WhoToFollowCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { COPYRIGHT, FOOTER_LINKS } from "@/lib/shell/constants";
import { SHELL_COLUMN } from "@/lib/shell/nav";
import { cn } from "@/utils/cn";

// Hidden below the rail breakpoint.
export function ContextRail() {
  return (
    <aside
      aria-label="Trends and suggestions"
      className={cn(SHELL_COLUMN, "hidden w-85 flex-col gap-4 px-5 py-4 rail:flex")}
    >
      <Form action="/explore">
        <SearchInput name="q" label="Search Agora" placeholder="Search Agora" />
      </Form>
      <TrendingCard />
      <WhoToFollowCard />
      <footer className="px-1 text-[12px] text-ag-text-placeholder">
        {[...FOOTER_LINKS, COPYRIGHT].join(" · ")}
      </footer>
    </aside>
  );
}
