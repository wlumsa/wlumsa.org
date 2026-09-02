import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "event_tasks" ADD COLUMN "reminder_sent_at" timestamp(3) with time zone;
  ALTER TABLE "content_schedule" ADD COLUMN "reminder_sent_at" timestamp(3) with time zone;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "event_tasks" DROP COLUMN "reminder_sent_at";
  ALTER TABLE "content_schedule" DROP COLUMN "reminder_sent_at";`)
}
