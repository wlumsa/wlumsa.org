import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const revalidate = 86400;

type Mode = "astronomical" | "moon-sighting";
type Madhab = "shafi" | "hanafi";
type TimeSource = "waterloo-masjid" | "api";

type AlAdhanDay = {
  timings: Record<string, string>;
  date: {
    gregorian: {
      date: string;
    };
  };
};

type LocalSimpleRow = {
  date?: string;
  fajr?: string;
  sunrise?: string;
  dhuhr?: string;
  zuhr?: string;
  asr?: string;
  asr_shafi?: string;
  asr_hanafi?: string;
  maghrib?: string;
  isha?: string;
};

type LocalScrapedRow = {
  gregorian_date?: string;
  prayer_times?: {
    fajr?: string;
    sunrise?: string;
    dhuhr?: string;
    zuhr?: string;
    asr?: string;
    asr_shafi?: string;
    asr_hanafi?: string;
    maghrib?: string;
    isha?: string;
  };
};

function toISODate(raw: string): string {
  const [day, month, year] = raw.split("-");
  return `${year}-${month}-${day}`;
}

function cleanTime(value?: string): string {
  return (value || "").split(" ")[0] || "--:--";
}

function pickTime(...values: Array<string | undefined>): string {
  const found = values.find((value) => typeof value === "string" && value.trim().length > 0);
  return cleanTime(found);
}

function isWaterlooRequest(city: string, country: string, latitude?: string | null, longitude?: string | null): boolean {
  const byCity = city.toLowerCase().includes("waterloo") && country.toLowerCase().includes("canada");
  if (byCity) return true;

  const lat = Number(latitude);
  const lon = Number(longitude);
  if (Number.isNaN(lat) || Number.isNaN(lon)) return false;

  // Approximate bounding box around Waterloo Region.
  return lat >= 43.2 && lat <= 43.7 && lon >= -80.8 && lon <= -80.2;
}

async function loadWaterlooLocalSchedule(madhab: Madhab) {
  const filePath = path.join(process.cwd(), "src/data/ramadan/waterloo-masjid-2026.json");
  const raw = await readFile(filePath, "utf8");
  const rows = JSON.parse(raw) as Array<LocalSimpleRow | LocalScrapedRow>;

  if (!Array.isArray(rows)) {
    throw new Error("Invalid Waterloo schedule file format.");
  }

  const prayerTimesByDate = rows.reduce<Record<string, {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  }>>((acc, row) => {
    const simple = row as LocalSimpleRow;
    const scraped = row as LocalScrapedRow;
    const prayerTimes = scraped.prayer_times || {};

    const isoDate = simple.date || scraped.gregorian_date;
    if (!isoDate) return acc;

    const asr =
      madhab === "hanafi"
        ? pickTime(simple.asr_hanafi, prayerTimes.asr_hanafi, simple.asr, prayerTimes.asr, simple.asr_shafi, prayerTimes.asr_shafi)
        : pickTime(simple.asr_shafi, prayerTimes.asr_shafi, simple.asr, prayerTimes.asr, simple.asr_hanafi, prayerTimes.asr_hanafi);

    acc[isoDate] = {
      fajr: pickTime(simple.fajr, prayerTimes.fajr),
      sunrise: pickTime(simple.sunrise, prayerTimes.sunrise),
      dhuhr: pickTime(simple.dhuhr, simple.zuhr, prayerTimes.dhuhr, prayerTimes.zuhr),
      asr,
      maghrib: pickTime(simple.maghrib, prayerTimes.maghrib),
      isha: pickTime(simple.isha, prayerTimes.isha),
    };
    return acc;
  }, {});

  return prayerTimesByDate;
}

async function fetchMonth(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Prayer time request failed: ${response.status}`);
  }

  const payload = (await response.json()) as { data?: AlAdhanDay[] };
  return payload.data || [];
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const city = searchParams.get("city") || "Waterloo";
    const country = searchParams.get("country") || "Canada";
    const mode = (searchParams.get("mode") as Mode) || "astronomical";
    const madhab = (searchParams.get("madhab") as Madhab) || "shafi";
    const requestedSource = (searchParams.get("source") as TimeSource) || "api";

    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    const method = mode === "moon-sighting" ? 13 : 2;
    const school = madhab === "hanafi" ? 1 : 0;

    const isWaterloo = isWaterlooRequest(city, country, latitude, longitude);

    if (requestedSource === "waterloo-masjid" && isWaterloo) {
      try {
        const prayerTimesByDate = await loadWaterlooLocalSchedule(madhab);

        if (Object.keys(prayerTimesByDate).length > 0) {
          return NextResponse.json(
            {
              location: "Waterloo, Canada",
              mode,
              madhab,
              requestedSource,
              activeSource: "waterloo-masjid",
              supportsMadhab: false,
              prayerTimesByDate,
              source: "Waterloo Masjid PDF schedule (local JSON)",
            },
            {
              headers: {
                "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
              },
            }
          );
        }
      } catch {
        // Fall back to AlAdhan if local file is missing/invalid.
      }
    }

    const year = 2026;
    const months = [2, 3];

    const monthResponses = await Promise.all(
      months.map((month) => {
        const endpoint = latitude && longitude
          ? `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&method=${method}&school=${school}`
          : `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}&school=${school}`;
        return fetchMonth(endpoint);
      })
    );

    const allDays = monthResponses.flat();

    const prayerTimesByDate = allDays.reduce<Record<string, {
      fajr: string;
      sunrise: string;
      dhuhr: string;
      asr: string;
      maghrib: string;
      isha: string;
    }>>((acc, day) => {
      const isoDate = toISODate(day.date.gregorian.date);
      acc[isoDate] = {
        fajr: cleanTime(day.timings.Fajr),
        sunrise: cleanTime(day.timings.Sunrise),
        dhuhr: cleanTime(day.timings.Dhuhr),
        asr: cleanTime(day.timings.Asr),
        maghrib: cleanTime(day.timings.Maghrib),
        isha: cleanTime(day.timings.Isha),
      };
      return acc;
    }, {});

    return NextResponse.json(
      {
        location: latitude && longitude ? `Detected (${latitude}, ${longitude})` : `${city}, ${country}`,
        mode,
        madhab,
        requestedSource,
        activeSource: "api",
        supportsMadhab: true,
        prayerTimesByDate,
        source: "AlAdhan API",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Could not fetch prayer times" },
      { status: 500 }
    );
  }
}
