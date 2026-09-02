import type { CollectionAfterChangeHook } from "payload";

import type { Event } from "@/payload-types";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function relativeToEvent(eventDate: string, dayOffset: number, hour: number) {
  const date = new Date(eventDate);
  date.setTime(date.getTime() + dayOffset * DAY_IN_MS);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

export const createEventPlanningItems: CollectionAfterChangeHook<
  Event
> = async ({ doc, operation, req }) => {
  if (operation !== "create" || doc.planningTemplate === "none") return doc;

  const taskTemplate = [
    { title: "Confirm event details and location", dayOffset: -21 },
    { title: "Confirm event logistics", dayOffset: -14 },
    { title: "Confirm volunteers and responsibilities", dayOffset: -7 },
    { title: "Complete final event check", dayOffset: -1 },
  ];

  const promotionTemplate = [
    {
      title: "Instagram announcement",
      dayOffset: -17,
      format: "instagram_feed" as const,
    },
    {
      title: "Instagram story reminder",
      dayOffset: -8,
      format: "instagram_story" as const,
    },
    {
      title: "Instagram “Tomorrow” reminder",
      dayOffset: -1,
      format: "instagram_story" as const,
    },
    {
      title: "Instagram event-day story",
      dayOffset: 0,
      format: "instagram_story" as const,
    },
    {
      title: "Instagram thank-you or recap",
      dayOffset: 2,
      format: "instagram_feed" as const,
    },
  ];

  await Promise.all([
    ...taskTemplate.map((item) =>
      req.payload.create({
        collection: "event-tasks",
        data: {
          title: item.title,
          event: doc.id,
          dueDate: relativeToEvent(doc.date, item.dayOffset, 17),
          status: "not_started",
          createdFromTemplate: true,
        },
        req,
      })
    ),
    ...promotionTemplate.map((item) =>
      req.payload.create({
        collection: "content-schedule",
        data: {
          title: item.title,
          event: doc.id,
          scheduledFor: relativeToEvent(doc.date, item.dayOffset, 18),
          format: item.format,
          status: "not_started",
          department: "marketing",
          createdFromTemplate: true,
        },
        req,
      })
    ),
  ]);

  return doc;
};
