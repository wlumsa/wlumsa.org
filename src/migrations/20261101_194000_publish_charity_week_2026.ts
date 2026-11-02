import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    INSERT INTO "charity_campaigns" (
      "title",
      "campaign_type",
      "year",
      "phase",
      "summary",
      "fundraising_currency",
      "fundraising_amount_state",
      "featured",
      "display_order",
      "_status",
      "created_at",
      "updated_at"
    )
    SELECT
      'Charity Week 2026',
      'charity-week',
      2026,
      'active',
      'Join WLU MSA and Charity Week in delivering life-saving relief, hope, and dignity to vulnerable children and communities around the world.',
      'CAD',
      'verified',
      true,
      100,
      'published',
      now(),
      now()
    WHERE NOT EXISTS (
      SELECT 1 FROM "charity_campaigns"
      WHERE "campaign_type" = 'charity-week' AND "year" = 2026
    );

    UPDATE "charity_campaigns"
    SET
      "phase" = 'active',
      "summary" = 'Join WLU MSA and Charity Week in delivering life-saving relief, hope, and dignity to vulnerable children and communities around the world.',
      "fundraising_goal" = 1000,
      "fundraising_amount_state" = 'verified',
      "fundraising_amount_raised" = 2582,
      "fundraising_last_verified_at" = '2026-11-01T00:00:00-04:00',
      "fundraising_donation_u_r_l" = 'https://fundraise.islamicreliefcanada.org/campaign/muslim-students-association-wilfrid-laurier-university-4928#attribute_values=118',
      "featured" = true,
      "_status" = 'published',
      "updated_at" = now()
    WHERE "campaign_type" = 'charity-week' AND "year" = 2026;

    DELETE FROM "charity_campaigns_causes"
    WHERE "_parent_id" IN (
      SELECT "id" FROM "charity_campaigns"
      WHERE "campaign_type" = 'charity-week' AND "year" = 2026
    );

    INSERT INTO "charity_campaigns_causes" (
      "_order", "_parent_id", "id", "name", "description"
    )
    SELECT 1, "id", 'cw-2026-palestine', 'Gaza, Palestine',
      'Support healthcare and education through medical-student funding, a mobile surgical unit, primary clinics, hot meals, and a new school.'
    FROM "charity_campaigns"
    WHERE "campaign_type" = 'charity-week' AND "year" = 2026
    UNION ALL
    SELECT 2, "id", 'cw-2026-sudan', 'Sudan & South Sudan',
      'Provide emergency food, shelter, water and sanitation kits, essential medicines, restored water sources, and agricultural field schools for youth.'
    FROM "charity_campaigns"
    WHERE "campaign_type" = 'charity-week' AND "year" = 2026
    UNION ALL
    SELECT 3, "id", 'cw-2026-water', 'Clean Water & Rescue',
      'Bring clean water and dignified sanitation to remote communities, schools, and displacement camps, while supporting Mediterranean search-and-rescue work.'
    FROM "charity_campaigns"
    WHERE "campaign_type" = 'charity-week' AND "year" = 2026
    UNION ALL
    SELECT 4, "id", 'cw-2026-empowerment', 'Empowering Communities',
      'Support orphan education, restore classrooms, launch mobile learning buses, construct safe homes, and strengthen women-led cooperatives.'
    FROM "charity_campaigns"
    WHERE "campaign_type" = 'charity-week' AND "year" = 2026;

    UPDATE "charity_campaigns_partners"
    SET
      "description" = 'The registered charity hosting WLU MSA''s official Charity Week fundraiser.',
      "url" = 'https://www.islamicreliefcanada.org/'
    WHERE "id" = 'cw-2026-islamic-relief-canada';

    INSERT INTO "charity_campaigns_partners" (
      "_order", "_parent_id", "id", "name", "description", "url"
    )
    SELECT
      1,
      "id",
      'cw-2026-islamic-relief-canada',
      'Islamic Relief Canada',
      'The registered charity hosting WLU MSA''s official Charity Week fundraiser.',
      'https://www.islamicreliefcanada.org/'
    FROM "charity_campaigns"
    WHERE "campaign_type" = 'charity-week'
      AND "year" = 2026
      AND NOT EXISTS (
        SELECT 1 FROM "charity_campaigns_partners"
        WHERE "id" = 'cw-2026-islamic-relief-canada'
      );
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "charity_campaigns"
    SET
      "phase" = 'upcoming',
      "summary" = 'An international, student-led campaign supporting orphans and children in need through a shared campus fundraising effort.',
      "fundraising_goal" = 25000,
      "fundraising_amount_state" = 'unknown',
      "fundraising_amount_raised" = NULL,
      "fundraising_last_verified_at" = NULL,
      "fundraising_donation_u_r_l" = NULL,
      "featured" = false,
      "_status" = 'draft',
      "updated_at" = now()
    WHERE "campaign_type" = 'charity-week' AND "year" = 2026;
  `);
}
