import type { Event } from "@/payload-types";

const EVENT_TIME_ZONE = "America/Toronto";
export const MAX_OCCURRENCES = 60;

type Recurrence = "biweekly" | "monthly" | "none" | "weekly";

type ZonedDateParts = {
  day: number;
  hour: number;
  minute: number;
  month: number;
  second: number;
  year: number;
};

const zonedDateFormatter = new Intl.DateTimeFormat("en-CA", {
  day: "2-digit",
  hour: "2-digit",
  hourCycle: "h23",
  minute: "2-digit",
  month: "2-digit",
  second: "2-digit",
  timeZone: EVENT_TIME_ZONE,
  year: "numeric",
});

function getPart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes
) {
  return Number(parts.find((part) => part.type === type)?.value);
}

function getZonedParts(date: Date): ZonedDateParts {
  const parts = zonedDateFormatter.formatToParts(date);

  return {
    day: getPart(parts, "day"),
    hour: getPart(parts, "hour"),
    minute: getPart(parts, "minute"),
    month: getPart(parts, "month"),
    second: getPart(parts, "second"),
    year: getPart(parts, "year"),
  };
}

function partsAsUTC(parts: ZonedDateParts) {
  return Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
}

function zonedPartsToDate(parts: ZonedDateParts) {
  let timestamp = partsAsUTC(parts);

  // Intl exposes the local wall-clock parts but not the offset. Iterating the
  // difference handles both standard time and daylight-saving time.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const actualParts = getZonedParts(new Date(timestamp));
    const adjustment = partsAsUTC(parts) - partsAsUTC(actualParts);
    timestamp += adjustment;
    if (adjustment === 0) break;
  }

  return new Date(timestamp);
}

function dateKey(parts: Pick<ZonedDateParts, "day" | "month" | "year">) {
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(
    parts.day
  ).padStart(2, "0")}`;
}

function addDays(parts: ZonedDateParts, days: number): ZonedDateParts {
  const date = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + days)
  );

  return {
    ...parts,
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
  };
}

function addMonths(parts: ZonedDateParts, months: number): ZonedDateParts {
  const monthIndex = parts.year * 12 + parts.month - 1 + months;
  const year = Math.floor(monthIndex / 12);
  const month = (monthIndex % 12) + 1;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  return {
    ...parts,
    day: Math.min(parts.day, daysInMonth),
    month,
    year,
  };
}

function getExcludedDates(event: Event) {
  return new Set(
    (event.recurrenceExcludedDates ?? [])
      .map((entry) => entry.date?.slice(0, 10))
      .filter((value): value is string => Boolean(value))
  );
}

export function getRecurringEventDates(event: Event) {
  const recurrence = event.recurrence ?? "none";
  if (recurrence === "none" || !event.recurrenceEnd) return [];

  const start = getZonedParts(new Date(event.date));
  const endKey = event.recurrenceEnd.slice(0, 10);
  const excludedDates = getExcludedDates(event);
  const occurrences: { date: string; key: string }[] = [];

  const candidateLimit = MAX_OCCURRENCES + excludedDates.size + 1;
  for (let index = 1; index <= candidateLimit; index += 1) {
    const nextParts =
      recurrence === "monthly"
        ? addMonths(start, index)
        : addDays(start, index * (recurrence === "biweekly" ? 14 : 7));
    const key = dateKey(nextParts);

    if (key > endKey) return occurrences;
    if (!excludedDates.has(key)) {
      if (occurrences.length === MAX_OCCURRENCES) break;
      occurrences.push({
        date: zonedPartsToDate(nextParts).toISOString(),
        key,
      });
    }
  }

  throw new Error(
    `A recurring event can generate at most ${MAX_OCCURRENCES} occurrences. Choose an earlier end date.`
  );
}

export function validateRecurrenceEnd(
  value: Date | null | string | undefined,
  recurrence: Recurrence,
  startDate: Date | null | string | undefined
) {
  if (recurrence === "none") return true;
  if (!value) return "Choose when this recurring event should end.";
  const endDate = value instanceof Date ? value.toISOString() : value;
  if (
    startDate &&
    endDate.slice(0, 10) <= dateKey(getZonedParts(new Date(startDate)))
  ) {
    return "The recurrence end date must be after the first event.";
  }
  return true;
}
