import { NextRequest, NextResponse } from "next/server";

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

  const sourceUrl = request.nextUrl.searchParams.get("sourceUrl") ?? env.WATERLOO_PRAYERS_URL ?? DEFAULT_SOURCE_URL;

  try {
    const parsedWeek = await scrapeWeeklyPrayerTimes(sourceUrl);
    return NextResponse.json({
      status: "ok",
      sourceUrl: parsedWeek.sourceUrl,
      weekLabel: parsedWeek.weekLabel,
      weekStartISO: parsedWeek.weekStartISO,
      weekEndISO: parsedWeek.weekEndISO,
      fetchedAtISO: parsedWeek.fetchedAtISO,
      rowCount: parsedWeek.rows.length,
      rows: parsedWeek.rows,
      rawSnapshot: parsedWeek.rawSnapshot,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown scrape failure";
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
