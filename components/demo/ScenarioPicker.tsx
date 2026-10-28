"use client";

import { useState } from "react";
import { ScenarioOption } from "@/components/demo/ScenarioOption";
import { DEMO_SOLID_LINK } from "@/lib/public/constants";
import { SCENARIOS } from "@/lib/simulation/constants";
import { demoEntryPath } from "@/utils/demoEntryPath";
import { type DemoLandingProps } from "@/types/demo";
import { type ScenarioId } from "@/types/simulation";

const SCENARIO_IDS = Object.keys(SCENARIOS) as ScenarioId[];

export function ScenarioPicker({ returnPath }: DemoLandingProps) {
  const [picked, setPicked] = useState<ScenarioId>("busy");
  return (
    <>
      <fieldset>
        <legend className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ag-text-secondary">
          Choose a scenario
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {SCENARIO_IDS.map((scenario) => (
            <ScenarioOption
              key={scenario}
              scenario={scenario}
              checked={picked === scenario}
              onSelect={setPicked}
            />
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* A full page load: the demo reads its scenario from the URL as it starts, and a
            client navigation would render it before the URL changes. */}
        <a href={demoEntryPath(picked, returnPath)} className={DEMO_SOLID_LINK}>
          Enter demo
        </a>
        <span className="text-[13px] text-ag-text-secondary">
          You can reset or change network conditions at any time.
        </span>
      </div>
    </>
  );
}
