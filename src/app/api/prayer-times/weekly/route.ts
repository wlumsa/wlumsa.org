import { NextRequest, NextResponse } from "next/server";
import {
  readWeeklyPrayerTimesCache,
  refreshWeeklyPrayerTimesCache,
} from "@/lib/waterlooWeeklyPrayerTimes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const forceRefresh = request.nextUrl.searchParams.get("refresh") === "1";

    if (!forceRefresh) {
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
