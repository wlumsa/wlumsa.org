import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_events_recurrence" AS ENUM('none', 'weekly', 'biweekly', 'monthly');

    CREATE TABLE "events_recurrence_excluded_dates" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "date" timestamp(3) with time zone NOT NULL,
      "id" serial PRIMARY KEY NOT NULL
    );

    ALTER TABLE "events" ADD COLUMN "recurrence" "enum_events_recurrence" DEFAULT 'none';
    ALTER TABLE "events" ADD COLUMN "recurrence_end" timestamp(3) with time zone;
    ALTER TABLE "events" ADD COLUMN "recurring_parent_id" integer;
    ALTER TABLE "events" ADD COLUMN "recurrence_key" varchar;
    ALTER TABLE "events" ADD COLUMN "recurrence_exception" boolean DEFAULT false;

    ALTER TABLE "events_recurrence_excluded_dates" ADD CONSTRAINT "events_recurrence_excluded_dates_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "events" ADD CONSTRAINT "events_recurring_parent_id_events_id_fk" FOREIGN KEY ("recurring_parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "events_recurrence_excluded_dates_order_idx" ON "events_recurrence_excluded_dates" USING btree ("order");
    CREATE INDEX "events_recurrence_excluded_dates_parent_idx" ON "events_recurrence_excluded_dates" USING btree ("parent_id");
    CREATE INDEX "events_recurring_parent_idx" ON "events" USING btree ("recurring_parent_id");
    CREATE UNIQUE INDEX "events_recurrence_key_idx" ON "events" USING btree ("recurrence_key");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events" DROP CONSTRAINT "events_recurring_parent_id_events_id_fk";
    DROP INDEX "events_recurring_parent_idx";
    DROP INDEX "events_recurrence_key_idx";

    ALTER TABLE "events_recurrence_excluded_dates" DISABLE ROW LEVEL SECURITY;
    DROP TABLE "events_recurrence_excluded_dates" CASCADE;

    ALTER TABLE "events" DROP COLUMN "recurrence";
    ALTER TABLE "events" DROP COLUMN "recurrence_end";
    ALTER TABLE "events" DROP COLUMN "recurring_parent_id";
    ALTER TABLE "events" DROP COLUMN "recurrence_key";
    ALTER TABLE "events" DROP COLUMN "recurrence_exception";

    DROP TYPE "public"."enum_events_recurrence";
  `);
}
