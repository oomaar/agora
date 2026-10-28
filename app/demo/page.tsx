import { type Metadata } from "next";
import { DemoHighlights } from "@/components/demo/DemoHighlights";
import { DemoLandingHeader } from "@/components/demo/DemoLandingHeader";
import { DemoPersonaCard } from "@/components/demo/DemoPersonaCard";
import { ScenarioPicker } from "@/components/demo/ScenarioPicker";
import { WELCOME_PATH } from "@/lib/auth/constants";
import { RETURN_PATH_PARAM } from "@/lib/demo/constants";
import { readReturnPath } from "@/utils/readReturnPath";

export const metadata: Metadata = { title: "Demo" };

export default async function DemoLandingPage({
  searchParams,
}: PageProps<"/demo">) {
  const value = (await searchParams)[RETURN_PATH_PARAM];
  // Where the demo was opened from (the sidebar card, Settings › Demo); the welcome page otherwise.
  const returnPath =
    readReturnPath(typeof value === "string" ? value : null) ?? WELCOME_PATH;
  return (
    <>
      <DemoLandingHeader returnPath={returnPath} />
      <main className="mx-auto flex w-full max-w-220 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-[28px] font-semibold leading-[1.1] tracking-tight sm:text-h1">
            Explore Agora with a simulated backend
          </h1>
          <p className="max-w-160 text-pretty text-body text-ag-text-secondary sm:text-[16px] sm:leading-[1.55]">
            Everything works the way it does in the real app: posting, liking,
            commenting and messaging. The people, posts and server responses are
            generated in your browser and reset when you leave.
          </p>
        </div>
        <DemoPersonaCard />
        <ScenarioPicker returnPath={returnPath} />
        <DemoHighlights />
      </main>
    </>
  );
}
