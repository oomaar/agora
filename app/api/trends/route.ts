import { getTrends } from "@/services/database/trends";
import { withViewer } from "@/lib/api/withViewer";

export const GET = withViewer(() => getTrends());
