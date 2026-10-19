import Link from "next/link";
import { DEMO_OUTLINE_LINK, DEMO_PATH } from "@/lib/public/constants";

// Sits in the sign-in column so visitors see the demo before deciding to register.
export function DemoInvite() {
  return (
    <section
      aria-labelledby="demo-invite-title"
      className="flex flex-col gap-3 rounded-xl border border-ag-demo-border bg-ag-demo-surface p-4.5"
    >
      <h2 id="demo-invite-title" className="flex items-center gap-2 text-title">
        <span aria-hidden="true" className="size-2 rounded-full bg-ag-demo" />
        Try the live demo
      </h2>
      <p className="text-[13.5px] leading-normal text-ag-demo-text-muted">
        No account needed. Browse, post and chat in a working copy of Agora
        filled with simulated people and data.
      </p>
      <Link href={DEMO_PATH} className={DEMO_OUTLINE_LINK}>
        Open the demo →
      </Link>
    </section>
  );
}
