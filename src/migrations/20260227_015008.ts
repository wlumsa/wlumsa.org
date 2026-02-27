import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_settings_mode" AS ENUM('auto', 'quiet');
  CREATE TYPE "public"."enum_weekly_events_recurrence" AS ENUM('weekly', 'biweekly');
  
  CREATE TABLE "events_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum_events_settings_mode" DEFAULT 'auto' NOT NULL,
  	"quiet_message" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "weekly_events" ADD COLUMN "recurrence" "enum_weekly_events_recurrence" DEFAULT 'weekly' NOT NULL;
  ALTER TABLE "weekly_events" ADD COLUMN "start_date" timestamp(3) with time zone;
  ALTER TABLE "events" ALTER COLUMN "date" SET NOT NULL;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ALTER COLUMN "date" DROP NOT NULL;
  ALTER TABLE "weekly_events" DROP COLUMN "recurrence";
  ALTER TABLE "weekly_events" DROP COLUMN "start_date";
  ALTER TABLE "events_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "events_settings" CASCADE;
  DROP TYPE "public"."enum_weekly_events_recurrence";
  DROP TYPE "public"."enum_events_settings_mode";`)
}
