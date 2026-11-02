import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "_charity_campaigns_v"
    SET "latest" = false
    WHERE "parent_id" IN (
      SELECT "id" FROM "charity_campaigns"
      WHERE "campaign_type" = 'charity-week' AND "year" = 2026
    );

    WITH inserted_version AS (
      INSERT INTO "_charity_campaigns_v" (
        "parent_id",
        "version_title",
        "version_campaign_type",
        "version_year",
        "version_phase",
        "version_summary",
        "version_hero_image_id",
        "version_start_date",
        "version_end_date",
        "version_featured",
        "version_display_order",
        "version_fundraising_currency",
        "version_fundraising_goal",
        "version_fundraising_amount_state",
        "version_fundraising_amount_raised",
        "version_fundraising_last_verified_at",
        "version_fundraising_donation_u_r_l",
        "version_volunteer_text",
        "version_volunteer_u_r_l",
        "version_contact_email",
        "version_results_summary",
        "version_recap_u_r_l",
        "version_updated_at",
        "version_created_at",
        "version__status",
        "created_at",
        "updated_at",
        "latest",
        "autosave"
      )
      SELECT
        "id",
        "title",
        "campaign_type"::text::"enum__charity_campaigns_v_version_campaign_type",
        "year",
        "phase"::text::"enum__charity_campaigns_v_version_phase",
        "summary",
        "hero_image_id",
        "start_date",
        "end_date",
        "featured",
        "display_order",
        "fundraising_currency"::text::"enum__charity_campaigns_v_version_fundraising_currency",
        "fundraising_goal",
        "fundraising_amount_state"::text::"enum__charity_campaigns_v_version_fundraising_amount_state",
        "fundraising_amount_raised",
        "fundraising_last_verified_at",
        "fundraising_donation_u_r_l",
        "volunteer_text",
        "volunteer_u_r_l",
        "contact_email",
        "results_summary",
        "recap_u_r_l",
        "updated_at",
        "created_at",
        "_status"::text::"enum__charity_campaigns_v_version_status",
        now(),
        now(),
        true,
        false
      FROM "charity_campaigns"
      WHERE "campaign_type" = 'charity-week' AND "year" = 2026
      RETURNING "id", "parent_id"
    )
    INSERT INTO "_charity_campaigns_v_version_causes" (
      "_order", "_parent_id", "name", "description", "image_id", "_uuid"
    )
    SELECT
      cause."_order",
      version."id",
      cause."name",
      cause."description",
      cause."image_id",
      cause."id"
    FROM inserted_version version
    JOIN "charity_campaigns_causes" cause
      ON cause."_parent_id" = version."parent_id";

    INSERT INTO "_charity_campaigns_v_version_partners" (
      "_order", "_parent_id", "name", "description", "url", "_uuid"
    )
    SELECT
      partner."_order",
      version."id",
      partner."name",
      partner."description",
      partner."url",
      partner."id"
    FROM "_charity_campaigns_v" version
    JOIN "charity_campaigns_partners" partner
      ON partner."_parent_id" = version."parent_id"
    WHERE version."latest" = true
      AND version."parent_id" IN (
        SELECT "id" FROM "charity_campaigns"
        WHERE "campaign_type" = 'charity-week' AND "year" = 2026
      );
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "_charity_campaigns_v"
    WHERE "latest" = true
      AND "parent_id" IN (
        SELECT "id" FROM "charity_campaigns"
        WHERE "campaign_type" = 'charity-week' AND "year" = 2026
      );
  `);
}
