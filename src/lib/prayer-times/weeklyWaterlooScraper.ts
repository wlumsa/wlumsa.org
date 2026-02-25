import "server-only";

import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium } from "playwright-core";

export type ScrapedPrayerDay = {
  dateISO: string;
  weekday: string;
  fajr: string;
  fajrIqamah?: string;
  sunrise: string;
  dhuhr: string;
  dhuhrIqamah?: string;
  asr: string;
  asrIqamah?: string;
  maghrib: string;
  maghribIqamah?: string;
  isha: string;
  ishaIqamah?: string;
  jumuahKhutbah?: string;
};

export type ScrapedPrayerWeek = {
  sourceUrl: string;
  weekStartISO: string;
  weekEndISO: string;
  weekLabel: string;
  fetchedAtISO: string;
  rows: ScrapedPrayerDay[];
  rawSnapshot: {
    headers: string[];
    prayers: Array<{ prayer: string; cells: string[] }>;
  };
};

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function normalizeText(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

function extractTimes(cellText: string): string[] {
  const matches = cellText.match(/\d{1,2}:\d{2}\s*(?:AM|PM)?/gi);
  return matches?.map((value) => normalizeText(value).toUpperCase()) ?? [];
}

function parseDayHeaderToDateISO(headerText: string, fallbackDate: Date): string {
  const normalized = normalizeText(headerText);
  const year = fallbackDate.getUTCFullYear();
  const attempts = [year - 1, year, year + 1].map(
    (candidateYear) => new Date(`${normalized} ${candidateYear}`),
  );
  const parsed = attempts.find((date) => !Number.isNaN(date.getTime()));
  const date = parsed ?? fallbackDate;
  return date.toISOString().slice(0, 10);
}

function getPrayerValuesForDay(
  prayerRowMap: Map<string, string[]>,
  rowMatcher: RegExp,
  dayIndex: number,
): string {
  for (const [prayerName, cells] of prayerRowMap.entries()) {
    if (rowMatcher.test(prayerName)) {
      return cells[dayIndex] ?? "";
    }
  }
  return "";
}

function toWeekdayName(dateISO: string): string {
  const parsed = new Date(`${dateISO}T00:00:00.000Z`);
  return WEEKDAY_NAMES[parsed.getUTCDay()] ?? "";
}

export async function scrapeWeeklyPrayerTimes(sourceUrl: string): Promise<ScrapedPrayerWeek> {
  const executablePath = process.env.VERCEL ? await chromium.executablePath() : undefined;
  const browser = await playwrightChromium.launch({
    headless: true,
    executablePath,
    args: process.env.VERCEL ? chromium.args : [],
  });

  try {
    const page = await browser.newPage();
    await page.goto(sourceUrl, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForSelector("#main-timetable-large .row", { timeout: 30_000 });

    const snapshot = await page.evaluate(() => {
      const container = document.querySelector("#main-timetable-large");
      if (!container) {
        throw new Error("Weekly prayer timetable container was not rendered.");
      }

      const rowCards = Array.from(container.querySelectorAll(".row"));
      if (!rowCards.length) {
        throw new Error("Weekly prayer timetable rows were not rendered.");
      }

      const headers = ["prayer", ...rowCards.map((row) => {
        const dateText = row.querySelector(".dateday")?.textContent ?? "";
        return dateText.replace(/\s+/g, " ").trim();
      })];

      const prayerNames = [
        { key: "fajr", aliases: ["fajr"] },
        { key: "sunrise", aliases: ["sunrise"] },
        { key: "dhuhr", aliases: ["dhuhr", "zuhr"] },
        { key: "asr", aliases: ["asr"] },
        { key: "maghrib", aliases: ["maghrib", "magrib"] },
        { key: "isha", aliases: ["isha"] },
      ];
      const prayers = prayerNames.map(({ key, aliases }) => {
        const cells = rowCards.map((row) => {
          const timeCells = Array.from(row.querySelectorAll(".time-cell"));
          const matchedCell = timeCells.find((cell) => {
            const prayerName = cell.querySelector(".time-name")?.textContent ?? "";
            const normalized = prayerName.replace(/\s+/g, " ").trim().toLowerCase();
            return aliases.some((alias) => normalized.includes(alias));
          });
          const start = matchedCell?.querySelector(".time-start")?.textContent ?? "";
          const iqamah = matchedCell?.querySelector(".time-iqamah")?.textContent ?? "";
          return [start, iqamah].filter(Boolean).map((v) => v.replace(/\s+/g, " ").trim()).join(" ");
        });
        return { prayer: key, cells };
      });

      return { headers, prayers };
    });

    if (snapshot.headers.length < 8) {
      throw new Error(
        `Expected at least 8 table headers (Prayer + 7 days), got ${snapshot.headers.length}.`,
      );
    }

    const dayHeaders = snapshot.headers.slice(1, 8);
    if (dayHeaders.length !== 7) {
      throw new Error(`Expected 7 day columns, found ${dayHeaders.length}.`);
    }

    const prayerRowMap = new Map<string, string[]>(
      snapshot.prayers.map((row) => [normalizeText(row.prayer).toLowerCase(), row.cells]),
    );

    const now = new Date();
    const rows: ScrapedPrayerDay[] = dayHeaders.map((header, index) => {
      const fallback = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + index));
      const dateISO = parseDayHeaderToDateISO(header, fallback);

      const fajrCell = getPrayerValuesForDay(prayerRowMap, /fajr/, index);
      const sunriseCell = getPrayerValuesForDay(prayerRowMap, /sunrise/, index);
      const dhuhrCell = getPrayerValuesForDay(prayerRowMap, /dhuhr|zuhr/, index);
      const asrCell = getPrayerValuesForDay(prayerRowMap, /asr/, index);
      const maghribCell = getPrayerValuesForDay(prayerRowMap, /magrib|maghrib/, index);
      const ishaCell = getPrayerValuesForDay(prayerRowMap, /isha/, index);

      const fajrTimes = extractTimes(fajrCell);
      const sunriseTimes = extractTimes(sunriseCell);
      const dhuhrTimes = extractTimes(dhuhrCell);
      const asrTimes = extractTimes(asrCell);
      const maghribTimes = extractTimes(maghribCell);
      const ishaTimes = extractTimes(ishaCell);

      return {
        dateISO,
        weekday: toWeekdayName(dateISO),
        fajr: fajrTimes[0] ?? normalizeText(fajrCell),
        fajrIqamah: fajrTimes[1],
        sunrise: sunriseTimes[0] ?? normalizeText(sunriseCell),
        dhuhr: dhuhrTimes[0] ?? normalizeText(dhuhrCell),
        dhuhrIqamah: dhuhrTimes[1],
        asr: asrTimes[0] ?? normalizeText(asrCell),
        asrIqamah: asrTimes[1],
        maghrib: maghribTimes[0] ?? normalizeText(maghribCell),
        maghribIqamah: maghribTimes[1],
        isha: ishaTimes[0] ?? normalizeText(ishaCell),
        ishaIqamah: ishaTimes[1],
        jumuahKhutbah: dhuhrTimes.length > 2 ? dhuhrTimes.slice(2).join(" | ") : undefined,
      };
    });

    const requiredMissing = rows.some(
      (row) => !row.fajr || !row.sunrise || !row.dhuhr || !row.asr || !row.maghrib || !row.isha,
    );
    if (requiredMissing) {
      throw new Error("Parsed rows are missing one or more required prayer columns.");
    }

    const weekStartISO = rows[0]?.dateISO ?? new Date().toISOString().slice(0, 10);
    const weekEndISO = rows[6]?.dateISO ?? weekStartISO;
    const weekLabel = `${weekStartISO}_${weekEndISO}`;

    return {
      sourceUrl,
      weekStartISO,
      weekEndISO,
      weekLabel,
      fetchedAtISO: new Date().toISOString(),
      rows,
      rawSnapshot: snapshot,
    };
  } finally {
    await browser.close();
  }
}
