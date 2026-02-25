import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

import configPromise from "@payload-config";
import { env } from "@/env.mjs";
import { scrapeWeeklyPrayerTimes } from "@/lib/prayer-times/weeklyWaterlooScraper";

export const runtime = "nodejs";

const DEFAULT_SOURCE_URL = "https://waterloomasjid.com/main/index.php/prayers";

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
      const currentDoc = existing.docs[0] as {
        id: string;
        rows?: unknown;
      };

      const unchanged = JSON.stringify(currentDoc.rows ?? []) === JSON.stringify(parsedWeek.rows);
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
          rows: parsedWeek.rows,
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
        rows: parsedWeek.rows,
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
