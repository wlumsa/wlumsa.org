import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create ENUMs safely
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_halal_grocery_stores_category') THEN
        CREATE TYPE "public"."enum_halal_grocery_stores_category" AS ENUM(
          'full-grocery', 'halal-meat', 'international', 'specialty', 'convenience', 'bakery', 'spice', 'frozen'
        );
      END IF;
    END$$;
  `);

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_halal_grocery_stores_halal_certification') THEN
        CREATE TYPE "public"."enum_halal_grocery_stores_halal_certification" AS ENUM(
          'certified', 'muslim-owned', 'halal-friendly', 'not-specified'
        );
      END IF;
    END$$;
  `);

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_halal_grocery_stores_price_range') THEN
        CREATE TYPE "public"."enum_halal_grocery_stores_price_range" AS ENUM('1','2','3','4');
      END IF;
    END$$;
  `);

  // Create tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "execs_sessions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "created_at" timestamp(3) with time zone,
      "expires_at" timestamp(3) with time zone NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "halal_grocery_stores_specialties" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "specialty" varchar NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "halal_grocery_stores" (
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
  `);

  // Alter column default
  await db.execute(sql`
    ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''ve received a new message.';
  `);

  // Add foreign keys safely by dropping first
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_halal_grocery_stores_fk";

    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_halal_grocery_stores_fk"
      FOREIGN KEY ("halal_grocery_stores_id") REFERENCES "public"."halal_grocery_stores"("id") ON DELETE cascade ON UPDATE no action;
  `);

  await db.execute(sql`
    ALTER TABLE "execs_sessions"
      DROP CONSTRAINT IF EXISTS "execs_sessions_parent_id_fk";

    ALTER TABLE "execs_sessions"
      ADD CONSTRAINT "execs_sessions_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."execs"("id") ON DELETE cascade ON UPDATE no action;
  `);

  await db.execute(sql`
    ALTER TABLE "halal_grocery_stores_specialties"
      DROP CONSTRAINT IF EXISTS "halal_grocery_stores_specialties_parent_id_fk";

    ALTER TABLE "halal_grocery_stores_specialties"
      ADD CONSTRAINT "halal_grocery_stores_specialties_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."halal_grocery_stores"("id") ON DELETE cascade ON UPDATE no action;
  `);

  await db.execute(sql`
    ALTER TABLE "halal_grocery_stores"
      DROP CONSTRAINT IF EXISTS "halal_grocery_stores_image_id_media_id_fk";

    ALTER TABLE "halal_grocery_stores"
      ADD CONSTRAINT "halal_grocery_stores_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  `);

  // Create indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "execs_sessions_order_idx" ON "execs_sessions" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "execs_sessions_parent_id_idx" ON "execs_sessions" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "halal_grocery_stores_specialties_order_idx" ON "halal_grocery_stores_specialties" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "halal_grocery_stores_specialties_parent_id_idx" ON "halal_grocery_stores_specialties" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "halal_grocery_stores_image_idx" ON "halal_grocery_stores" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "halal_grocery_stores_updated_at_idx" ON "halal_grocery_stores" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "halal_grocery_stores_created_at_idx" ON "halal_grocery_stores" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_halal_grocery_stores_id_idx"
      ON "payload_locked_documents_rels" USING btree ("halal_grocery_stores_id");
  `);
}


export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "execs_sessions" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "halal_grocery_stores_specialties" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "halal_grocery_stores" DISABLE ROW LEVEL SECURITY;

    DROP TABLE IF EXISTS "execs_sessions" CASCADE;
    DROP TABLE IF EXISTS "halal_grocery_stores_specialties" CASCADE;
    DROP TABLE IF EXISTS "halal_grocery_stores" CASCADE;

    ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_halal_grocery_stores_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_halal_grocery_stores_id_idx";

    ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''''ve received a new message.';
    ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP COLUMN IF EXISTS "halal_grocery_stores_id";

    DROP TYPE IF EXISTS "public"."enum_halal_grocery_stores_category";
    DROP TYPE IF EXISTS "public"."enum_halal_grocery_stores_halal_certification";
    DROP TYPE IF EXISTS "public"."enum_halal_grocery_stores_price_range";
  `);
}
