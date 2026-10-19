import { APP_CONTENT } from "@/lib/seed/appContent";
import { DEMO_CONTENT } from "@/lib/seed/demoContent";
import { type DataPreset, type DataPresetId } from "@/types/simulation";

export const DATA_PRESETS: Record<DataPresetId, DataPreset> = {
  app: { seed: 1, content: APP_CONTENT, scenario: "busy" },
  demo: { seed: 2, content: DEMO_CONTENT, scenario: "busy" },
};
