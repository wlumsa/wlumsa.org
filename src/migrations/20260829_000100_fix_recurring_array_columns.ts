import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events_recurrence_excluded_dates" RENAME COLUMN "order" TO "_order";
    ALTER TABLE "events_recurrence_excluded_dates" RENAME COLUMN "parent_id" TO "_parent_id";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events_recurrence_excluded_dates" RENAME COLUMN "_order" TO "order";
    ALTER TABLE "events_recurrence_excluded_dates" RENAME COLUMN "_parent_id" TO "parent_id";
  `);
}
