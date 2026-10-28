// Route segment config can't be re-exported, so it's repeated here.
export const dynamicParams = false;

export {
  default,
  generateMetadata,
  generateStaticParams,
} from "@/app/(app)/(no-rail)/settings/[section]/page";
