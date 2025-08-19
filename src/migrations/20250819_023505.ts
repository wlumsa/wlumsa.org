import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_resources_category" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_roommate_posts_utilities" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_roommate_posts_amenities" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_roommate_posts_gender" AS ENUM('1', '2');
  CREATE TYPE "public"."enum_roommate_posts_property_type" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_roommate_posts_furnishing_type" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_general_user_category" AS ENUM('student', 'landlord', 'parent', 'business', 'alumni');
  CREATE TABLE IF NOT EXISTS "roommate_posts_utilities" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_roommate_posts_utilities",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "roommate_posts_amenities" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_roommate_posts_amenities",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "roommate_posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "roommate_posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comments_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "roommate_posts_rels" CASCADE;
  DROP TABLE "comments_rels" CASCADE;
  ALTER TABLE "roommate_posts" ALTER COLUMN "contact_email" SET DATA TYPE boolean;
  ALTER TABLE "roommate_posts" ALTER COLUMN "contact_email" SET DEFAULT false;
  ALTER TABLE "roommate_posts" ALTER COLUMN "rent" SET DATA TYPE numeric;
  ALTER TABLE "roommate_posts" ALTER COLUMN "property_type" SET DATA TYPE enum_roommate_posts_property_type;
  ALTER TABLE "roommate_posts" ALTER COLUMN "status" SET DEFAULT 'approved';
  ALTER TABLE "comments" ALTER COLUMN "comment" DROP NOT NULL;
  ALTER TABLE "comments" ALTER COLUMN "author" DROP NOT NULL;
  ALTER TABLE "resources" ADD COLUMN "category" "enum_resources_category" NOT NULL;
  ALTER TABLE "roommate_posts" ADD COLUMN "user_id_id" integer NOT NULL;
  ALTER TABLE "roommate_posts" ADD COLUMN "author" varchar;
  ALTER TABLE "roommate_posts" ADD COLUMN "email" varchar;
  ALTER TABLE "roommate_posts" ADD COLUMN "deposit" numeric;
  ALTER TABLE "roommate_posts" ADD COLUMN "gender" "enum_roommate_posts_gender" NOT NULL;
  ALTER TABLE "roommate_posts" ADD COLUMN "furnishing_type" "enum_roommate_posts_furnishing_type" NOT NULL;
  ALTER TABLE "roommate_posts" ADD COLUMN "facebook" varchar;
  ALTER TABLE "roommate_posts" ADD COLUMN "phone_number" varchar;
  ALTER TABLE "roommate_posts" ADD COLUMN "instagram" varchar;
  ALTER TABLE "roommate_posts" ADD COLUMN "whatsapp" varchar;
  ALTER TABLE "comments" ADD COLUMN "post_id_id" integer NOT NULL;
  ALTER TABLE "general_user" ADD COLUMN "clerk_id" varchar NOT NULL;
  ALTER TABLE "general_user" ADD COLUMN "email" varchar NOT NULL;
  ALTER TABLE "general_user" ADD COLUMN "first_name" varchar;
  ALTER TABLE "general_user" ADD COLUMN "last_name" varchar;
  ALTER TABLE "general_user" ADD COLUMN "category" "enum_general_user_category";
  ALTER TABLE "general_user" ADD COLUMN "laurier_email" varchar;
  ALTER TABLE "general_user" ADD COLUMN "student_id" varchar;
  ALTER TABLE "general_user" ADD COLUMN "year" varchar;
  ALTER TABLE "general_user" ADD COLUMN "program" varchar;
  ALTER TABLE "general_user" ADD COLUMN "newsletter" boolean;
  DO $$ BEGIN
   ALTER TABLE "roommate_posts_utilities" ADD CONSTRAINT "roommate_posts_utilities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "roommate_posts_amenities" ADD CONSTRAINT "roommate_posts_amenities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "roommate_posts_texts" ADD CONSTRAINT "roommate_posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "roommate_posts_utilities_order_idx" ON "roommate_posts_utilities" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "roommate_posts_utilities_parent_idx" ON "roommate_posts_utilities" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "roommate_posts_amenities_order_idx" ON "roommate_posts_amenities" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "roommate_posts_amenities_parent_idx" ON "roommate_posts_amenities" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "roommate_posts_texts_order_parent_idx" ON "roommate_posts_texts" USING btree ("order","parent_id");
  DO $$ BEGIN
   ALTER TABLE "roommate_posts" ADD CONSTRAINT "roommate_posts_user_id_id_general_user_id_fk" FOREIGN KEY ("user_id_id") REFERENCES "public"."general_user"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_id_roommate_posts_id_fk" FOREIGN KEY ("post_id_id") REFERENCES "public"."roommate_posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "roommate_posts_user_id_idx" ON "roommate_posts" USING btree ("user_id_id");
  CREATE INDEX IF NOT EXISTS "comments_post_id_idx" ON "comments" USING btree ("post_id_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "general_user_clerk_id_idx" ON "general_user" USING btree ("clerk_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "general_user_email_idx" ON "general_user" USING btree ("email");
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "user_id";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "roomfurnishing";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "user_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "roommate_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"comments_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "comments_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"roommate_posts_id" integer
  );
  
  ALTER TABLE "roommate_posts_utilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roommate_posts_amenities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roommate_posts_texts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "roommate_posts_utilities" CASCADE;
  DROP TABLE "roommate_posts_amenities" CASCADE;
  DROP TABLE "roommate_posts_texts" CASCADE;
  ALTER TABLE "roommate_posts" DROP CONSTRAINT "roommate_posts_user_id_id_general_user_id_fk";
  
  ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_id_roommate_posts_id_fk";
  
  DROP INDEX IF EXISTS "roommate_posts_user_id_idx";
  DROP INDEX IF EXISTS "comments_post_id_idx";
  DROP INDEX IF EXISTS "general_user_clerk_id_idx";
  DROP INDEX IF EXISTS "general_user_email_idx";
  ALTER TABLE "roommate_posts" ALTER COLUMN "contact_email" SET DATA TYPE varchar;
  ALTER TABLE "roommate_posts" ALTER COLUMN "contact_email" DROP DEFAULT;
  ALTER TABLE "roommate_posts" ALTER COLUMN "rent" SET DATA TYPE varchar;
  ALTER TABLE "roommate_posts" ALTER COLUMN "property_type" SET DATA TYPE varchar;
  ALTER TABLE "roommate_posts" ALTER COLUMN "status" SET DEFAULT 'pending';
  ALTER TABLE "comments" ALTER COLUMN "author" SET NOT NULL;
  ALTER TABLE "comments" ALTER COLUMN "comment" SET NOT NULL;
  ALTER TABLE "roommate_posts" ADD COLUMN "user_id" varchar NOT NULL;
  ALTER TABLE "roommate_posts" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "roommate_posts" ADD COLUMN "roomfurnishing" varchar NOT NULL;
  ALTER TABLE "general_user" ADD COLUMN "user_id" varchar NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "roommate_posts_rels" ADD CONSTRAINT "roommate_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "roommate_posts_rels" ADD CONSTRAINT "roommate_posts_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "roommate_posts_rels" ADD CONSTRAINT "roommate_posts_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "comments_rels" ADD CONSTRAINT "comments_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "comments_rels" ADD CONSTRAINT "comments_rels_roommate_posts_fk" FOREIGN KEY ("roommate_posts_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "roommate_posts_rels_order_idx" ON "roommate_posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "roommate_posts_rels_parent_idx" ON "roommate_posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "roommate_posts_rels_path_idx" ON "roommate_posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "roommate_posts_rels_media_id_idx" ON "roommate_posts_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "roommate_posts_rels_comments_id_idx" ON "roommate_posts_rels" USING btree ("comments_id");
  CREATE INDEX IF NOT EXISTS "comments_rels_order_idx" ON "comments_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "comments_rels_parent_idx" ON "comments_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "comments_rels_path_idx" ON "comments_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "comments_rels_roommate_posts_id_idx" ON "comments_rels" USING btree ("roommate_posts_id");
  ALTER TABLE "resources" DROP COLUMN IF EXISTS "category";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "user_id_id";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "author";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "email";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "deposit";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "gender";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "furnishing_type";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "facebook";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "phone_number";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "instagram";
  ALTER TABLE "roommate_posts" DROP COLUMN IF EXISTS "whatsapp";
  ALTER TABLE "comments" DROP COLUMN IF EXISTS "post_id_id";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "clerk_id";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "email";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "first_name";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "last_name";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "category";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "laurier_email";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "student_id";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "year";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "program";
  ALTER TABLE "general_user" DROP COLUMN IF EXISTS "newsletter";
  DROP TYPE "public"."enum_resources_category";
  DROP TYPE "public"."enum_roommate_posts_utilities";
  DROP TYPE "public"."enum_roommate_posts_amenities";
  DROP TYPE "public"."enum_roommate_posts_gender";
  DROP TYPE "public"."enum_roommate_posts_property_type";
  DROP TYPE "public"."enum_roommate_posts_furnishing_type";
  DROP TYPE "public"."enum_general_user_category";`)
}
