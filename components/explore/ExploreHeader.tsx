import Form from "next/form";
import { SearchInput } from "@/components/ui/SearchInput";
import { Tabs } from "@/components/ui/Tabs";
import { useAppPath } from "@/hooks/shell/useAppPath";
import {
  EXPLORE_PATH,
  EXPLORE_TAB_ITEMS,
  SEARCH_PARAM,
} from "@/lib/explore/constants";
import { SHELL_STICKY_TOP } from "@/lib/shell/nav";
import { cn } from "@/utils/cn";
import { type ExploreHeaderProps } from "@/types/explore";

export function ExploreHeader({ query, tab, onTabChange }: ExploreHeaderProps) {
  const appPath = useAppPath();
  return (
    <header
      className={cn(
        SHELL_STICKY_TOP,
        "z-10 flex flex-col gap-3 border-b border-ag-border-subtle bg-ag-bg/92 px-5 py-3.5 backdrop-blur-sm",
      )}
    >
      <h1 className="sr-only">Explore</h1>
      {/* Submitting navigates to /explore?q=…; the key resets the field when the search changes. */}
      <Form action={appPath(EXPLORE_PATH)} key={query}>
        <SearchInput
          name={SEARCH_PARAM}
          defaultValue={query}
          label="Search people, posts and topics"
          placeholder="Search people, posts and topics"
        />
      </Form>
      <Tabs
        items={EXPLORE_TAB_ITEMS}
        value={tab}
        onChange={onTabChange}
        label="Explore"
        variant="pill"
      />
    </header>
  );
}
