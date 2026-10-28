"use client";

import { useEffect } from "react";
import { saveReturnPath } from "@/lib/demo/returnPath";
import { RETURN_PATH_PARAM } from "@/lib/demo/constants";
import { readReturnPath } from "@/utils/readReturnPath";

// Entering the demo carries "?from=…"; it's kept for Exit demo once the URL moves on.
export function useSaveReturnPath() {
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get(
      RETURN_PATH_PARAM,
    );
    const path = readReturnPath(value);
    if (path) saveReturnPath(path);
  }, []);
}
