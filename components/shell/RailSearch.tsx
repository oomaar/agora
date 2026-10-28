"use client";

import Form from "next/form";
import { SearchInput } from "@/components/ui/SearchInput";
import { useAppPath } from "@/hooks/shell/useAppPath";
import { EXPLORE_PATH, SEARCH_PARAM } from "@/lib/explore/constants";

export function RailSearch() {
  const appPath = useAppPath();
  return (
    <Form action={appPath(EXPLORE_PATH)}>
      <SearchInput
        name={SEARCH_PARAM}
        label="Search Agora"
        placeholder="Search Agora"
      />
    </Form>
  );
}
