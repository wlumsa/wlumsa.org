import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_execs_department" AS ENUM('marketing', 'events_brothers', 'events_sisters', 'religious_affairs_brothers', 'religious_affairs_sisters', 'finance', 'community_engagement', 'operations', 'technology');
  CREATE TYPE "public"."enum_execs_position" AS ENUM('vice_president', 'head_director', 'director');
  CREATE TYPE "public"."enum_execs_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_resources_category" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_sizes_size" AS ENUM('Small', 'Medium', 'Large');
  CREATE TYPE "public"."enum_recording_category" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_weekly_events_day" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  CREATE TYPE "public"."enum_email_collection_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_halal_directory_category" AS ENUM('chinese', 'persian', 'shawarma', 'burgers', 'bangladeshi', 'chinese-indo-fusion', 'pakistani-food', 'chicken-and-waffles', 'kabob', 'uyghur', 'chicken', 'indian-fusion-food', 'pizza');
  CREATE TYPE "public"."enum_halal_directory_slaughtered" AS ENUM('hand', 'machine', 'both', 'n/a');
  CREATE TYPE "public"."enum_roommate_posts_utilities" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_roommate_posts_amenities" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_roommate_posts_gender" AS ENUM('1', '2');
  CREATE TYPE "public"."enum_roommate_posts_property_type" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_roommate_posts_furnishing_type" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_roommate_posts_status" AS ENUM('pending', 'approved');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_general_user_category" AS ENUM('student', 'landlord', 'parent', 'business', 'alumni');
  CREATE TYPE "public"."enum_halal_grocery_stores_category" AS ENUM('full-grocery', 'halal-meat', 'international', 'specialty', 'convenience', 'bakery', 'spice', 'frozen');
  CREATE TYPE "public"."enum_halal_grocery_stores_halal_certification" AS ENUM('certified', 'muslim-owned', 'halal-friendly', 'not-specified');
  CREATE TYPE "public"."enum_halal_grocery_stores_price_range" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_forms_blocks_payment_price_conditions_condition" AS ENUM('hasValue', 'equals', 'notEquals');
  CREATE TYPE "public"."enum_forms_blocks_payment_price_conditions_operator" AS ENUM('add', 'subtract', 'multiply', 'divide');
  CREATE TYPE "public"."enum_forms_blocks_payment_price_conditions_value_type" AS ENUM('static', 'valueOfField');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_form_submissions_payment_status" AS ENUM('pending', 'paid', 'cancelled', 'refunded');
  CREATE TYPE "public"."enum_prayer_timings_month_month" AS ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  CREATE TABLE "execs_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "execs" (
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
  
  CREATE TABLE "link" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "instagram" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" "enum_resources_category" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resources_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"link_id" integer
  );
  
  CREATE TABLE "media" (
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
  
  CREATE TABLE "members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"mylaurier_email" varchar NOT NULL,
  	"student_id" varchar,
  	"newsletter" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"link_id" integer NOT NULL,
  	"icon" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products" (
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
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "posts" (
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
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"tags_id" integer,
  	"execs_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"color" varchar DEFAULT '#000000',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sizes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum_sizes_size" NOT NULL,
  	"quantity" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "recording" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar NOT NULL,
  	"category" "enum_recording_category" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "weekly_events" (
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
  
  CREATE TABLE "weekly_events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "jummah_timings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"building" varchar NOT NULL,
  	"room_number" numeric,
  	"timing" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "prayer_rooms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"building" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"room_number" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "email_collection" (
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
  
  CREATE TABLE "email_collection_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "distribution_list" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"list_name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "distribution_list_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"individuals_id" integer
  );
  
  CREATE TABLE "individuals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "iia_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"caption" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "iia_services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "halal_directory" (
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
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"date" timestamp(3) with time zone,
  	"time" varchar,
  	"location" varchar,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"link" varchar,
  	"status" "enum_events_status" DEFAULT 'draft',
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
  
  CREATE TABLE "daily_reminders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"arabic" varchar NOT NULL,
  	"english" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "halal_grocery_stores_specialties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"specialty" varchar NOT NULL
  );
  
  CREATE TABLE "halal_grocery_stores" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category" "enum_halal_grocery_stores_category" NOT NULL,
  	"halal_certification" "enum_halal_grocery_stores_halal_certification" NOT NULL,
  	"short_description" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"google_maps_link" varchar NOT NULL,
  	"website" varchar,
  	"phone" varchar,
  	"hours" varchar,
  	"image_id" integer,
  	"is_on_campus" boolean DEFAULT false NOT NULL,
  	"price_range" "enum_halal_grocery_stores_price_range",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_blocks_checkbox_checkboxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"limit" numeric,
  	"value" boolean
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"width" numeric DEFAULT 0,
  	"is_multiple_choice" boolean DEFAULT 'false',
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_payment_price_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_to_use" varchar,
  	"condition" "enum_forms_blocks_payment_price_conditions_condition" DEFAULT 'hasValue',
  	"value_for_condition" varchar,
  	"operator" "enum_forms_blocks_payment_price_conditions_operator" DEFAULT 'add',
  	"value_type" "enum_forms_blocks_payment_price_conditions_value_type" DEFAULT 'static',
  	"value_for_operator" varchar
  );
  
  CREATE TABLE "forms_blocks_payment" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"base_price" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"limit" numeric
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric DEFAULT 0,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'contactInfo' NOT NULL,
  	"label" varchar DEFAULT 'Please fill the following',
  	"width" numeric DEFAULT 100,
  	"first_name" varchar,
  	"first_name_placeholder" varchar DEFAULT 'First',
  	"last_name" varchar,
  	"last_name_placeholder" varchar DEFAULT 'Last',
  	"email" varchar,
  	"email_placeholder" varchar DEFAULT 'abcd@mylaurier.ca',
  	"student_i_d" varchar,
  	"studentid_placeholder" varchar DEFAULT '123456789',
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"submission_limit" numeric,
  	"release_date" timestamp(3) with time zone,
  	"close_date" timestamp(3) with time zone,
  	"slug" varchar,
  	"webhook" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"submission_data" jsonb,
  	"payment_amount" numeric,
  	"payment_status" "enum_form_submissions_payment_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
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
  	"recording_id" integer,
  	"weekly_events_id" integer,
  	"jummah_timings_id" integer,
  	"prayer_rooms_id" integer,
  	"services_id" integer,
  	"email_collection_id" integer,
  	"distribution_list_id" integer,
  	"individuals_id" integer,
  	"iia_services_id" integer,
  	"faq_id" integer,
  	"halal_directory_id" integer,
  	"roommate_posts_id" integer,
  	"comments_id" integer,
  	"events_id" integer,
  	"general_user_id" integer,
  	"daily_reminders_id" integer,
  	"halal_grocery_stores_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"execs_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "nav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "prayer_timings_month_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" numeric NOT NULL,
  	"fajr" varchar NOT NULL,
  	"fajr_iqamah" varchar,
  	"sunrise" varchar NOT NULL,
  	"dhuhr" varchar NOT NULL,
  	"dhuhr_iqamah_1" varchar NOT NULL,
  	"dhuhr_iqamah_2" varchar,
  	"asr" varchar NOT NULL,
  	"asr_iqamah_1" varchar NOT NULL,
  	"maghrib" varchar NOT NULL,
  	"maghrib_iqamah" varchar NOT NULL,
  	"isha" varchar NOT NULL,
  	"isha_iqamah" varchar
  );
  
  CREATE TABLE "prayer_timings_month" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"month" "enum_prayer_timings_month_month" NOT NULL
  );
  
  CREATE TABLE "prayer_timings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "execs_sessions" ADD CONSTRAINT "execs_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_link_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials" ADD CONSTRAINT "socials_link_id_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_tags_id_tags_id_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_sizes_id_sizes_id_fk" FOREIGN KEY ("sizes_id") REFERENCES "public"."sizes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_execs_fk" FOREIGN KEY ("execs_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "weekly_events_rels" ADD CONSTRAINT "weekly_events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."weekly_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "weekly_events_rels" ADD CONSTRAINT "weekly_events_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_link_id_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "email_collection" ADD CONSTRAINT "email_collection_distribution_list_id_distribution_list_id_fk" FOREIGN KEY ("distribution_list_id") REFERENCES "public"."distribution_list"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "email_collection_rels" ADD CONSTRAINT "email_collection_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."email_collection"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "email_collection_rels" ADD CONSTRAINT "email_collection_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "distribution_list_rels" ADD CONSTRAINT "distribution_list_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."distribution_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "distribution_list_rels" ADD CONSTRAINT "distribution_list_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "iia_services_rels" ADD CONSTRAINT "iia_services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."iia_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "iia_services_rels" ADD CONSTRAINT "iia_services_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "halal_directory" ADD CONSTRAINT "halal_directory_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "roommate_posts_utilities" ADD CONSTRAINT "roommate_posts_utilities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roommate_posts_amenities" ADD CONSTRAINT "roommate_posts_amenities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roommate_posts" ADD CONSTRAINT "roommate_posts_user_id_id_general_user_id_fk" FOREIGN KEY ("user_id_id") REFERENCES "public"."general_user"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "roommate_posts_texts" ADD CONSTRAINT "roommate_posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_id_roommate_posts_id_fk" FOREIGN KEY ("post_id_id") REFERENCES "public"."roommate_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "halal_grocery_stores_specialties" ADD CONSTRAINT "halal_grocery_stores_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."halal_grocery_stores"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "halal_grocery_stores" ADD CONSTRAINT "halal_grocery_stores_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_checkboxes" ADD CONSTRAINT "forms_blocks_checkbox_checkboxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_payment_price_conditions" ADD CONSTRAINT "forms_blocks_payment_price_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_payment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_payment" ADD CONSTRAINT "forms_blocks_payment_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_contact_info" ADD CONSTRAINT "forms_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_execs_fk" FOREIGN KEY ("execs_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_link_fk" FOREIGN KEY ("link_id") REFERENCES "public"."link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_instagram_fk" FOREIGN KEY ("instagram_id") REFERENCES "public"."instagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_socials_fk" FOREIGN KEY ("socials_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sizes_fk" FOREIGN KEY ("sizes_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recording_fk" FOREIGN KEY ("recording_id") REFERENCES "public"."recording"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_weekly_events_fk" FOREIGN KEY ("weekly_events_id") REFERENCES "public"."weekly_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jummah_timings_fk" FOREIGN KEY ("jummah_timings_id") REFERENCES "public"."jummah_timings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_prayer_rooms_fk" FOREIGN KEY ("prayer_rooms_id") REFERENCES "public"."prayer_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_collection_fk" FOREIGN KEY ("email_collection_id") REFERENCES "public"."email_collection"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_distribution_list_fk" FOREIGN KEY ("distribution_list_id") REFERENCES "public"."distribution_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_iia_services_fk" FOREIGN KEY ("iia_services_id") REFERENCES "public"."iia_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_halal_directory_fk" FOREIGN KEY ("halal_directory_id") REFERENCES "public"."halal_directory"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roommate_posts_fk" FOREIGN KEY ("roommate_posts_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_general_user_fk" FOREIGN KEY ("general_user_id") REFERENCES "public"."general_user"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_daily_reminders_fk" FOREIGN KEY ("daily_reminders_id") REFERENCES "public"."daily_reminders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_halal_grocery_stores_fk" FOREIGN KEY ("halal_grocery_stores_id") REFERENCES "public"."halal_grocery_stores"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_execs_fk" FOREIGN KEY ("execs_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items_links" ADD CONSTRAINT "nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items" ADD CONSTRAINT "nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_items_links" ADD CONSTRAINT "footer_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_items" ADD CONSTRAINT "footer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prayer_timings_month_days" ADD CONSTRAINT "prayer_timings_month_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prayer_timings_month"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prayer_timings_month" ADD CONSTRAINT "prayer_timings_month_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prayer_timings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "execs_sessions_order_idx" ON "execs_sessions" USING btree ("_order");
  CREATE INDEX "execs_sessions_parent_id_idx" ON "execs_sessions" USING btree ("_parent_id");
  CREATE INDEX "execs_updated_at_idx" ON "execs" USING btree ("updated_at");
  CREATE INDEX "execs_created_at_idx" ON "execs" USING btree ("created_at");
  CREATE UNIQUE INDEX "execs_email_idx" ON "execs" USING btree ("email");
  CREATE INDEX "link_title_idx" ON "link" USING btree ("title");
  CREATE INDEX "link_updated_at_idx" ON "link" USING btree ("updated_at");
  CREATE INDEX "link_created_at_idx" ON "link" USING btree ("created_at");
  CREATE INDEX "instagram_updated_at_idx" ON "instagram" USING btree ("updated_at");
  CREATE INDEX "instagram_created_at_idx" ON "instagram" USING btree ("created_at");
  CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE INDEX "resources_rels_order_idx" ON "resources_rels" USING btree ("order");
  CREATE INDEX "resources_rels_parent_idx" ON "resources_rels" USING btree ("parent_id");
  CREATE INDEX "resources_rels_path_idx" ON "resources_rels" USING btree ("path");
  CREATE INDEX "resources_rels_link_id_idx" ON "resources_rels" USING btree ("link_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");
  CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE INDEX "socials_link_idx" ON "socials" USING btree ("link_id");
  CREATE INDEX "socials_updated_at_idx" ON "socials" USING btree ("updated_at");
  CREATE INDEX "socials_created_at_idx" ON "socials" USING btree ("created_at");
  CREATE INDEX "products_tags_idx" ON "products" USING btree ("tags_id");
  CREATE INDEX "products_sizes_idx" ON "products" USING btree ("sizes_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");
  CREATE INDEX "posts_categories_idx" ON "posts" USING btree ("categories_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_media_id_idx" ON "posts_rels" USING btree ("media_id");
  CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX "posts_rels_execs_id_idx" ON "posts_rels" USING btree ("execs_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "sizes_updated_at_idx" ON "sizes" USING btree ("updated_at");
  CREATE INDEX "sizes_created_at_idx" ON "sizes" USING btree ("created_at");
  CREATE INDEX "recording_title_idx" ON "recording" USING btree ("title");
  CREATE INDEX "recording_updated_at_idx" ON "recording" USING btree ("updated_at");
  CREATE INDEX "recording_created_at_idx" ON "recording" USING btree ("created_at");
  CREATE INDEX "weekly_events_updated_at_idx" ON "weekly_events" USING btree ("updated_at");
  CREATE INDEX "weekly_events_created_at_idx" ON "weekly_events" USING btree ("created_at");
  CREATE INDEX "weekly_events_rels_order_idx" ON "weekly_events_rels" USING btree ("order");
  CREATE INDEX "weekly_events_rels_parent_idx" ON "weekly_events_rels" USING btree ("parent_id");
  CREATE INDEX "weekly_events_rels_path_idx" ON "weekly_events_rels" USING btree ("path");
  CREATE INDEX "weekly_events_rels_media_id_idx" ON "weekly_events_rels" USING btree ("media_id");
  CREATE INDEX "jummah_timings_updated_at_idx" ON "jummah_timings" USING btree ("updated_at");
  CREATE INDEX "jummah_timings_created_at_idx" ON "jummah_timings" USING btree ("created_at");
  CREATE INDEX "prayer_rooms_updated_at_idx" ON "prayer_rooms" USING btree ("updated_at");
  CREATE INDEX "prayer_rooms_created_at_idx" ON "prayer_rooms" USING btree ("created_at");
  CREATE INDEX "services_link_idx" ON "services" USING btree ("link_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "email_collection_distribution_list_idx" ON "email_collection" USING btree ("distribution_list_id");
  CREATE INDEX "email_collection_updated_at_idx" ON "email_collection" USING btree ("updated_at");
  CREATE INDEX "email_collection_created_at_idx" ON "email_collection" USING btree ("created_at");
  CREATE INDEX "email_collection_rels_order_idx" ON "email_collection_rels" USING btree ("order");
  CREATE INDEX "email_collection_rels_parent_idx" ON "email_collection_rels" USING btree ("parent_id");
  CREATE INDEX "email_collection_rels_path_idx" ON "email_collection_rels" USING btree ("path");
  CREATE INDEX "email_collection_rels_media_id_idx" ON "email_collection_rels" USING btree ("media_id");
  CREATE INDEX "distribution_list_updated_at_idx" ON "distribution_list" USING btree ("updated_at");
  CREATE INDEX "distribution_list_created_at_idx" ON "distribution_list" USING btree ("created_at");
  CREATE INDEX "distribution_list_rels_order_idx" ON "distribution_list_rels" USING btree ("order");
  CREATE INDEX "distribution_list_rels_parent_idx" ON "distribution_list_rels" USING btree ("parent_id");
  CREATE INDEX "distribution_list_rels_path_idx" ON "distribution_list_rels" USING btree ("path");
  CREATE INDEX "distribution_list_rels_individuals_id_idx" ON "distribution_list_rels" USING btree ("individuals_id");
  CREATE INDEX "individuals_updated_at_idx" ON "individuals" USING btree ("updated_at");
  CREATE INDEX "individuals_created_at_idx" ON "individuals" USING btree ("created_at");
  CREATE INDEX "iia_services_updated_at_idx" ON "iia_services" USING btree ("updated_at");
  CREATE INDEX "iia_services_created_at_idx" ON "iia_services" USING btree ("created_at");
  CREATE INDEX "iia_services_rels_order_idx" ON "iia_services_rels" USING btree ("order");
  CREATE INDEX "iia_services_rels_parent_idx" ON "iia_services_rels" USING btree ("parent_id");
  CREATE INDEX "iia_services_rels_path_idx" ON "iia_services_rels" USING btree ("path");
  CREATE INDEX "iia_services_rels_media_id_idx" ON "iia_services_rels" USING btree ("media_id");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "halal_directory_image_idx" ON "halal_directory" USING btree ("image_id");
  CREATE INDEX "halal_directory_updated_at_idx" ON "halal_directory" USING btree ("updated_at");
  CREATE INDEX "halal_directory_created_at_idx" ON "halal_directory" USING btree ("created_at");
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
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "general_user_clerk_id_idx" ON "general_user" USING btree ("clerk_id");
  CREATE UNIQUE INDEX "general_user_email_idx" ON "general_user" USING btree ("email");
  CREATE INDEX "general_user_updated_at_idx" ON "general_user" USING btree ("updated_at");
  CREATE INDEX "general_user_created_at_idx" ON "general_user" USING btree ("created_at");
  CREATE INDEX "daily_reminders_updated_at_idx" ON "daily_reminders" USING btree ("updated_at");
  CREATE INDEX "daily_reminders_created_at_idx" ON "daily_reminders" USING btree ("created_at");
  CREATE INDEX "halal_grocery_stores_specialties_order_idx" ON "halal_grocery_stores_specialties" USING btree ("_order");
  CREATE INDEX "halal_grocery_stores_specialties_parent_id_idx" ON "halal_grocery_stores_specialties" USING btree ("_parent_id");
  CREATE INDEX "halal_grocery_stores_image_idx" ON "halal_grocery_stores" USING btree ("image_id");
  CREATE INDEX "halal_grocery_stores_updated_at_idx" ON "halal_grocery_stores" USING btree ("updated_at");
  CREATE INDEX "halal_grocery_stores_created_at_idx" ON "halal_grocery_stores" USING btree ("created_at");
  CREATE INDEX "forms_blocks_checkbox_checkboxes_order_idx" ON "forms_blocks_checkbox_checkboxes" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_checkboxes_parent_id_idx" ON "forms_blocks_checkbox_checkboxes" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_payment_price_conditions_order_idx" ON "forms_blocks_payment_price_conditions" USING btree ("_order");
  CREATE INDEX "forms_blocks_payment_price_conditions_parent_id_idx" ON "forms_blocks_payment_price_conditions" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_payment_order_idx" ON "forms_blocks_payment" USING btree ("_order");
  CREATE INDEX "forms_blocks_payment_parent_id_idx" ON "forms_blocks_payment" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_payment_path_idx" ON "forms_blocks_payment" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_contact_info_order_idx" ON "forms_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "forms_blocks_contact_info_parent_id_idx" ON "forms_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_contact_info_path_idx" ON "forms_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_execs_id_idx" ON "payload_locked_documents_rels" USING btree ("execs_id");
  CREATE INDEX "payload_locked_documents_rels_link_id_idx" ON "payload_locked_documents_rels" USING btree ("link_id");
  CREATE INDEX "payload_locked_documents_rels_instagram_id_idx" ON "payload_locked_documents_rels" USING btree ("instagram_id");
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX "payload_locked_documents_rels_socials_id_idx" ON "payload_locked_documents_rels" USING btree ("socials_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_sizes_id_idx" ON "payload_locked_documents_rels" USING btree ("sizes_id");
  CREATE INDEX "payload_locked_documents_rels_recording_id_idx" ON "payload_locked_documents_rels" USING btree ("recording_id");
  CREATE INDEX "payload_locked_documents_rels_weekly_events_id_idx" ON "payload_locked_documents_rels" USING btree ("weekly_events_id");
  CREATE INDEX "payload_locked_documents_rels_jummah_timings_id_idx" ON "payload_locked_documents_rels" USING btree ("jummah_timings_id");
  CREATE INDEX "payload_locked_documents_rels_prayer_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("prayer_rooms_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_email_collection_id_idx" ON "payload_locked_documents_rels" USING btree ("email_collection_id");
  CREATE INDEX "payload_locked_documents_rels_distribution_list_id_idx" ON "payload_locked_documents_rels" USING btree ("distribution_list_id");
  CREATE INDEX "payload_locked_documents_rels_individuals_id_idx" ON "payload_locked_documents_rels" USING btree ("individuals_id");
  CREATE INDEX "payload_locked_documents_rels_iia_services_id_idx" ON "payload_locked_documents_rels" USING btree ("iia_services_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX "payload_locked_documents_rels_halal_directory_id_idx" ON "payload_locked_documents_rels" USING btree ("halal_directory_id");
  CREATE INDEX "payload_locked_documents_rels_roommate_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("roommate_posts_id");
  CREATE INDEX "payload_locked_documents_rels_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("comments_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_general_user_id_idx" ON "payload_locked_documents_rels" USING btree ("general_user_id");
  CREATE INDEX "payload_locked_documents_rels_daily_reminders_id_idx" ON "payload_locked_documents_rels" USING btree ("daily_reminders_id");
  CREATE INDEX "payload_locked_documents_rels_halal_grocery_stores_id_idx" ON "payload_locked_documents_rels" USING btree ("halal_grocery_stores_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_execs_id_idx" ON "payload_preferences_rels" USING btree ("execs_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "nav_items_links_order_idx" ON "nav_items_links" USING btree ("_order");
  CREATE INDEX "nav_items_links_parent_id_idx" ON "nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "nav_items_links_title_idx" ON "nav_items_links" USING btree ("title");
  CREATE INDEX "nav_items_order_idx" ON "nav_items" USING btree ("_order");
  CREATE INDEX "nav_items_parent_id_idx" ON "nav_items" USING btree ("_parent_id");
  CREATE INDEX "nav_items_label_idx" ON "nav_items" USING btree ("label");
  CREATE INDEX "footer_items_links_order_idx" ON "footer_items_links" USING btree ("_order");
  CREATE INDEX "footer_items_links_parent_id_idx" ON "footer_items_links" USING btree ("_parent_id");
  CREATE INDEX "footer_items_links_title_idx" ON "footer_items_links" USING btree ("title");
  CREATE INDEX "footer_items_order_idx" ON "footer_items" USING btree ("_order");
  CREATE INDEX "footer_items_parent_id_idx" ON "footer_items" USING btree ("_parent_id");
  CREATE INDEX "footer_items_label_idx" ON "footer_items" USING btree ("label");
  CREATE INDEX "prayer_timings_month_days_order_idx" ON "prayer_timings_month_days" USING btree ("_order");
  CREATE INDEX "prayer_timings_month_days_parent_id_idx" ON "prayer_timings_month_days" USING btree ("_parent_id");
  CREATE INDEX "prayer_timings_month_order_idx" ON "prayer_timings_month" USING btree ("_order");
  CREATE INDEX "prayer_timings_month_parent_id_idx" ON "prayer_timings_month" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prayer_timings_month_month_idx" ON "prayer_timings_month" USING btree ("month");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "execs_sessions" CASCADE;
  DROP TABLE "execs" CASCADE;
  DROP TABLE "link" CASCADE;
  DROP TABLE "instagram" CASCADE;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "resources_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "members" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "sizes" CASCADE;
  DROP TABLE "recording" CASCADE;
  DROP TABLE "weekly_events" CASCADE;
  DROP TABLE "weekly_events_rels" CASCADE;
  DROP TABLE "jummah_timings" CASCADE;
  DROP TABLE "prayer_rooms" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "email_collection" CASCADE;
  DROP TABLE "email_collection_rels" CASCADE;
  DROP TABLE "distribution_list" CASCADE;
  DROP TABLE "distribution_list_rels" CASCADE;
  DROP TABLE "individuals" CASCADE;
  DROP TABLE "iia_services" CASCADE;
  DROP TABLE "iia_services_rels" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "halal_directory" CASCADE;
  DROP TABLE "roommate_posts_utilities" CASCADE;
  DROP TABLE "roommate_posts_amenities" CASCADE;
  DROP TABLE "roommate_posts" CASCADE;
  DROP TABLE "roommate_posts_texts" CASCADE;
  DROP TABLE "comments" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "general_user" CASCADE;
  DROP TABLE "daily_reminders" CASCADE;
  DROP TABLE "halal_grocery_stores_specialties" CASCADE;
  DROP TABLE "halal_grocery_stores" CASCADE;
  DROP TABLE "forms_blocks_checkbox_checkboxes" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_payment_price_conditions" CASCADE;
  DROP TABLE "forms_blocks_payment" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_contact_info" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "nav_items_links" CASCADE;
  DROP TABLE "nav_items" CASCADE;
  DROP TABLE "nav" CASCADE;
  DROP TABLE "footer_items_links" CASCADE;
  DROP TABLE "footer_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "prayer_timings_month_days" CASCADE;
  DROP TABLE "prayer_timings_month" CASCADE;
  DROP TABLE "prayer_timings" CASCADE;
  DROP TYPE "public"."enum_execs_department";
  DROP TYPE "public"."enum_execs_position";
  DROP TYPE "public"."enum_execs_roles";
  DROP TYPE "public"."enum_resources_category";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_sizes_size";
  DROP TYPE "public"."enum_recording_category";
  DROP TYPE "public"."enum_weekly_events_day";
  DROP TYPE "public"."enum_email_collection_status";
  DROP TYPE "public"."enum_halal_directory_category";
  DROP TYPE "public"."enum_halal_directory_slaughtered";
  DROP TYPE "public"."enum_roommate_posts_utilities";
  DROP TYPE "public"."enum_roommate_posts_amenities";
  DROP TYPE "public"."enum_roommate_posts_gender";
  DROP TYPE "public"."enum_roommate_posts_property_type";
  DROP TYPE "public"."enum_roommate_posts_furnishing_type";
  DROP TYPE "public"."enum_roommate_posts_status";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum_general_user_category";
  DROP TYPE "public"."enum_halal_grocery_stores_category";
  DROP TYPE "public"."enum_halal_grocery_stores_halal_certification";
  DROP TYPE "public"."enum_halal_grocery_stores_price_range";
  DROP TYPE "public"."enum_forms_blocks_payment_price_conditions_condition";
  DROP TYPE "public"."enum_forms_blocks_payment_price_conditions_operator";
  DROP TYPE "public"."enum_forms_blocks_payment_price_conditions_value_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_form_submissions_payment_status";
  DROP TYPE "public"."enum_prayer_timings_month_month";`)
}
