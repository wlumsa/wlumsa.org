import { NextRequest, NextResponse } from "next/server";
import { addDays, parseISODate, RAMADAN_2026_START_DATE_ISO, toISODate } from "@/lib/ramadan2026";

function formatICSDate(isoDate: string): string {
  return isoDate.replace(/-/g, "");
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function buildAllDayEvent({
  uid,
  startISO,
  endISO,
  summary,
  description,
}: {
  uid: string;
  startISO: string;
  endISO: string;
  summary: string;
  description: string;
}): string {
  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART;VALUE=DATE:${formatICSDate(startISO)}`,
    `DTEND;VALUE=DATE:${formatICSDate(endISO)}`,
    `SUMMARY:${escapeICS(summary)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    "END:VEVENT",
  ].join("\r\n");
}

export async function GET(request: NextRequest) {
  const download = request.nextUrl.searchParams.get("download") === "1";

  const startDate = parseISODate(RAMADAN_2026_START_DATE_ISO);

  const events: string[] = [];

  for (let fast = 1; fast <= 30; fast += 1) {
    const date = addDays(startDate, fast - 1);
    const nextDate = addDays(date, 1);
    const startISO = toISODate(date);
    const endISO = toISODate(nextDate);

    events.push(
      buildAllDayEvent({
        uid: `ramadan-2026-fast-${fast}@wlumsa.org`,
        startISO,
        endISO,
        summary: `Ramadan Day ${fast} Fast`,
        description: "WLUMSA Ramadan 2026 daily fasting reminder.",
      })
    );

    if (fast >= 21 && fast <= 30) {
      events.push(
        buildAllDayEvent({
          uid: `ramadan-2026-last10-${fast}@wlumsa.org`,
          startISO,
          endISO,
          summary: `Last 10 Nights - Night ${fast}`,
          description: "WLUMSA reminder: prioritize worship in the last ten nights.",
        })
      );
    }

    if (fast >= 21 && fast <= 29 && fast % 2 === 1) {
      events.push(
        buildAllDayEvent({
          uid: `ramadan-2026-odd-${fast}@wlumsa.org`,
          startISO,
          endISO,
          summary: `Odd Night ${fast} - Laylatul Qadr Focus`,
          description: "WLUMSA reminder: seek Laylatul Qadr on odd nights.",
        })
      );
    }
  }

  const eidDate = addDays(startDate, 30);
  const eidISO = toISODate(eidDate);
  const eidEndISO = toISODate(addDays(eidDate, 1));

  events.push(
    buildAllDayEvent({
      uid: "ramadan-2026-eid@wlumsa.org",
      startISO: eidISO,
      endISO: eidEndISO,
      summary: "Eid al-Fitr (Estimated)",
      description: "Estimated Eid date for Ramadan 2026. Confirm with local moon sighting.",
    })
  );

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WLUMSA//Ramadan 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": download
        ? 'attachment; filename="wlumsa-ramadan-2026.ics"'
        : 'inline; filename="wlumsa-ramadan-2026.ics"',
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
