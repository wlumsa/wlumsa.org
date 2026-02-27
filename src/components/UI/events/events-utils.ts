import type { Event as EventDoc, Media, WeeklyEvent } from "@/payload-types";

export function formatEventDate(dateValue: string | null | undefined) {
  if (!dateValue) return "Date TBD";
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return "Date TBD";

  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(parsedDate);
}

export function getEventDateLabel(event: EventDoc) {
  const dateLabel = formatEventDate(event.date);
  const timeLabel = event.time?.trim();
  if (!timeLabel) return dateLabel;
  return `${dateLabel} | ${timeLabel}`;
}

export function formatWeeklyTime(timeValue: string | null | undefined) {
  if (!timeValue) return "Time TBD";
  const parsedDate = new Date(timeValue);
  if (Number.isNaN(parsedDate.getTime())) return "Time TBD";

  const formattedTime = new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedDate);

  // Prevent "p.m./a.m." from wrapping onto a separate line on small screens.
  return formattedTime.replace(/\s(?=[ap]\.m\.$)/i, "\u00A0");
}

function getEventMedia(event: EventDoc): Media | null {
  if (!event.image || typeof event.image !== "object") return null;
  return event.image;
}

export function getEventImageUrl(event: EventDoc) {
  return getEventMedia(event)?.url ?? null;
}

export function getEventImageAlt(event: EventDoc) {
  const alt = getEventMedia(event)?.alt?.trim();
  if (alt) return alt;
  return `${event.name} image`;
}

export function getWeeklyEventPrimaryImage(event: WeeklyEvent): Media | null {
  if (!Array.isArray(event.image)) return null;
  const firstMedia = event.image.find((item) => typeof item === "object" && item !== null);
  return firstMedia ?? null;
}

export function getWeeklyEventImageUrl(event: WeeklyEvent) {
  return getWeeklyEventPrimaryImage(event)?.url ?? null;
}

export function getWeeklyEventImageAlt(event: WeeklyEvent) {
  const alt = getWeeklyEventPrimaryImage(event)?.alt?.trim();
  if (alt) return alt;
  return `${event.name} image`;
}
