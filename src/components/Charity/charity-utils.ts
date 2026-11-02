import type { Media } from "@/payload-types";

export const CHARITY_INSTAGRAM = "https://www.instagram.com/wlumsa.charity/";

export function getCurrentTimestamp() {
  return Date.now();
}

export function safeExternalURL(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

export function getMedia(value: Media | number | null | undefined) {
  return typeof value === "object" && value !== null ? value : null;
}

export function getMediaURL(value: Media | number | null | undefined) {
  const media = getMedia(value);
  if (!media) return null;
  if (media.url) return media.url;

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET;
  if (!base || !bucket || !media.filename) return null;
  const prefix = media.prefix ? media.prefix + "/" : "";
  return (
    base + "/storage/v1/object/public/" + bucket + "/" + prefix + media.filename
  );
}

export function formatCharityDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatCharityDateTime(value: string | null | undefined) {
  if (!value) return "Date to be announced";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date to be announced";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatMoney(amount: number, currency: "CAD" | "USD") {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
