import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "weekly_prayer_timings_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date_iso" varchar NOT NULL,
  	"weekday" varchar NOT NULL,
  	"fajr" varchar NOT NULL,
  	"fajr_iqamah" varchar,
  	"sunrise" varchar NOT NULL,
  	"dhuhr" varchar NOT NULL,
  	"dhuhr_iqamah" varchar,
  	"asr" varchar NOT NULL,
  	"asr_iqamah" varchar,
  	"maghrib" varchar NOT NULL,
  	"maghrib_iqamah" varchar,
  	"isha" varchar NOT NULL,
  	"isha_iqamah" varchar,
  	"jumuah_khutbah" varchar
  );
  
  CREATE TABLE "weekly_prayer_timings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"week_label" varchar NOT NULL,
  	"week_start" timestamp(3) with time zone NOT NULL,
  	"week_end" timestamp(3) with time zone NOT NULL,
  	"source_url" varchar NOT NULL,
  	"fetched_at" timestamp(3) with time zone NOT NULL,
  	"raw_snapshot" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  ALTER TABLE "roommate_posts_utilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roommate_posts_amenities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roommate_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roommate_posts_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "general_user" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "roommate_posts_utilities" CASCADE;
  DROP TABLE "roommate_posts_amenities" CASCADE;
  DROP TABLE "roommate_posts" CASCADE;
  DROP TABLE "roommate_posts_texts" CASCADE;
  DROP TABLE "comments" CASCADE;
  DROP TABLE "general_user" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_roommate_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_comments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_general_user_fk";
  
  DROP INDEX "payload_locked_documents_rels_roommate_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_comments_id_idx";
  DROP INDEX "payload_locked_documents_rels_general_user_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "weekly_prayer_timings_id" integer;
  ALTER TABLE "weekly_prayer_timings_rows" ADD CONSTRAINT "weekly_prayer_timings_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."weekly_prayer_timings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "weekly_prayer_timings_rows_order_idx" ON "weekly_prayer_timings_rows" USING btree ("_order");
  CREATE INDEX "weekly_prayer_timings_rows_parent_id_idx" ON "weekly_prayer_timings_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "weekly_prayer_timings_week_label_idx" ON "weekly_prayer_timings" USING btree ("week_label");
  CREATE INDEX "weekly_prayer_timings_week_start_idx" ON "weekly_prayer_timings" USING btree ("week_start");
  CREATE INDEX "weekly_prayer_timings_updated_at_idx" ON "weekly_prayer_timings" USING btree ("updated_at");
  CREATE INDEX "weekly_prayer_timings_created_at_idx" ON "weekly_prayer_timings" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_weekly_prayer_timings_fk" FOREIGN KEY ("weekly_prayer_timings_id") REFERENCES "public"."weekly_prayer_timings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_weekly_prayer_timings_id_idx" ON "payload_locked_documents_rels" USING btree ("weekly_prayer_timings_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "roommate_posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "comments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "general_user_id";
  DROP TYPE "public"."enum_roommate_posts_utilities";
  DROP TYPE "public"."enum_roommate_posts_amenities";
  DROP TYPE "public"."enum_roommate_posts_gender";
  DROP TYPE "public"."enum_roommate_posts_property_type";
  DROP TYPE "public"."enum_roommate_posts_furnishing_type";
  DROP TYPE "public"."enum_roommate_posts_status";
  DROP TYPE "public"."enum_general_user_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_roommate_posts_utilities" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_roommate_posts_amenities" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_roommate_posts_gender" AS ENUM('1', '2');
  CREATE TYPE "public"."enum_roommate_posts_property_type" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_roommate_posts_furnishing_type" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_roommate_posts_status" AS ENUM('pending', 'approved');
  CREATE TYPE "public"."enum_general_user_category" AS ENUM('student', 'landlord', 'parent', 'business', 'alumni');
  CREATE TABLE "roommate_posts_utilities" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_roommate_posts_utilities",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "roommate_posts_amenities" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_roommate_posts_amenities",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "roommate_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id_id" integer NOT NULL,
  	"author" varchar,
  	"email" varchar,
  	"contact_email" boolean DEFAULT false NOT NULL,
  	"title" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"rent" numeric NOT NULL,
  	"deposit" numeric,
  	"gender" "enum_roommate_posts_gender" NOT NULL,
  	"property_type" "enum_roommate_posts_property_type" NOT NULL,
  	"furnishing_type" "enum_roommate_posts_furnishing_type" NOT NULL,
  	"available_date" timestamp(3) with time zone NOT NULL,
  	"facebook" varchar,
  	"phone_number" varchar,
  	"instagram" varchar,
  	"whatsapp" varchar,
  	"status" "enum_roommate_posts_status" DEFAULT 'approved',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "roommate_posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "comments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"comment" varchar,
  	"post_id_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "general_user" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"clerk_id" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"category" "enum_general_user_category",
  	"laurier_email" varchar,
  	"student_id" varchar,
  	"year" varchar,
  	"program" varchar,
  	"newsletter" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "weekly_prayer_timings_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "weekly_prayer_timings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "weekly_prayer_timings_rows" CASCADE;
  DROP TABLE "weekly_prayer_timings" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_weekly_prayer_timings_fk";
  
  DROP INDEX "payload_locked_documents_rels_weekly_prayer_timings_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "roommate_posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "comments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "general_user_id" integer;
  ALTER TABLE "roommate_posts_utilities" ADD CONSTRAINT "roommate_posts_utilities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roommate_posts_amenities" ADD CONSTRAINT "roommate_posts_amenities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roommate_posts" ADD CONSTRAINT "roommate_posts_user_id_id_general_user_id_fk" FOREIGN KEY ("user_id_id") REFERENCES "public"."general_user"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "roommate_posts_texts" ADD CONSTRAINT "roommate_posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_id_roommate_posts_id_fk" FOREIGN KEY ("post_id_id") REFERENCES "public"."roommate_posts"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "roommate_posts_utilities_order_idx" ON "roommate_posts_utilities" USING btree ("order");
  CREATE INDEX "roommate_posts_utilities_parent_idx" ON "roommate_posts_utilities" USING btree ("parent_id");
  CREATE INDEX "roommate_posts_amenities_order_idx" ON "roommate_posts_amenities" USING btree ("order");
  CREATE INDEX "roommate_posts_amenities_parent_idx" ON "roommate_posts_amenities" USING btree ("parent_id");
  CREATE INDEX "roommate_posts_user_id_idx" ON "roommate_posts" USING btree ("user_id_id");
  CREATE INDEX "roommate_posts_updated_at_idx" ON "roommate_posts" USING btree ("updated_at");
  CREATE INDEX "roommate_posts_created_at_idx" ON "roommate_posts" USING btree ("created_at");
  CREATE INDEX "roommate_posts_texts_order_parent_idx" ON "roommate_posts_texts" USING btree ("order","parent_id");
  CREATE INDEX "comments_post_id_idx" ON "comments" USING btree ("post_id_id");
  CREATE INDEX "comments_updated_at_idx" ON "comments" USING btree ("updated_at");
  CREATE INDEX "comments_created_at_idx" ON "comments" USING btree ("created_at");
  CREATE UNIQUE INDEX "general_user_clerk_id_idx" ON "general_user" USING btree ("clerk_id");
  CREATE UNIQUE INDEX "general_user_email_idx" ON "general_user" USING btree ("email");
  CREATE INDEX "general_user_updated_at_idx" ON "general_user" USING btree ("updated_at");
  CREATE INDEX "general_user_created_at_idx" ON "general_user" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roommate_posts_fk" FOREIGN KEY ("roommate_posts_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_general_user_fk" FOREIGN KEY ("general_user_id") REFERENCES "public"."general_user"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_roommate_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("roommate_posts_id");
  CREATE INDEX "payload_locked_documents_rels_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("comments_id");
  CREATE INDEX "payload_locked_documents_rels_general_user_id_idx" ON "payload_locked_documents_rels" USING btree ("general_user_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "weekly_prayer_timings_id";`)
}
