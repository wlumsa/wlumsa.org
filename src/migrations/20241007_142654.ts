import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "posts" ALTER COLUMN "categories_id" SET NOT NULL;
  ALTER TABLE "categories" ALTER COLUMN "title" SET NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "posts" ALTER COLUMN "categories_id" DROP NOT NULL;
  ALTER TABLE "categories" ALTER COLUMN "title" DROP NOT NULL;`)
}
