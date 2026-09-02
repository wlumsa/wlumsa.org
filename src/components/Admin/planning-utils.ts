import type { ContentSchedule, EventTask } from "@/payload-types";

const PLANNING_TIME_ZONE = "America/Toronto";

export type PlanningCalendarItem = {
  date: string;
  href: string;
  id: string;
  kind: "content" | "event" | "task";
  title: string;
};

export function getRelatedEventName(
  event: ContentSchedule["event"] | EventTask["event"]
) {
  return typeof event === "object" ? event.name : null;
}

export function getDateKey(value: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    timeZone: PLANNING_TIME_ZONE,
    year: "numeric",
  }).formatToParts(new Date(value));

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

export function formatPlanningDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: PLANNING_TIME_ZONE,
  }).format(new Date(value));
}
