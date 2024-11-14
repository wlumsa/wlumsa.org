import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_execs_department" AS ENUM('marketing', 'events_brothers', 'events_sisters', 'religious_affairs_brothers', 'religious_affairs_sisters', 'finance', 'community_engagement', 'operations', 'technology');
  CREATE TYPE "public"."enum_execs_position" AS ENUM('vice_president', 'head_director', 'director');
  CREATE TYPE "public"."enum_execs_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_sizes_size" AS ENUM('Small', 'Medium', 'Large');
  CREATE TYPE "public"."enum_weekly_events_day" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  CREATE TYPE "public"."enum_email_collection_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_halal_directory_category" AS ENUM('chinese', 'persian', 'shawarma', 'burgers', 'bangladeshi', 'chinese-indo-fusion', 'pakistani-food', 'chicken-and-waffles', 'kabob', 'uyghur', 'chicken', 'indian-fusion-food', 'pizza');
  CREATE TYPE "public"."enum_halal_directory_slaughtered" AS ENUM('hand', 'machine', 'both', 'n/a');
  CREATE TYPE "public"."enum_prayer_timings_month_month" AS ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  CREATE TABLE IF NOT EXISTS "execs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"department" "enum_execs_department",
  	"position" "enum_execs_position",
  	"student_id" numeric,
  	"major" varchar,
  	"year" numeric,
  	"phone_number" numeric,
  	"mylaurier_email" varchar,
  	"city" varchar,
  	"roles" "enum_execs_roles",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "link" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "instagram" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resources_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"link_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"mylaurier_email" varchar NOT NULL,
  	"student_id" varchar,
  	"newsletter" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"link_id" integer NOT NULL,
  	"icon" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"desc" varchar NOT NULL,
  	"tags_id" integer NOT NULL,
  	"sizes_id" integer,
  	"quantity" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"content" jsonb NOT NULL,
  	"categories_id" integer NOT NULL,
  	"status" "enum_posts_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"tags_id" integer,
  	"execs_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"color" varchar DEFAULT '#000000',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "sizes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum_sizes_size" NOT NULL,
  	"quantity" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "weekly_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"day" "enum_weekly_events_day" NOT NULL,
  	"time_start" timestamp(3) with time zone NOT NULL,
  	"time_end" timestamp(3) with time zone NOT NULL,
  	"location" varchar NOT NULL,
  	"caption" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "weekly_events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "jummah_timings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"building" varchar NOT NULL,
  	"room_number" numeric,
  	"timing" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "prayer_rooms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"building" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"room_number" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "email_collection" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subject" varchar,
  	"content" jsonb,
  	"content_html" varchar,
  	"status" "enum_email_collection_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"distribution_list_id" integer,
  	"send" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "email_collection_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "distribution_list" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"list_name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "distribution_list_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"individuals_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "individuals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "iia_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"caption" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "iia_services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "halal_directory" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category" "enum_halal_directory_category" NOT NULL,
  	"slaughtered" "enum_halal_directory_slaughtered",
  	"short_description" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"google_maps_link" varchar NOT NULL,
  	"website" varchar,
  	"image_id" integer,
  	"is_on_campus" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"execs_id" integer,
  	"link_id" integer,
  	"instagram_id" integer,
  	"resources_id" integer,
  	"media_id" integer,
  	"members_id" integer,
  	"socials_id" integer,
  	"products_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"sizes_id" integer,
  	"weekly_events_id" integer,
  	"jummah_timings_id" integer,
  	"prayer_rooms_id" integer,
  	"services_id" integer,
  	"email_collection_id" integer,
  	"distribution_list_id" integer,
  	"individuals_id" integer,
  	"iia_services_id" integer,
  	"faq_id" integer,
  	"halal_directory_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"execs_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "nav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "prayer_timings_month_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" numeric NOT NULL,
  	"fajr" varchar NOT NULL,
  	"fajr_iqamah" varchar,
  	"sunrise" varchar NOT NULL,
  	"dhuhr" varchar NOT NULL,
  	"dhuhr_iqamah" varchar NOT NULL,
  	"asr" varchar NOT NULL,
  	"asr_iqamah" varchar NOT NULL,
  	"maghrib" varchar NOT NULL,
  	"maghrib_iqamah" varchar NOT NULL,
  	"isha" varchar NOT NULL,
  	"isha_iqamah" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "prayer_timings_month" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"month" "enum_prayer_timings_month_month" NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "prayer_timings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_link_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "socials" ADD CONSTRAINT "socials_link_id_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_tags_id_tags_id_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_sizes_id_sizes_id_fk" FOREIGN KEY ("sizes_id") REFERENCES "public"."sizes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_execs_fk" FOREIGN KEY ("execs_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "weekly_events_rels" ADD CONSTRAINT "weekly_events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."weekly_events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "weekly_events_rels" ADD CONSTRAINT "weekly_events_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "services" ADD CONSTRAINT "services_link_id_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "email_collection" ADD CONSTRAINT "email_collection_distribution_list_id_distribution_list_id_fk" FOREIGN KEY ("distribution_list_id") REFERENCES "public"."distribution_list"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "email_collection_rels" ADD CONSTRAINT "email_collection_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."email_collection"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "email_collection_rels" ADD CONSTRAINT "email_collection_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "distribution_list_rels" ADD CONSTRAINT "distribution_list_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."distribution_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "distribution_list_rels" ADD CONSTRAINT "distribution_list_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "iia_services_rels" ADD CONSTRAINT "iia_services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."iia_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "iia_services_rels" ADD CONSTRAINT "iia_services_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "halal_directory" ADD CONSTRAINT "halal_directory_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_execs_fk" FOREIGN KEY ("execs_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_link_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_instagram_fk" FOREIGN KEY ("instagram_id") REFERENCES "public"."instagram"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_socials_fk" FOREIGN KEY ("socials_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sizes_fk" FOREIGN KEY ("sizes_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_weekly_events_fk" FOREIGN KEY ("weekly_events_id") REFERENCES "public"."weekly_events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jummah_timings_fk" FOREIGN KEY ("jummah_timings_id") REFERENCES "public"."jummah_timings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_prayer_rooms_fk" FOREIGN KEY ("prayer_rooms_id") REFERENCES "public"."prayer_rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_collection_fk" FOREIGN KEY ("email_collection_id") REFERENCES "public"."email_collection"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_distribution_list_fk" FOREIGN KEY ("distribution_list_id") REFERENCES "public"."distribution_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_iia_services_fk" FOREIGN KEY ("iia_services_id") REFERENCES "public"."iia_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_halal_directory_fk" FOREIGN KEY ("halal_directory_id") REFERENCES "public"."halal_directory"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_execs_fk" FOREIGN KEY ("execs_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "nav_items_links" ADD CONSTRAINT "nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "nav_items" ADD CONSTRAINT "nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_items_links" ADD CONSTRAINT "footer_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_items" ADD CONSTRAINT "footer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "prayer_timings_month_days" ADD CONSTRAINT "prayer_timings_month_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prayer_timings_month"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "prayer_timings_month" ADD CONSTRAINT "prayer_timings_month_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prayer_timings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "execs_created_at_idx" ON "execs" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "execs_email_idx" ON "execs" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "link_title_idx" ON "link" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "link_created_at_idx" ON "link" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "instagram_created_at_idx" ON "instagram" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "resources_rels_order_idx" ON "resources_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "resources_rels_parent_idx" ON "resources_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "resources_rels_path_idx" ON "resources_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "resources_rels_link_id_idx" ON "resources_rels" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "socials_link_idx" ON "socials" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "socials_created_at_idx" ON "socials" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products_tags_idx" ON "products" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "products_sizes_idx" ON "products" USING btree ("sizes_id");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "posts_categories_idx" ON "posts" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_media_id_idx" ON "posts_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_execs_id_idx" ON "posts_rels" USING btree ("execs_id");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "sizes_created_at_idx" ON "sizes" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "weekly_events_created_at_idx" ON "weekly_events" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "weekly_events_rels_order_idx" ON "weekly_events_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "weekly_events_rels_parent_idx" ON "weekly_events_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "weekly_events_rels_path_idx" ON "weekly_events_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "weekly_events_rels_media_id_idx" ON "weekly_events_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "jummah_timings_created_at_idx" ON "jummah_timings" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "prayer_rooms_created_at_idx" ON "prayer_rooms" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "services_link_idx" ON "services" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "email_collection_distribution_list_idx" ON "email_collection" USING btree ("distribution_list_id");
  CREATE INDEX IF NOT EXISTS "email_collection_created_at_idx" ON "email_collection" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "email_collection_rels_order_idx" ON "email_collection_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "email_collection_rels_parent_idx" ON "email_collection_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "email_collection_rels_path_idx" ON "email_collection_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "email_collection_rels_media_id_idx" ON "email_collection_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "distribution_list_created_at_idx" ON "distribution_list" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "distribution_list_rels_order_idx" ON "distribution_list_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "distribution_list_rels_parent_idx" ON "distribution_list_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "distribution_list_rels_path_idx" ON "distribution_list_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "distribution_list_rels_individuals_id_idx" ON "distribution_list_rels" USING btree ("individuals_id");
  CREATE INDEX IF NOT EXISTS "individuals_created_at_idx" ON "individuals" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "iia_services_created_at_idx" ON "iia_services" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "iia_services_rels_order_idx" ON "iia_services_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "iia_services_rels_parent_idx" ON "iia_services_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "iia_services_rels_path_idx" ON "iia_services_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "iia_services_rels_media_id_idx" ON "iia_services_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "halal_directory_image_idx" ON "halal_directory" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "halal_directory_created_at_idx" ON "halal_directory" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_execs_id_idx" ON "payload_locked_documents_rels" USING btree ("execs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_link_id_idx" ON "payload_locked_documents_rels" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_instagram_id_idx" ON "payload_locked_documents_rels" USING btree ("instagram_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_socials_id_idx" ON "payload_locked_documents_rels" USING btree ("socials_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_sizes_id_idx" ON "payload_locked_documents_rels" USING btree ("sizes_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_weekly_events_id_idx" ON "payload_locked_documents_rels" USING btree ("weekly_events_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_jummah_timings_id_idx" ON "payload_locked_documents_rels" USING btree ("jummah_timings_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_prayer_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("prayer_rooms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_email_collection_id_idx" ON "payload_locked_documents_rels" USING btree ("email_collection_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_distribution_list_id_idx" ON "payload_locked_documents_rels" USING btree ("distribution_list_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_individuals_id_idx" ON "payload_locked_documents_rels" USING btree ("individuals_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_iia_services_id_idx" ON "payload_locked_documents_rels" USING btree ("iia_services_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_halal_directory_id_idx" ON "payload_locked_documents_rels" USING btree ("halal_directory_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_execs_id_idx" ON "payload_preferences_rels" USING btree ("execs_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "nav_items_links_order_idx" ON "nav_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "nav_items_links_parent_id_idx" ON "nav_items_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "nav_items_links_title_idx" ON "nav_items_links" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "nav_items_order_idx" ON "nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "nav_items_parent_id_idx" ON "nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "nav_items_label_idx" ON "nav_items" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "footer_items_links_order_idx" ON "footer_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_items_links_parent_id_idx" ON "footer_items_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_items_links_title_idx" ON "footer_items_links" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "footer_items_order_idx" ON "footer_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_items_parent_id_idx" ON "footer_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_items_label_idx" ON "footer_items" USING btree ("label");
  CREATE INDEX IF NOT EXISTS "prayer_timings_month_days_order_idx" ON "prayer_timings_month_days" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "prayer_timings_month_days_parent_id_idx" ON "prayer_timings_month_days" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "prayer_timings_month_order_idx" ON "prayer_timings_month" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "prayer_timings_month_parent_id_idx" ON "prayer_timings_month" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "prayer_timings_month_month_idx" ON "prayer_timings_month" USING btree ("month");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "execs";
  DROP TABLE "link";
  DROP TABLE "instagram";
  DROP TABLE "resources";
  DROP TABLE "resources_rels";
  DROP TABLE "media";
  DROP TABLE "members";
  DROP TABLE "socials";
  DROP TABLE "products";
  DROP TABLE "products_rels";
  DROP TABLE "posts";
  DROP TABLE "posts_rels";
  DROP TABLE "categories";
  DROP TABLE "tags";
  DROP TABLE "sizes";
  DROP TABLE "weekly_events";
  DROP TABLE "weekly_events_rels";
  DROP TABLE "jummah_timings";
  DROP TABLE "prayer_rooms";
  DROP TABLE "services";
  DROP TABLE "email_collection";
  DROP TABLE "email_collection_rels";
  DROP TABLE "distribution_list";
  DROP TABLE "distribution_list_rels";
  DROP TABLE "individuals";
  DROP TABLE "iia_services";
  DROP TABLE "iia_services_rels";
  DROP TABLE "faq";
  DROP TABLE "halal_directory";
  DROP TABLE "payload_locked_documents";
  DROP TABLE "payload_locked_documents_rels";
  DROP TABLE "payload_preferences";
  DROP TABLE "payload_preferences_rels";
  DROP TABLE "payload_migrations";
  DROP TABLE "nav_items_links";
  DROP TABLE "nav_items";
  DROP TABLE "nav";
  DROP TABLE "footer_items_links";
  DROP TABLE "footer_items";
  DROP TABLE "footer";
  DROP TABLE "prayer_timings_month_days";
  DROP TABLE "prayer_timings_month";
  DROP TABLE "prayer_timings";
  DROP TYPE "public"."enum_execs_department";
  DROP TYPE "public"."enum_execs_position";
  DROP TYPE "public"."enum_execs_roles";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_sizes_size";
  DROP TYPE "public"."enum_weekly_events_day";
  DROP TYPE "public"."enum_email_collection_status";
  DROP TYPE "public"."enum_halal_directory_category";
  DROP TYPE "public"."enum_halal_directory_slaughtered";
  DROP TYPE "public"."enum_prayer_timings_month_month";`)
}
