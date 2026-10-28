import { DEMO_CONTENT } from "@/lib/seed/demoContent";
import { type Session } from "@/types/auth";
import { type ActivityTone } from "@/types/simulation";

// "/demo?from=/settings/demo": where Exit demo goes back to.
export const RETURN_PATH_PARAM = "from";

export const RETURN_PATH_STORAGE_KEY = "agora.demo.returnPath";

export const EXIT_DEMO_LABEL = "Exit demo";

export const DEMO_RESET_MESSAGE = "The demo was reset";

// The demo has no real session; the nav only reads the persona's name and handle.
export const DEMO_SESSION: Session = {
  userId: "demo",
  email: "",
  name: DEMO_CONTENT.self.name,
  handle: DEMO_CONTENT.self.handle,
};

// The demo bar's height, which the sticky shell columns and headers sit under.
export const DEMO_SHELL_OFFSET = "[--ag-shell-top:--spacing(9.5)]";

// Activity rows shown in the rail's Simulation card.
export const RAIL_ACTIVITY_LIMIT = 4;

export const ACTIVITY_DOTS: Record<ActivityTone, string> = {
  ok: "bg-ag-success",
  error: "bg-ag-danger",
  info: "bg-ag-demo",
};
