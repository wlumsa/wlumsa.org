import { NextRequest, NextResponse } from "next/server";
import { refreshWeeklyPrayerTimesCache } from "@/lib/waterlooWeeklyPrayerTimes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const authorizationHeader = request.headers.get("authorization");
  const token = authorizationHeader?.replace(/^Bearer\s+/i, "") ?? "";

  return token === secret;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await refreshWeeklyPrayerTimesCache();
    return NextResponse.json({
      ok: true,
      refreshedAt: snapshot.scrapedAt,
      rows: snapshot.rows.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
