import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_execs_roles" ADD VALUE IF NOT EXISTS 'manager';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "execs" SET "roles" = 'editor' WHERE "roles" = 'manager';
    ALTER TYPE "public"."enum_execs_roles" RENAME TO "enum_execs_roles_old";
    CREATE TYPE "public"."enum_execs_roles" AS ENUM('admin', 'editor');
    ALTER TABLE "execs" ALTER COLUMN "roles" TYPE "public"."enum_execs_roles"
      USING "roles"::text::"public"."enum_execs_roles";
    DROP TYPE "public"."enum_execs_roles_old";
  `);
}
