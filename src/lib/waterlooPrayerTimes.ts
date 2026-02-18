import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { PrayerTimes } from "@/lib/ramadan2026";

type LocalScrapedRow = {
  gregorian_date?: string;
  date?: string;
  fasting?: {
    fajr?: string;
    sunrise?: string;
    zuhr?: string;
    dhuhr?: string;
    asr?: string;
    maghrib?: string;
    isha?: string;
  };
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

type LocalScrapedFile =
  | LocalScrapedRow[]
  | {
      days?: LocalScrapedRow[];
    };

function cleanTime(value?: string): string {
  return (value || "").split(" ")[0] || "--:--";
}

function pickTime(...values: Array<string | undefined>): string {
  const found = values.find((value) => typeof value === "string" && value.trim().length > 0);
  return cleanTime(found);
}

export async function loadWaterlooPrayerTimes(): Promise<Record<string, PrayerTimes>> {
  const filePath = path.join(process.cwd(), "src/data/ramadan/waterloo-masjid-2026.json");
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as LocalScrapedFile;
  const rows = Array.isArray(parsed) ? parsed : parsed?.days;

  if (!Array.isArray(rows)) {
    throw new Error("Invalid Waterloo schedule file format.");
  }

  return rows.reduce<Record<string, PrayerTimes>>((acc, row) => {
    const prayerTimes = row.prayer_times || row.fasting || {};
    const isoDate = row.gregorian_date || row.date;
    if (!isoDate) return acc;

    acc[isoDate] = {
      fajr: pickTime(prayerTimes.fajr),
      sunrise: pickTime(prayerTimes.sunrise),
      dhuhr: pickTime(prayerTimes.dhuhr, prayerTimes.zuhr),
      asr: pickTime(prayerTimes.asr, row.prayer_times?.asr_shafi, row.prayer_times?.asr_hanafi),
      maghrib: pickTime(prayerTimes.maghrib),
      isha: pickTime(prayerTimes.isha),
    };

    return acc;
  }, {});
}
