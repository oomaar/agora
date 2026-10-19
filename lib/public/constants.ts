import { type DemoHighlight } from "@/types/public";

export const PITCH = {
  headline: "A public square for the people you actually follow.",
  body: "Share posts, photos and video. Talk in threads or in private messages.",
};

export const DEMO_PATH = "/demo";

// Where "Enter demo" leads; the demo routes read the picked scenario from this param.
export const DEMO_ENTRY_PATH = "/demo/home";

export const SCENARIO_PARAM = "scenario";

export const DEMO_HIGHLIGHTS: DemoHighlight[] = [
  {
    title: "Generated community",
    text: "About 40 people with profiles, posts, photos and conversations.",
  },
  {
    title: "Realistic timing",
    text: "Every action waits for a simulated server, so you see real loading and error states.",
  },
  {
    title: "Private to you",
    text: "Nothing is sent anywhere. Closing the tab or pressing Reset starts over.",
  },
];

export const DEMO_OUTLINE_LINK =
  "grid h-10 place-items-center rounded-md border border-ag-demo text-[14px] font-semibold text-ag-demo-text outline-none transition-colors hover:bg-ag-demo-soft focus-visible:shadow-ag-focus-ring";

export const DEMO_SOLID_LINK =
  "inline-flex h-11.5 flex-none items-center justify-center rounded-md bg-ag-demo px-6 text-[15px] font-semibold text-ag-on-demo outline-none transition-opacity hover:opacity-90 focus-visible:shadow-ag-focus-ring";

export const TEXT_LINK =
  "rounded-xs text-ag-accent-text outline-none hover:underline focus-visible:shadow-ag-focus-ring";
