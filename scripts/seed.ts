import { hashPassword } from "better-auth/crypto";
import { createPool } from "@/lib/db/createPool";
import { seedDatabase } from "@/lib/db/seedDatabase";
import { SAMPLE_ACCOUNT } from "@/lib/auth/constants";

// npm run db:seed (an empty database) · npm run db:seed -- --reset (replaces everything)
const reset = process.argv.includes("--reset");
const pool = createPool();
try {
  const { rows } = await pool.query<{ count: number }>(
    "select count(*)::int as count from users",
  );
  if (rows[0].count > 0 && !reset) {
    console.error(
      "The database already has users. Run `npm run db:seed -- --reset` to replace everything with the starter community.",
    );
    process.exitCode = 1;
  } else {
    const db = await seedDatabase(
      pool,
      await hashPassword(SAMPLE_ACCOUNT.password),
    );
    console.log(
      `Seeded ${db.users.length} people, ${db.posts.length} posts, ${db.comments.length} comments, ${db.notifications.length} notifications and ${db.conversations.length} conversations.`,
    );
    console.log(
      `Sign in as ${SAMPLE_ACCOUNT.email} / ${SAMPLE_ACCOUNT.password}.`,
    );
  }
} finally {
  await pool.end();
}
