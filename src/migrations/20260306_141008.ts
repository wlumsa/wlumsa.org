import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_weekly_events_recurrence" AS ENUM('weekly', 'biweekly');
  CREATE TYPE "public"."enum_forms_blocks_upload_allowed_file_types" AS ENUM('*', 'application/pdf', 'image/png,image/jpeg,image/webp', '.doc,.docx');
  CREATE TABLE "forms_blocks_upload_allowed_file_types" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_forms_blocks_upload_allowed_file_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "forms_blocks_upload" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"width" numeric DEFAULT 100,
  	"max_file_size_m_b" numeric DEFAULT 5,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "weekly_prayer_timetables" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"week_key" varchar NOT NULL,
  	"week_label" varchar NOT NULL,
  	"source_url" varchar NOT NULL,
  	"scraped_at" timestamp(3) with time zone NOT NULL,
  	"headers" jsonb NOT NULL,
  	"rows" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "weekly_events" ADD COLUMN "recurrence" "enum_weekly_events_recurrence" DEFAULT 'weekly' NOT NULL;
  ALTER TABLE "weekly_events" ADD COLUMN "start_date" timestamp(3) with time zone;
  ALTER TABLE "weekly_events" ADD COLUMN "location_link" varchar;
  ALTER TABLE "events" ADD COLUMN "location_link" varchar;
  ALTER TABLE "forms_blocks_upload_allowed_file_types" ADD CONSTRAINT "forms_blocks_upload_allowed_file_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms_blocks_upload"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_upload" ADD CONSTRAINT "forms_blocks_upload_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "forms_blocks_upload_allowed_file_types_order_idx" ON "forms_blocks_upload_allowed_file_types" USING btree ("order");
  CREATE INDEX "forms_blocks_upload_allowed_file_types_parent_idx" ON "forms_blocks_upload_allowed_file_types" USING btree ("parent_id");
  CREATE INDEX "forms_blocks_upload_order_idx" ON "forms_blocks_upload" USING btree ("_order");
  CREATE INDEX "forms_blocks_upload_parent_id_idx" ON "forms_blocks_upload" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_upload_path_idx" ON "forms_blocks_upload" USING btree ("_path");
  CREATE UNIQUE INDEX "weekly_prayer_timetables_week_key_idx" ON "weekly_prayer_timetables" USING btree ("week_key");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "forms_blocks_upload_allowed_file_types" CASCADE;
  DROP TABLE "forms_blocks_upload" CASCADE;
  DROP TABLE "weekly_prayer_timetables" CASCADE;
  ALTER TABLE "weekly_events" DROP COLUMN "recurrence";
  ALTER TABLE "weekly_events" DROP COLUMN "start_date";
  ALTER TABLE "weekly_events" DROP COLUMN "location_link";
  ALTER TABLE "events" DROP COLUMN "location_link";
  DROP TYPE "public"."enum_weekly_events_recurrence";
  DROP TYPE "public"."enum_forms_blocks_upload_allowed_file_types";`)
}
