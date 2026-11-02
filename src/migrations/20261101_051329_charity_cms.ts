import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_charity_campaigns_campaign_type" AS ENUM('year-round', 'charity-week');
  CREATE TYPE "public"."enum_charity_campaigns_phase" AS ENUM('upcoming', 'active', 'completed');
  CREATE TYPE "public"."enum_charity_campaigns_fundraising_currency" AS ENUM('CAD', 'USD');
  CREATE TYPE "public"."enum_charity_campaigns_fundraising_amount_state" AS ENUM('unknown', 'verified');
  CREATE TYPE "public"."enum_charity_campaigns_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__charity_campaigns_v_version_campaign_type" AS ENUM('year-round', 'charity-week');
  CREATE TYPE "public"."enum__charity_campaigns_v_version_phase" AS ENUM('upcoming', 'active', 'completed');
  CREATE TYPE "public"."enum__charity_campaigns_v_version_fundraising_currency" AS ENUM('CAD', 'USD');
  CREATE TYPE "public"."enum__charity_campaigns_v_version_fundraising_amount_state" AS ENUM('unknown', 'verified');
  CREATE TYPE "public"."enum__charity_campaigns_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_charity_hub_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__charity_hub_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_execs_department" ADD VALUE 'charity';
  ALTER TYPE "public"."enum_execs_roles" ADD VALUE 'charity_editor';
  ALTER TYPE "public"."enum_events_departments" ADD VALUE 'charity';
  ALTER TYPE "public"."enum_event_tasks_department" ADD VALUE 'charity';
  ALTER TYPE "public"."enum_content_schedule_department" ADD VALUE 'charity';
  CREATE TABLE "charity_campaigns_causes" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "name" varchar,
    "description" varchar,
    "image_id" integer
  );

  CREATE TABLE "charity_campaigns_partners" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "name" varchar,
    "description" varchar,
    "url" varchar
  );

  CREATE TABLE "charity_campaigns_impact_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "value" varchar
  );

  CREATE TABLE "charity_campaigns" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "campaign_type" "enum_charity_campaigns_campaign_type" DEFAULT 'year-round',
    "year" numeric,
    "phase" "enum_charity_campaigns_phase" DEFAULT 'upcoming',
    "summary" varchar,
    "hero_image_id" integer,
    "start_date" timestamp(3) with time zone,
    "end_date" timestamp(3) with time zone,
    "featured" boolean DEFAULT false,
    "display_order" numeric DEFAULT 100,
    "fundraising_currency" "enum_charity_campaigns_fundraising_currency" DEFAULT 'CAD',
    "fundraising_goal" numeric,
    "fundraising_amount_state" "enum_charity_campaigns_fundraising_amount_state" DEFAULT 'unknown',
    "fundraising_amount_raised" numeric,
    "fundraising_last_verified_at" timestamp(3) with time zone,
    "fundraising_donation_u_r_l" varchar,
    "volunteer_text" varchar,
    "volunteer_u_r_l" varchar,
    "contact_email" varchar,
    "results_summary" varchar,
    "recap_u_r_l" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_charity_campaigns_status" DEFAULT 'draft'
  );

  CREATE TABLE "charity_campaigns_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "events_id" integer
  );

  CREATE TABLE "_charity_campaigns_v_version_causes" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "description" varchar,
    "image_id" integer,
    "_uuid" varchar
  );

  CREATE TABLE "_charity_campaigns_v_version_partners" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "description" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_charity_campaigns_v_version_impact_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "value" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_charity_campaigns_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_title" varchar,
    "version_campaign_type" "enum__charity_campaigns_v_version_campaign_type" DEFAULT 'year-round',
    "version_year" numeric,
    "version_phase" "enum__charity_campaigns_v_version_phase" DEFAULT 'upcoming',
    "version_summary" varchar,
    "version_hero_image_id" integer,
    "version_start_date" timestamp(3) with time zone,
    "version_end_date" timestamp(3) with time zone,
    "version_featured" boolean DEFAULT false,
    "version_display_order" numeric DEFAULT 100,
    "version_fundraising_currency" "enum__charity_campaigns_v_version_fundraising_currency" DEFAULT 'CAD',
    "version_fundraising_goal" numeric,
    "version_fundraising_amount_state" "enum__charity_campaigns_v_version_fundraising_amount_state" DEFAULT 'unknown',
    "version_fundraising_amount_raised" numeric,
    "version_fundraising_last_verified_at" timestamp(3) with time zone,
    "version_fundraising_donation_u_r_l" varchar,
    "version_volunteer_text" varchar,
    "version_volunteer_u_r_l" varchar,
    "version_contact_email" varchar,
    "version_results_summary" varchar,
    "version_recap_u_r_l" varchar,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__charity_campaigns_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "_charity_campaigns_v_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "events_id" integer
  );

  CREATE TABLE "payload_jobs_log" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "executed_at" timestamp(3) with time zone NOT NULL,
    "completed_at" timestamp(3) with time zone NOT NULL,
    "task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
    "task_i_d" varchar NOT NULL,
    "input" jsonb,
    "output" jsonb,
    "state" "enum_payload_jobs_log_state" NOT NULL,
    "error" jsonb
  );

  CREATE TABLE "payload_jobs" (
    "id" serial PRIMARY KEY NOT NULL,
    "input" jsonb,
    "completed_at" timestamp(3) with time zone,
    "total_tried" numeric DEFAULT 0,
    "has_error" boolean DEFAULT false,
    "error" jsonb,
    "task_slug" "enum_payload_jobs_task_slug",
    "queue" varchar DEFAULT 'default',
    "wait_until" timestamp(3) with time zone,
    "processing" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "charity_hub" (
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar DEFAULT 'WLU MSA Charity',
    "title" varchar DEFAULT 'Care in action, all year long.',
    "introduction" varchar,
    "hero_image_id" integer,
    "volunteer_heading" varchar DEFAULT 'Help move the work forward',
    "volunteer_text" varchar,
    "volunteer_u_r_l" varchar,
    "collaboration_text" varchar,
    "contact_email" varchar,
    "instagram_u_r_l" varchar DEFAULT 'https://www.instagram.com/wlumsa.charity/',
    "_status" "enum_charity_hub_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "_charity_hub_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_eyebrow" varchar DEFAULT 'WLU MSA Charity',
    "version_title" varchar DEFAULT 'Care in action, all year long.',
    "version_introduction" varchar,
    "version_hero_image_id" integer,
    "version_volunteer_heading" varchar DEFAULT 'Help move the work forward',
    "version_volunteer_text" varchar,
    "version_volunteer_u_r_l" varchar,
    "version_collaboration_text" varchar,
    "version_contact_email" varchar,
    "version_instagram_u_r_l" varchar DEFAULT 'https://www.instagram.com/wlumsa.charity/',
    "version__status" "enum__charity_hub_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  ALTER TABLE "media" ADD COLUMN "charity_media" boolean DEFAULT false;
  ALTER TABLE "media" ADD COLUMN "uploaded_by_id" integer;
  ALTER TABLE "events" ADD COLUMN "charity_managed" boolean DEFAULT false;
  ALTER TABLE "events" ADD COLUMN "charity_owner_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "charity_campaigns_id" integer;
  ALTER TABLE "charity_campaigns_causes" ADD CONSTRAINT "charity_campaigns_causes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "charity_campaigns_causes" ADD CONSTRAINT "charity_campaigns_causes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."charity_campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "charity_campaigns_partners" ADD CONSTRAINT "charity_campaigns_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."charity_campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "charity_campaigns_impact_items" ADD CONSTRAINT "charity_campaigns_impact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."charity_campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "charity_campaigns" ADD CONSTRAINT "charity_campaigns_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "charity_campaigns_rels" ADD CONSTRAINT "charity_campaigns_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."charity_campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "charity_campaigns_rels" ADD CONSTRAINT "charity_campaigns_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_charity_campaigns_v_version_causes" ADD CONSTRAINT "_charity_campaigns_v_version_causes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_charity_campaigns_v_version_causes" ADD CONSTRAINT "_charity_campaigns_v_version_causes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_charity_campaigns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_charity_campaigns_v_version_partners" ADD CONSTRAINT "_charity_campaigns_v_version_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_charity_campaigns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_charity_campaigns_v_version_impact_items" ADD CONSTRAINT "_charity_campaigns_v_version_impact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_charity_campaigns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_charity_campaigns_v" ADD CONSTRAINT "_charity_campaigns_v_parent_id_charity_campaigns_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."charity_campaigns"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_charity_campaigns_v" ADD CONSTRAINT "_charity_campaigns_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_charity_campaigns_v_rels" ADD CONSTRAINT "_charity_campaigns_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_charity_campaigns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_charity_campaigns_v_rels" ADD CONSTRAINT "_charity_campaigns_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "charity_hub" ADD CONSTRAINT "charity_hub_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_charity_hub_v" ADD CONSTRAINT "_charity_hub_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "charity_campaigns_causes_order_idx" ON "charity_campaigns_causes" USING btree ("_order");
  CREATE INDEX "charity_campaigns_causes_parent_id_idx" ON "charity_campaigns_causes" USING btree ("_parent_id");
  CREATE INDEX "charity_campaigns_causes_image_idx" ON "charity_campaigns_causes" USING btree ("image_id");
  CREATE INDEX "charity_campaigns_partners_order_idx" ON "charity_campaigns_partners" USING btree ("_order");
  CREATE INDEX "charity_campaigns_partners_parent_id_idx" ON "charity_campaigns_partners" USING btree ("_parent_id");
  CREATE INDEX "charity_campaigns_impact_items_order_idx" ON "charity_campaigns_impact_items" USING btree ("_order");
  CREATE INDEX "charity_campaigns_impact_items_parent_id_idx" ON "charity_campaigns_impact_items" USING btree ("_parent_id");
  CREATE INDEX "charity_campaigns_hero_image_idx" ON "charity_campaigns" USING btree ("hero_image_id");
  CREATE INDEX "charity_campaigns_updated_at_idx" ON "charity_campaigns" USING btree ("updated_at");
  CREATE INDEX "charity_campaigns_created_at_idx" ON "charity_campaigns" USING btree ("created_at");
  CREATE INDEX "charity_campaigns__status_idx" ON "charity_campaigns" USING btree ("_status");
  CREATE INDEX "charity_campaigns_rels_order_idx" ON "charity_campaigns_rels" USING btree ("order");
  CREATE INDEX "charity_campaigns_rels_parent_idx" ON "charity_campaigns_rels" USING btree ("parent_id");
  CREATE INDEX "charity_campaigns_rels_path_idx" ON "charity_campaigns_rels" USING btree ("path");
  CREATE INDEX "charity_campaigns_rels_events_id_idx" ON "charity_campaigns_rels" USING btree ("events_id");
  CREATE INDEX "_charity_campaigns_v_version_causes_order_idx" ON "_charity_campaigns_v_version_causes" USING btree ("_order");
  CREATE INDEX "_charity_campaigns_v_version_causes_parent_id_idx" ON "_charity_campaigns_v_version_causes" USING btree ("_parent_id");
  CREATE INDEX "_charity_campaigns_v_version_causes_image_idx" ON "_charity_campaigns_v_version_causes" USING btree ("image_id");
  CREATE INDEX "_charity_campaigns_v_version_partners_order_idx" ON "_charity_campaigns_v_version_partners" USING btree ("_order");
  CREATE INDEX "_charity_campaigns_v_version_partners_parent_id_idx" ON "_charity_campaigns_v_version_partners" USING btree ("_parent_id");
  CREATE INDEX "_charity_campaigns_v_version_impact_items_order_idx" ON "_charity_campaigns_v_version_impact_items" USING btree ("_order");
  CREATE INDEX "_charity_campaigns_v_version_impact_items_parent_id_idx" ON "_charity_campaigns_v_version_impact_items" USING btree ("_parent_id");
  CREATE INDEX "_charity_campaigns_v_parent_idx" ON "_charity_campaigns_v" USING btree ("parent_id");
  CREATE INDEX "_charity_campaigns_v_version_version_hero_image_idx" ON "_charity_campaigns_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_charity_campaigns_v_version_version_updated_at_idx" ON "_charity_campaigns_v" USING btree ("version_updated_at");
  CREATE INDEX "_charity_campaigns_v_version_version_created_at_idx" ON "_charity_campaigns_v" USING btree ("version_created_at");
  CREATE INDEX "_charity_campaigns_v_version_version__status_idx" ON "_charity_campaigns_v" USING btree ("version__status");
  CREATE INDEX "_charity_campaigns_v_created_at_idx" ON "_charity_campaigns_v" USING btree ("created_at");
  CREATE INDEX "_charity_campaigns_v_updated_at_idx" ON "_charity_campaigns_v" USING btree ("updated_at");
  CREATE INDEX "_charity_campaigns_v_latest_idx" ON "_charity_campaigns_v" USING btree ("latest");
  CREATE INDEX "_charity_campaigns_v_autosave_idx" ON "_charity_campaigns_v" USING btree ("autosave");
  CREATE INDEX "_charity_campaigns_v_rels_order_idx" ON "_charity_campaigns_v_rels" USING btree ("order");
  CREATE INDEX "_charity_campaigns_v_rels_parent_idx" ON "_charity_campaigns_v_rels" USING btree ("parent_id");
  CREATE INDEX "_charity_campaigns_v_rels_path_idx" ON "_charity_campaigns_v_rels" USING btree ("path");
  CREATE INDEX "_charity_campaigns_v_rels_events_id_idx" ON "_charity_campaigns_v_rels" USING btree ("events_id");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "charity_hub_hero_image_idx" ON "charity_hub" USING btree ("hero_image_id");
  CREATE INDEX "charity_hub__status_idx" ON "charity_hub" USING btree ("_status");
  CREATE INDEX "_charity_hub_v_version_version_hero_image_idx" ON "_charity_hub_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_charity_hub_v_version_version__status_idx" ON "_charity_hub_v" USING btree ("version__status");
  CREATE INDEX "_charity_hub_v_created_at_idx" ON "_charity_hub_v" USING btree ("created_at");
  CREATE INDEX "_charity_hub_v_updated_at_idx" ON "_charity_hub_v" USING btree ("updated_at");
  CREATE INDEX "_charity_hub_v_latest_idx" ON "_charity_hub_v" USING btree ("latest");
  CREATE INDEX "_charity_hub_v_autosave_idx" ON "_charity_hub_v" USING btree ("autosave");
  ALTER TABLE "media" ADD CONSTRAINT "media_uploaded_by_id_execs_id_fk" FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."execs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_charity_owner_id_execs_id_fk" FOREIGN KEY ("charity_owner_id") REFERENCES "public"."execs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_charity_campaigns_fk" FOREIGN KEY ("charity_campaigns_id") REFERENCES "public"."charity_campaigns"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_charity_media_idx" ON "media" USING btree ("charity_media");
  CREATE INDEX "media_uploaded_by_idx" ON "media" USING btree ("uploaded_by_id");
  CREATE INDEX "events_charity_managed_idx" ON "events" USING btree ("charity_managed");
  CREATE INDEX "events_charity_owner_idx" ON "events" USING btree ("charity_owner_id");
  CREATE INDEX "payload_locked_documents_rels_charity_campaigns_id_idx" ON "payload_locked_documents_rels" USING btree ("charity_campaigns_id");
  `)

  // Preserve the former hardcoded Charity Week content as an unpublished
  // review draft. Nothing here is presented publicly until an editor verifies
  // the dates, goal, causes, partner, links, and campaign phase and publishes it.
  await db.execute(sql`
    WITH inserted AS (
      INSERT INTO "charity_campaigns" (
        "title",
        "campaign_type",
        "year",
        "phase",
        "summary",
        "fundraising_currency",
        "fundraising_goal",
        "fundraising_amount_state",
        "featured",
        "display_order",
        "_status",
        "created_at",
        "updated_at"
      )
      SELECT
        'Charity Week 2026',
        'charity-week',
        2026,
        'upcoming',
        'An international, student-led campaign supporting orphans and children in need through a shared campus fundraising effort.',
        'CAD',
        25000,
        'unknown',
        false,
        100,
        'draft',
        now(),
        now()
      WHERE NOT EXISTS (
        SELECT 1 FROM "charity_campaigns"
        WHERE "campaign_type" = 'charity-week' AND "year" = 2026
      )
      RETURNING "id"
    )
    INSERT INTO "charity_campaigns_causes" (
      "_order", "_parent_id", "id", "name", "description"
    )
    SELECT 1, "id", 'cw-2026-palestine', 'Gaza, Palestine',
      'Previously described as supporting maternal and newborn health, specialized care for children, and cochlear implants. Requires verification before publication.'
    FROM inserted
    UNION ALL
    SELECT 2, "id", 'cw-2026-sudan', 'Sudan',
      'Previously described as supporting food, shelter, hospitals, classrooms, clean water, and sanitation. Requires verification before publication.'
    FROM inserted
    UNION ALL
    SELECT 3, "id", 'cw-2026-bangladesh', 'Bangladesh',
      'Previously described as supporting shelters and education for displaced Rohingya families and children. Requires verification before publication.'
    FROM inserted;

    INSERT INTO "charity_campaigns_partners" (
      "_order", "_parent_id", "id", "name", "description"
    )
    SELECT 1, "id", 'cw-2026-islamic-relief-canada', 'Islamic Relief Canada',
      'Partner named on the former hardcoded campaign page. Confirm the relationship and approved partner link before publication.'
    FROM "charity_campaigns"
    WHERE "campaign_type" = 'charity-week' AND "year" = 2026
      AND NOT EXISTS (
        SELECT 1 FROM "charity_campaigns_partners"
        WHERE "id" = 'cw-2026-islamic-relief-canada'
      );

    INSERT INTO "charity_hub" (
      "eyebrow", "title", "introduction", "instagram_u_r_l", "_status", "created_at", "updated_at"
    )
    SELECT
      'WLU MSA Charity',
      'Care in action, all year long.',
      'WLU MSA Charity brings students together to support responsible, community-led charitable work. Publish current campaigns, events, and verified results here after review.',
      'https://www.instagram.com/wlumsa.charity/',
      'draft',
      now(),
      now()
    WHERE NOT EXISTS (SELECT 1 FROM "charity_hub");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "charity_campaigns_causes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "charity_campaigns_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "charity_campaigns_impact_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "charity_campaigns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "charity_campaigns_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_charity_campaigns_v_version_causes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_charity_campaigns_v_version_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_charity_campaigns_v_version_impact_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_charity_campaigns_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_charity_campaigns_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "charity_hub" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_charity_hub_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "charity_campaigns_causes" CASCADE;
  DROP TABLE "charity_campaigns_partners" CASCADE;
  DROP TABLE "charity_campaigns_impact_items" CASCADE;
  DROP TABLE "charity_campaigns" CASCADE;
  DROP TABLE "charity_campaigns_rels" CASCADE;
  DROP TABLE "_charity_campaigns_v_version_causes" CASCADE;
  DROP TABLE "_charity_campaigns_v_version_partners" CASCADE;
  DROP TABLE "_charity_campaigns_v_version_impact_items" CASCADE;
  DROP TABLE "_charity_campaigns_v" CASCADE;
  DROP TABLE "_charity_campaigns_v_rels" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "charity_hub" CASCADE;
  DROP TABLE "_charity_hub_v" CASCADE;
  ALTER TABLE "media" DROP CONSTRAINT "media_uploaded_by_id_execs_id_fk";

  ALTER TABLE "events" DROP CONSTRAINT "events_charity_owner_id_execs_id_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_charity_campaigns_fk";

  ALTER TABLE "execs" ALTER COLUMN "department" SET DATA TYPE text;
  DROP TYPE "public"."enum_execs_department";
  CREATE TYPE "public"."enum_execs_department" AS ENUM('marketing', 'events_brothers', 'events_sisters', 'religious_affairs_brothers', 'religious_affairs_sisters', 'finance', 'community_engagement', 'operations', 'technology');
  ALTER TABLE "execs" ALTER COLUMN "department" SET DATA TYPE "public"."enum_execs_department" USING "department"::"public"."enum_execs_department";
  UPDATE "execs" SET "roles" = 'editor' WHERE "roles" = 'charity_editor';
  ALTER TABLE "execs" ALTER COLUMN "roles" SET DATA TYPE text;
  DROP TYPE "public"."enum_execs_roles";
  CREATE TYPE "public"."enum_execs_roles" AS ENUM('admin', 'manager', 'editor');
  ALTER TABLE "execs" ALTER COLUMN "roles" SET DATA TYPE "public"."enum_execs_roles" USING "roles"::"public"."enum_execs_roles";
  ALTER TABLE "events_departments" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_events_departments";
  CREATE TYPE "public"."enum_events_departments" AS ENUM('marketing', 'events_brothers', 'events_sisters', 'religious_affairs_brothers', 'religious_affairs_sisters', 'finance', 'community_engagement', 'operations', 'technology');
  ALTER TABLE "events_departments" ALTER COLUMN "value" SET DATA TYPE "public"."enum_events_departments" USING "value"::"public"."enum_events_departments";
  ALTER TABLE "event_tasks" ALTER COLUMN "department" SET DATA TYPE text;
  DROP TYPE "public"."enum_event_tasks_department";
  CREATE TYPE "public"."enum_event_tasks_department" AS ENUM('marketing', 'events_brothers', 'events_sisters', 'religious_affairs_brothers', 'religious_affairs_sisters', 'finance', 'community_engagement', 'operations', 'technology');
  ALTER TABLE "event_tasks" ALTER COLUMN "department" SET DATA TYPE "public"."enum_event_tasks_department" USING "department"::"public"."enum_event_tasks_department";
  ALTER TABLE "content_schedule" ALTER COLUMN "department" SET DATA TYPE text;
  ALTER TABLE "content_schedule" ALTER COLUMN "department" SET DEFAULT 'marketing'::text;
  DROP TYPE "public"."enum_content_schedule_department";
  CREATE TYPE "public"."enum_content_schedule_department" AS ENUM('marketing', 'events_brothers', 'events_sisters', 'religious_affairs_brothers', 'religious_affairs_sisters', 'finance', 'community_engagement', 'operations', 'technology');
  ALTER TABLE "content_schedule" ALTER COLUMN "department" SET DEFAULT 'marketing'::"public"."enum_content_schedule_department";
  ALTER TABLE "content_schedule" ALTER COLUMN "department" SET DATA TYPE "public"."enum_content_schedule_department" USING "department"::"public"."enum_content_schedule_department";
  DROP INDEX "media_charity_media_idx";
  DROP INDEX "media_uploaded_by_idx";
  DROP INDEX "events_charity_managed_idx";
  DROP INDEX "events_charity_owner_idx";
  DROP INDEX "payload_locked_documents_rels_charity_campaigns_id_idx";
  ALTER TABLE "media" DROP COLUMN "charity_media";
  ALTER TABLE "media" DROP COLUMN "uploaded_by_id";
  ALTER TABLE "events" DROP COLUMN "charity_managed";
  ALTER TABLE "events" DROP COLUMN "charity_owner_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "charity_campaigns_id";
  DROP TYPE "public"."enum_charity_campaigns_campaign_type";
  DROP TYPE "public"."enum_charity_campaigns_phase";
  DROP TYPE "public"."enum_charity_campaigns_fundraising_currency";
  DROP TYPE "public"."enum_charity_campaigns_fundraising_amount_state";
  DROP TYPE "public"."enum_charity_campaigns_status";
  DROP TYPE "public"."enum__charity_campaigns_v_version_campaign_type";
  DROP TYPE "public"."enum__charity_campaigns_v_version_phase";
  DROP TYPE "public"."enum__charity_campaigns_v_version_fundraising_currency";
  DROP TYPE "public"."enum__charity_campaigns_v_version_fundraising_amount_state";
  DROP TYPE "public"."enum__charity_campaigns_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_charity_hub_status";
  DROP TYPE "public"."enum__charity_hub_v_version_status";`)
}
