import type { Event as EventDoc, Media, WeeklyEvent } from "@/payload-types";

function buildMediaUrl(media: Media | null) {
  if (!media) return null;
  if (media.url) return media.url;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET;
  const filename = media.filename?.trim();

  if (!supabaseUrl || !bucket || !filename) return null;

  const prefix = media.prefix?.trim();
  const basePath = `${supabaseUrl}/storage/v1/object/public/${bucket}`;
  return prefix ? `${basePath}/${prefix}/${filename}` : `${basePath}/${filename}`;
}

function normalizeMeridiemSpacing(value: string) {
  return value.replace(/\s(?=(?:[APap]\.?M\.?)$)/, "\u00A0");
}

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
  return `${dateLabel} | ${normalizeMeridiemSpacing(timeLabel)}`;
}

export function formatWeeklyTime(timeValue: string | null | undefined) {
  if (!timeValue) return "Time TBD";
  const parsedDate = new Date(timeValue);
  if (Number.isNaN(parsedDate.getTime())) return "Time TBD";

  const formattedTime = new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedDate);

  return normalizeMeridiemSpacing(formattedTime);
}

function getEventMedia(event: EventDoc): Media | null {
  if (!event.image || typeof event.image !== "object") return null;
  return event.image;
}

export function getEventImageUrl(event: EventDoc) {
  return buildMediaUrl(getEventMedia(event));
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
  return buildMediaUrl(getWeeklyEventPrimaryImage(event));
}

export function getWeeklyEventImageAlt(event: WeeklyEvent) {
  const alt = getWeeklyEventPrimaryImage(event)?.alt?.trim();
  if (alt) return alt;
  return `${event.name} image`;
}
