import "server-only";
import { query } from "@/lib/db/query";
import { type UnreadCounts } from "@/types/dataSource";

export async function getUnreadCounts(viewerId: string): Promise<UnreadCounts> {
  const [counts] = await query<UnreadCounts>(
    `select
       (select count(*)::int from notifications where recipient_id = $1 and not read) as notifications,
       (select count(*)::int from conversation_members where user_id = $1 and unread) as conversations`,
    [viewerId],
  );
  return counts;
}
