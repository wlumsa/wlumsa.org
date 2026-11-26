import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
    ALTER TABLE "execs" ADD COLUMN IF NOT EXISTS "reset_password_requested_at" timestamp(3) with time zone;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "execs" DROP COLUMN IF EXISTS "reset_password_requested_at";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectkey";
  `);
}
