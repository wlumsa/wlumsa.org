import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

export const WATERLOO_PRAYER_TIMES_URL = "https://waterloomasjid.com/main/index.php/prayers";

const CACHE_FILE_PATH = process.env.VERCEL === "1"
  ? path.join("/tmp", "waterloo-weekly-prayer-times.json")
  : path.join(
      process.cwd(),
      "src",
      "data",
      "prayer-times",
      "waterloo-weekly-prayer-times.json"
    );
const CHROMIUM_PACK_URL = process.env.CHROMIUM_PACK_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/chromium-pack.tar`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/chromium-pack.tar`
      : null);

export type WeeklyPrayerTimesSnapshot = {
  sourceUrl: string;
  scrapedAt: string;
  weekLabel: string | null;
  headers: string[];
  rows: Array<Record<string, string>>;
};

function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeHeader(header: string, index: number): string {
  const cleaned = cleanText(header);
  if (!cleaned) return `column_${index + 1}`;

  const normalized = cleaned
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return normalized || `column_${index + 1}`;
}

let cachedServerlessExecutablePath: string | null = null;
let chromiumDownloadPromise: Promise<string> | null = null;

async function getServerlessExecutablePath(): Promise<string> {
  if (!CHROMIUM_PACK_URL) {
    throw new Error(
      "Missing CHROMIUM_PACK_URL or Vercel URL env for serverless Chromium package."
    );
  }

  if (cachedServerlessExecutablePath) {
    return cachedServerlessExecutablePath;
  }

  if (!chromiumDownloadPromise) {
    chromiumDownloadPromise = import("@sparticuz/chromium-min")
      .then((chromium) => chromium.default.executablePath(CHROMIUM_PACK_URL))
      .then((resolvedPath) => {
        cachedServerlessExecutablePath = resolvedPath;
        return resolvedPath;
      })
      .catch((error) => {
        chromiumDownloadPromise = null;
        throw error;
      });
  }

  return chromiumDownloadPromise;
}

async function getLocalExecutablePath(): Promise<string | undefined> {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const localCandidates = process.platform === "win32"
    ? [
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      ]
    : process.platform === "darwin"
      ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
      : ["/usr/bin/google-chrome", "/usr/bin/chromium-browser", "/usr/bin/chromium"];

  for (const candidate of localCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      continue;
    }
  }

  return undefined;
}

export async function scrapeWaterlooWeeklyPrayerTimes(): Promise<WeeklyPrayerTimesSnapshot> {
  const isServerless = process.env.VERCEL === "1" || process.env.AWS_EXECUTION_ENV;
  const executablePath = isServerless
    ? await getServerlessExecutablePath()
    : await getLocalExecutablePath();
  const chromium = isServerless ? (await import("@sparticuz/chromium-min")).default : null;

  const browser = await puppeteer
    .launch({
      headless: true,
      channel: !isServerless && !executablePath ? "chrome" : undefined,
      executablePath,
      args: isServerless
        ? chromium?.args
        : ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: { width: 1365, height: 900 },
      protocolTimeout: 120000,
      timeout: 120000,
    })
    .catch((error) => {
      throw new Error(
        [
          "Unable to launch a Chromium/Chrome browser for scraping.",
          "If local, set PUPPETEER_EXECUTABLE_PATH to your Chrome binary. If Vercel, verify /chromium-pack.tar exists and CHROMIUM_PACK_URL resolves.",
          `Original error: ${error instanceof Error ? error.message : "Unknown error"}`,
        ].join(" ")
      );
    });

  try {
    const page = await browser.newPage();
    await page.goto(WATERLOO_PRAYER_TIMES_URL, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForSelector("#main-timetable-large .row", { timeout: 20000 });

    const scraped = (await page.evaluate(`
      (() => {
        const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();

        const timetableRoot = document.querySelector("#main-timetable-large");
        if (!timetableRoot) {
          throw new Error("Could not find #main-timetable-large on the page.");
        }

        const rowNodes = Array.from(timetableRoot.querySelectorAll(".row"));
        const headers = ["ramadan", "month_year", "date_day", "row_mark"];

        const rows = rowNodes.map((row) => {
          const entry = {
            ramadan: compact(row.querySelector(".row-head .ramadan")?.textContent),
            month_year: compact(row.querySelector(".row-head .monthyear")?.textContent),
            date_day: compact(row.querySelector(".row-head .dateday")?.textContent),
            row_mark: compact(row.querySelector(".row-head .row-mark")?.textContent),
          };

          const timeCells = Array.from(row.querySelectorAll(".row-body .time-cell"));
          timeCells.forEach((cell) => {
            const prayerName = compact(cell.querySelector(".time-name")?.textContent);
            if (!prayerName) return;

            const startKey = prayerName + "_start";
            const iqamahKey = prayerName + "_iqamah";
            entry[startKey] = compact(cell.querySelector(".time-start")?.textContent);
            entry[iqamahKey] = compact(cell.querySelector(".time-iqamah")?.textContent);

            if (!headers.includes(startKey)) headers.push(startKey);
            if (!headers.includes(iqamahKey)) headers.push(iqamahKey);
          });

          return entry;
        });

        const firstRow = rows[0];
        const weekLabel = firstRow
          ? compact([firstRow.month_year, firstRow.date_day].filter(Boolean).join(" - "))
          : null;

        return {
          weekLabel,
          headers,
          rows,
        };
      })()
    `)) as { weekLabel: string | null; headers: string[]; rows: Array<Record<string, string>> };

    const sanitizedRows = scraped.rows.map((row) => {
      const cleaned: Record<string, string> = {};
      Object.entries(row).forEach(([key, value], index) => {
        cleaned[normalizeHeader(key, index)] = cleanText(value);
      });
      return cleaned;
    });

    return {
      sourceUrl: WATERLOO_PRAYER_TIMES_URL,
      scrapedAt: new Date().toISOString(),
      weekLabel: scraped.weekLabel ? cleanText(scraped.weekLabel) : null,
      headers: scraped.headers.map((header, index) => normalizeHeader(header, index)),
      rows: sanitizedRows,
    };
  } finally {
    await browser.close();
  }
}

export async function readWeeklyPrayerTimesCache(): Promise<WeeklyPrayerTimesSnapshot | null> {
  try {
    const raw = await readFile(CACHE_FILE_PATH, "utf8");
    return JSON.parse(raw) as WeeklyPrayerTimesSnapshot;
  } catch {
    return null;
  }
}

export async function refreshWeeklyPrayerTimesCache(): Promise<WeeklyPrayerTimesSnapshot> {
  const snapshot = await scrapeWaterlooWeeklyPrayerTimes();
  await mkdir(path.dirname(CACHE_FILE_PATH), { recursive: true });
  await writeFile(CACHE_FILE_PATH, JSON.stringify(snapshot, null, 2), "utf8");
  return snapshot;
}
