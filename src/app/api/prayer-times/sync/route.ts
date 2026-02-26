import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

import configPromise from "@payload-config";
import { env } from "@/env.mjs";
import type { ScrapedPrayerDay } from "@/lib/prayer-times/weeklyWaterlooScraper";
import { scrapeWeeklyPrayerTimes } from "@/lib/prayer-times/weeklyWaterlooScraper";

export const runtime = "nodejs";

const DEFAULT_SOURCE_URL = "https://waterloomasjid.com/main/index.php/prayers";

/** Map scraper row (camelCase) to Payload row (snake_case) for DB column names. */
function toPayloadRows(rows: ScrapedPrayerDay[]): Record<string, unknown>[] {
  return rows.map((row): Record<string, unknown> => ({
    date_iso: row.dateISO,
    weekday: row.weekday,
    fajr: row.fajr,
    fajr_iqamah: row.fajrIqamah ?? null,
    sunrise: row.sunrise,
    dhuhr: row.dhuhr,
    dhuhr_iqamah: row.dhuhrIqamah ?? null,
    asr: row.asr,
    asr_iqamah: row.asrIqamah ?? null,
    maghrib: row.maghrib,
    maghrib_iqamah: row.maghribIqamah ?? null,
    isha: row.isha,
    isha_iqamah: row.ishaIqamah ?? null,
    jumuah_khutbah: row.jumuahKhutbah ?? null,
  }));
}

function isAuthorized(request: NextRequest): boolean {
  if (!env.CRON_SECRET) {
    return false;
  }
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${env.CRON_SECRET}`;
}

export async function GET(request: NextRequest) {
  if (!env.CRON_SECRET) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured for prayer sync endpoint." },
      { status: 500 },
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sourceUrl = env.WATERLOO_PRAYERS_URL ?? DEFAULT_SOURCE_URL;

  try {
    const parsedWeek = await scrapeWeeklyPrayerTimes(sourceUrl);
    const payload = await getPayload({ config: configPromise });

    const existing = await payload.find({
      collection: "weekly-prayer-timings",
      where: {
        weekLabel: {
          equals: parsedWeek.weekLabel,
        },
      },
      limit: 1,
      pagination: false,
    });

    if (existing.docs.length > 0) {
      const currentDoc = existing.docs[0] as unknown as {
        id: string;
        rows?: unknown;
      };

      const payloadRows = toPayloadRows(parsedWeek.rows);
      const unchanged = JSON.stringify(currentDoc.rows ?? []) === JSON.stringify(payloadRows);
      if (unchanged) {
        return NextResponse.json({
          status: "skipped",
          reason: "No changes detected for this week.",
          weekLabel: parsedWeek.weekLabel,
          sourceUrl,
          rowCount: parsedWeek.rows.length,
        });
      }

      const updated = await payload.update({
        collection: "weekly-prayer-timings",
        id: currentDoc.id,
        data: {
          weekLabel: parsedWeek.weekLabel,
          weekStart: parsedWeek.weekStartISO,
          weekEnd: parsedWeek.weekEndISO,
          fetchedAt: parsedWeek.fetchedAtISO,
          sourceUrl: parsedWeek.sourceUrl,
          rows: payloadRows as never,
          rawSnapshot: parsedWeek.rawSnapshot,
        },
      });

      return NextResponse.json({
        status: "updated",
        id: updated.id,
        weekLabel: parsedWeek.weekLabel,
        sourceUrl,
        rowCount: parsedWeek.rows.length,
      });
    }

    const created = await payload.create({
      collection: "weekly-prayer-timings",
      data: {
        weekLabel: parsedWeek.weekLabel,
        weekStart: parsedWeek.weekStartISO,
        weekEnd: parsedWeek.weekEndISO,
        fetchedAt: parsedWeek.fetchedAtISO,
        sourceUrl: parsedWeek.sourceUrl,
        rows: toPayloadRows(parsedWeek.rows) as never,
        rawSnapshot: parsedWeek.rawSnapshot,
      },
    });

    return NextResponse.json({
      status: "created",
      id: created.id,
      weekLabel: parsedWeek.weekLabel,
      sourceUrl,
      rowCount: parsedWeek.rows.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown sync failure";
    console.error("Weekly prayer sync failed:", error);
    return NextResponse.json(
      {
        status: "error",
        error: message,
        sourceUrl,
      },
      { status: 500 },
    );
  }
}
