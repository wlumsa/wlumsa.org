import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_events_planning_status" AS ENUM('planning', 'in_progress', 'waiting', 'ready', 'complete');
    ALTER TABLE "events" ADD COLUMN "planning_status" "enum_events_planning_status" DEFAULT 'planning';
    ALTER TABLE "events" ADD COLUMN "potential_venue" varchar;
    ALTER TABLE "events" ADD COLUMN "planning_update" varchar;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events" DROP COLUMN "planning_status";
    ALTER TABLE "events" DROP COLUMN "potential_venue";
    ALTER TABLE "events" DROP COLUMN "planning_update";
    DROP TYPE "public"."enum_events_planning_status";
  `);
}
