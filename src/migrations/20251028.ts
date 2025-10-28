import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'roommate_posts'
          AND column_name = 'rent'
      ) THEN
        -- Only attempt change if current data type is not already numeric
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'roommate_posts'
            AND column_name = 'rent'
            AND data_type <> 'numeric'
        ) THEN
          ALTER TABLE "roommate_posts"
          ALTER COLUMN "rent" TYPE numeric
          USING NULLIF(regexp_replace("rent"::text, '[^0-9\.]', '', 'g'), '')::numeric;
        END IF;
      END IF;
    END$$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`SELECT 1;`);
}


