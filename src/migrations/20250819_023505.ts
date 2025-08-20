import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Enums
    DO $$ BEGIN
      CREATE TYPE "public"."enum_resources_category" AS ENUM('1', '2', '3', '4');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_roommate_posts_utilities" AS ENUM('1', '2', '3', '4', '5', '6');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_roommate_posts_amenities" AS ENUM('1', '2', '3', '4', '5');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_roommate_posts_gender" AS ENUM('1', '2');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_roommate_posts_property_type" AS ENUM('1', '2', '3', '4');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_roommate_posts_furnishing_type" AS ENUM('1', '2', '3');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_general_user_category" AS ENUM('student', 'landlord', 'parent', 'business', 'alumni');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    -- Tables
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

    -- Columns (safe for existing data)
    DO $$ BEGIN
      ALTER TABLE "resources" ADD COLUMN "category" "enum_resources_category" DEFAULT '1';
    EXCEPTION WHEN duplicate_column THEN null; END $$;
    UPDATE "resources" SET "category" = '1' WHERE "category" IS NULL;
    ALTER TABLE "resources" ALTER COLUMN "category" SET NOT NULL;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "user_id_id" integer NOT NULL;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "author" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "email" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "deposit" numeric;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "gender" "enum_roommate_posts_gender" NOT NULL DEFAULT '1';
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "furnishing_type" "enum_roommate_posts_furnishing_type" NOT NULL DEFAULT '1';
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "facebook" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "phone_number" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "instagram" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts" ADD COLUMN "whatsapp" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "comments" ADD COLUMN "post_id_id" integer NOT NULL;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "clerk_id" varchar NOT NULL;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "email" varchar NOT NULL;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "first_name" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "last_name" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "category" "enum_general_user_category";
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "laurier_email" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "student_id" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "year" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "program" varchar;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "general_user" ADD COLUMN "newsletter" boolean;
    EXCEPTION WHEN duplicate_column THEN null; END $$;

    -- Foreign keys
    DO $$ BEGIN
      ALTER TABLE "roommate_posts_utilities" ADD CONSTRAINT "roommate_posts_utilities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts_amenities" ADD CONSTRAINT "roommate_posts_amenities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "roommate_posts_texts" ADD CONSTRAINT "roommate_posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roommate_posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   
  `)
}
