import { NextRequest, NextResponse } from "next/server";
import {
  readWeeklyPrayerTimesCache,
  refreshWeeklyPrayerTimesCache,
} from "@/lib/waterlooWeeklyPrayerTimes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRON_SECRET = process.env.CRON_SECRET;

/** Vercel Cron sends Authorization: Bearer <CRON_SECRET>; allow that or manual refresh with same header. */
function isAuthorizedRefresh(request: NextRequest): boolean {
  if (!CRON_SECRET) return true; // allow if not set (e.g. local dev)
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${CRON_SECRET}`;
}

export async function GET(request: NextRequest) {
  try {
    const forceRefresh = request.nextUrl.searchParams.get("refresh") === "1";
    const isCron = isAuthorizedRefresh(request);

    // Refuse manual ?refresh=1 without auth
    if (forceRefresh && !isCron) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Refresh requires CRON_SECRET." },
        { status: 401 }
      );
    }

    // Cron (authorized GET with no query) or ?refresh=1 with auth → run scrape and update global
    const shouldRefresh = forceRefresh || isCron;

    if (!shouldRefresh) {
      const cached = await readWeeklyPrayerTimesCache();
      if (cached) {
        return NextResponse.json({
          source: "cache",
          data: cached,
        });
      }
    }

    const refreshed = await refreshWeeklyPrayerTimesCache();

    return NextResponse.json({
      source: "scraped",
      data: refreshed,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load weekly prayer times.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}