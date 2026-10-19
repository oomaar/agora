"use client";

import Link from "next/link";
import { useState } from "react";
import { ScenarioOption } from "@/components/demo/ScenarioOption";
import {
  DEMO_ENTRY_PATH,
  DEMO_SOLID_LINK,
  SCENARIO_PARAM,
} from "@/lib/public/constants";
import { SCENARIOS } from "@/lib/simulation/constants";
import { type ScenarioId } from "@/types/simulation";

const SCENARIO_IDS = Object.keys(SCENARIOS) as ScenarioId[];

export function ScenarioPicker() {
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
        <Link
          href={`${DEMO_ENTRY_PATH}?${SCENARIO_PARAM}=${picked}`}
          className={DEMO_SOLID_LINK}
        >
          Enter demo
        </Link>
        <span className="text-[13px] text-ag-text-secondary">
          You can reset or change network conditions at any time.
        </span>
      </div>
    </>
  );
}
