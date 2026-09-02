import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_events_departments" AS ENUM('marketing', 'events_brothers', 'events_sisters', 'religious_affairs_brothers', 'religious_affairs_sisters', 'finance', 'community_engagement', 'operations', 'technology');
    CREATE TYPE "public"."enum_events_planning_template" AS ENUM('standard', 'none');
    CREATE TYPE "public"."enum_event_tasks_status" AS ENUM('not_started', 'in_progress', 'ready_for_review', 'done');
    CREATE TYPE "public"."enum_event_tasks_department" AS ENUM('marketing', 'events_brothers', 'events_sisters', 'religious_affairs_brothers', 'religious_affairs_sisters', 'finance', 'community_engagement', 'operations', 'technology');
    CREATE TYPE "public"."enum_content_schedule_format" AS ENUM('instagram_feed', 'instagram_story', 'email', 'other');
    CREATE TYPE "public"."enum_content_schedule_status" AS ENUM('not_started', 'in_progress', 'ready_for_review', 'done');
    CREATE TYPE "public"."enum_content_schedule_department" AS ENUM('marketing', 'events_brothers', 'events_sisters', 'religious_affairs_brothers', 'religious_affairs_sisters', 'finance', 'community_engagement', 'operations', 'technology');

    CREATE TABLE "events_departments" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum_events_departments",
      "id" serial PRIMARY KEY NOT NULL
    );

    CREATE TABLE "event_tasks" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "event_id" integer NOT NULL,
      "due_date" timestamp(3) with time zone NOT NULL,
      "status" "enum_event_tasks_status" DEFAULT 'not_started' NOT NULL,
      "department" "enum_event_tasks_department",
      "notes" varchar,
      "created_from_template" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "event_tasks_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "execs_id" integer
    );

    CREATE TABLE "content_schedule" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "event_id" integer NOT NULL,
      "scheduled_for" timestamp(3) with time zone NOT NULL,
      "format" "enum_content_schedule_format" DEFAULT 'instagram_story' NOT NULL,
      "status" "enum_content_schedule_status" DEFAULT 'not_started' NOT NULL,
      "department" "enum_content_schedule_department" DEFAULT 'marketing',
      "created_from_template" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "content_schedule_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "execs_id" integer
    );

    ALTER TABLE "events" ADD COLUMN "planning_lead_id" integer;
    ALTER TABLE "events" ADD COLUMN "planning_template" "enum_events_planning_template" DEFAULT 'standard';
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "event_tasks_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "content_schedule_id" integer;

    ALTER TABLE "events_departments" ADD CONSTRAINT "events_departments_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "event_tasks" ADD CONSTRAINT "event_tasks_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "event_tasks_rels" ADD CONSTRAINT "event_tasks_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."event_tasks"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "event_tasks_rels" ADD CONSTRAINT "event_tasks_rels_execs_fk" FOREIGN KEY ("execs_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "content_schedule" ADD CONSTRAINT "content_schedule_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "content_schedule_rels" ADD CONSTRAINT "content_schedule_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."content_schedule"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "content_schedule_rels" ADD CONSTRAINT "content_schedule_rels_execs_fk" FOREIGN KEY ("execs_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "events" ADD CONSTRAINT "events_planning_lead_id_execs_id_fk" FOREIGN KEY ("planning_lead_id") REFERENCES "public"."execs"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_tasks_fk" FOREIGN KEY ("event_tasks_id") REFERENCES "public"."event_tasks"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_schedule_fk" FOREIGN KEY ("content_schedule_id") REFERENCES "public"."content_schedule"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "events_departments_order_idx" ON "events_departments" USING btree ("order");
    CREATE INDEX "events_departments_parent_idx" ON "events_departments" USING btree ("parent_id");
    CREATE INDEX "event_tasks_event_idx" ON "event_tasks" USING btree ("event_id");
    CREATE INDEX "event_tasks_due_date_idx" ON "event_tasks" USING btree ("due_date");
    CREATE INDEX "event_tasks_status_idx" ON "event_tasks" USING btree ("status");
    CREATE INDEX "event_tasks_updated_at_idx" ON "event_tasks" USING btree ("updated_at");
    CREATE INDEX "event_tasks_created_at_idx" ON "event_tasks" USING btree ("created_at");
    CREATE INDEX "event_tasks_rels_order_idx" ON "event_tasks_rels" USING btree ("order");
    CREATE INDEX "event_tasks_rels_parent_idx" ON "event_tasks_rels" USING btree ("parent_id");
    CREATE INDEX "event_tasks_rels_path_idx" ON "event_tasks_rels" USING btree ("path");
    CREATE INDEX "event_tasks_rels_execs_id_idx" ON "event_tasks_rels" USING btree ("execs_id");
    CREATE INDEX "content_schedule_event_idx" ON "content_schedule" USING btree ("event_id");
    CREATE INDEX "content_schedule_scheduled_for_idx" ON "content_schedule" USING btree ("scheduled_for");
    CREATE INDEX "content_schedule_status_idx" ON "content_schedule" USING btree ("status");
    CREATE INDEX "content_schedule_updated_at_idx" ON "content_schedule" USING btree ("updated_at");
    CREATE INDEX "content_schedule_created_at_idx" ON "content_schedule" USING btree ("created_at");
    CREATE INDEX "content_schedule_rels_order_idx" ON "content_schedule_rels" USING btree ("order");
    CREATE INDEX "content_schedule_rels_parent_idx" ON "content_schedule_rels" USING btree ("parent_id");
    CREATE INDEX "content_schedule_rels_path_idx" ON "content_schedule_rels" USING btree ("path");
    CREATE INDEX "content_schedule_rels_execs_id_idx" ON "content_schedule_rels" USING btree ("execs_id");
    CREATE INDEX "events_planning_lead_idx" ON "events" USING btree ("planning_lead_id");
    CREATE INDEX "payload_locked_documents_rels_event_tasks_id_idx" ON "payload_locked_documents_rels" USING btree ("event_tasks_id");
    CREATE INDEX "payload_locked_documents_rels_content_schedule_id_idx" ON "payload_locked_documents_rels" USING btree ("content_schedule_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events" DROP CONSTRAINT "events_planning_lead_id_execs_id_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_event_tasks_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_content_schedule_fk";
    DROP INDEX "events_planning_lead_idx";
    DROP INDEX "payload_locked_documents_rels_event_tasks_id_idx";
    DROP INDEX "payload_locked_documents_rels_content_schedule_id_idx";

    ALTER TABLE "events_departments" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "event_tasks" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "event_tasks_rels" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "content_schedule" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "content_schedule_rels" DISABLE ROW LEVEL SECURITY;
    DROP TABLE "events_departments" CASCADE;
    DROP TABLE "event_tasks" CASCADE;
    DROP TABLE "event_tasks_rels" CASCADE;
    DROP TABLE "content_schedule" CASCADE;
    DROP TABLE "content_schedule_rels" CASCADE;

    ALTER TABLE "events" DROP COLUMN "planning_lead_id";
    ALTER TABLE "events" DROP COLUMN "planning_template";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "event_tasks_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "content_schedule_id";

    DROP TYPE "public"."enum_events_departments";
    DROP TYPE "public"."enum_events_planning_template";
    DROP TYPE "public"."enum_event_tasks_status";
    DROP TYPE "public"."enum_event_tasks_department";
    DROP TYPE "public"."enum_content_schedule_format";
    DROP TYPE "public"."enum_content_schedule_status";
    DROP TYPE "public"."enum_content_schedule_department";
  `);
}
