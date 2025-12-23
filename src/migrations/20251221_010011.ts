import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "masjid" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"location" varchar NOT NULL,
  	"google_maps_link" varchar NOT NULL,
  	"website_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "masjid_id" integer;
  ALTER TABLE "masjid" ADD CONSTRAINT "masjid_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "masjid_title_idx" ON "masjid" USING btree ("title");
  CREATE INDEX "masjid_image_idx" ON "masjid" USING btree ("image_id");
  CREATE INDEX "masjid_updated_at_idx" ON "masjid" USING btree ("updated_at");
  CREATE INDEX "masjid_created_at_idx" ON "masjid" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_masjid_fk" FOREIGN KEY ("masjid_id") REFERENCES "public"."masjid"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_masjid_id_idx" ON "payload_locked_documents_rels" USING btree ("masjid_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "masjid" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "masjid" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_masjid_fk";
  
  DROP INDEX "payload_locked_documents_rels_masjid_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "masjid_id";`)
}
