export type PrayerTimes = {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

export type RamadanDay = {
  isoDate: string;
  dayLabel: string;
  fastIndex: number | null;
  isFastingDay: boolean;
  isLastTen: boolean;
  isOddNight: boolean;
  isFirstTaraweeh: boolean;
  isEid: boolean;
  prayerTimes?: PrayerTimes;
};

export const RAMADAN_2026_START_DATE_ISO = "2026-02-19";

export function parseISODate(isoDate: string): Date {
  const [yearRaw = 2026, monthRaw = 1, dayRaw = 1] = isoDate.split("-").map(Number);
  const year = Number.isFinite(yearRaw) ? yearRaw : 2026;
  const month = Number.isFinite(monthRaw) ? monthRaw : 1;
  const day = Number.isFinite(dayRaw) ? dayRaw : 1;
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, days: number): Date {
  const value = new Date(date);
  value.setDate(value.getDate() + days);
  return value;
}

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(isoDate: string): string {
  const date = parseISODate(isoDate);
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(isoDate: string): string {
  const date = parseISODate(isoDate);
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getOrdinal(value: number): string {
  const v = value % 100;
  if (v >= 11 && v <= 13) return `${value}th`;
  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

export function buildRamadanDays(
  startDateISO: string,
  prayerTimesByDate: Record<string, PrayerTimes> = {}
): RamadanDay[] {
  const startDate = parseISODate(startDateISO);
  const days: RamadanDay[] = [];

  for (let fastIndex = 1; fastIndex <= 30; fastIndex += 1) {
    const currentDate = addDays(startDate, fastIndex - 1);
    const isoDate = toISODate(currentDate);

    days.push({
      isoDate,
      dayLabel: formatDisplayDate(isoDate),
      fastIndex,
      isFastingDay: true,
      isLastTen: fastIndex >= 21,
      isOddNight: fastIndex >= 21 && fastIndex <= 29 && fastIndex % 2 === 1,
      isFirstTaraweeh: fastIndex === 1,
      isEid: false,
      prayerTimes: prayerTimesByDate[isoDate],
    });
  }

  const eidDate = addDays(startDate, 30);
  const eidISO = toISODate(eidDate);

  days.push({
    isoDate: eidISO,
    dayLabel: formatDisplayDate(eidISO),
    fastIndex: null,
    isFastingDay: false,
    isLastTen: false,
    isOddNight: false,
    isFirstTaraweeh: false,
    isEid: true,
    prayerTimes: prayerTimesByDate[eidISO],
  });

  return days;
}

export function buildKeyDateSummary(startDateISO: string) {
  const startDate = parseISODate(startDateISO);
  const ramadan29 = toISODate(addDays(startDate, 28));
  const ramadan30 = toISODate(addDays(startDate, 29));
  const eidEstimate = toISODate(addDays(startDate, 30));

  return {
    ramadan29,
    ramadan30,
    eidEstimate,
  };
}

export function getLastThirdOfNight(
  currentDay?: PrayerTimes,
  nextDay?: PrayerTimes
): string | null {
  if (!currentDay || !nextDay) return null;

  const [rawMaghribHour, maghribMinute] = currentDay.maghrib.split(":").map(Number);
  const [rawNextFajrHour, nextFajrMinute] = nextDay.fajr.split(":").map(Number);

  if (
    Number.isNaN(rawMaghribHour) ||
    Number.isNaN(maghribMinute) ||
    Number.isNaN(rawNextFajrHour) ||
    Number.isNaN(nextFajrMinute)
  ) {
    return null;
  }

  const safeRawMaghribHour = rawMaghribHour ?? 0;
  const safeMaghribMinute = maghribMinute ?? 0;
  const safeRawNextFajrHour = rawNextFajrHour ?? 0;
  const safeNextFajrMinute = nextFajrMinute ?? 0;

  // Timetable data is often in 12-hour style without AM/PM (e.g., 7:35 for Maghrib).
  // Normalize with prayer-context assumptions while still supporting true 24-hour values.
  const maghribHour24 =
    safeRawMaghribHour >= 13
      ? safeRawMaghribHour
      : safeRawMaghribHour === 12
        ? 12
        : safeRawMaghribHour + 12;
  const nextFajrHour24 =
    safeRawNextFajrHour >= 13
      ? safeRawNextFajrHour
      : safeRawNextFajrHour === 12
        ? 0
        : safeRawNextFajrHour;

  const startMinutes = maghribHour24 * 60 + safeMaghribMinute;
  const nextFajrTotal = nextFajrHour24 * 60 + safeNextFajrMinute + 24 * 60;
  const duration = nextFajrTotal - startMinutes;
  const lastThirdStart = startMinutes + Math.floor((duration * 2) / 3);

  const normalized = lastThirdStart % (24 * 60);
  const hour24 = Math.floor(normalized / 60);
  const minute = String(normalized % 60).padStart(2, "0");
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}
