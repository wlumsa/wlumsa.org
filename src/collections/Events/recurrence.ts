import type {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
  CollectionBeforeDeleteHook,
} from "payload";

import type { Event } from "@/payload-types";
import {
  getRecurringEventDates,
  MAX_OCCURRENCES,
} from "@/collections/Events/recurrenceDates";

const RECURRENCE_SYNC_CONTEXT = "recurrenceSync";

function relationshipID(value: null | number | { id: number } | undefined) {
  return typeof value === "object" && value ? value.id : value;
}

function recurrenceKey(parentID: Event["id"], occurrenceKey: string) {
  return `${parentID}:${occurrenceKey}`;
}

function sharedEventData(event: Event, date: string) {
  return {
    date,
    departments: event.departments ?? [],
    description: event.description,
    image: relationshipID(event.image),
    link: event.link,
    location: event.location,
    locationLink: event.locationLink,
    name: event.name,
    planningLead: relationshipID(event.planningLead),
    planningStatus: event.planningStatus ?? "planning",
    planningTemplate: event.planningTemplate ?? "standard",
    planningUpdate: event.planningUpdate,
    potentialVenue: event.potentialVenue,
    status: event.status ?? "draft",
    time: event.time,
  };
}

export const markRecurringEventException: CollectionBeforeChangeHook<Event> = ({
  context,
  data,
  operation,
  originalDoc,
}) => {
  if (
    operation === "update" &&
    originalDoc?.recurringParent &&
    context[RECURRENCE_SYNC_CONTEXT] !== true
  ) {
    return { ...data, recurrenceException: true };
  }

  return data;
};

export const syncRecurringEvents: CollectionAfterChangeHook<Event> = async ({
  context,
  doc,
  req,
}) => {
  if (
    context[RECURRENCE_SYNC_CONTEXT] === true ||
    doc.recurringParent ||
    !doc.id
  ) {
    return doc;
  }

  const expectedOccurrences = getRecurringEventDates(doc);
  const now = Date.now();
  const expectedByKey = new Map(
    expectedOccurrences
      .filter((occurrence) => new Date(occurrence.date).getTime() >= now)
      .map((occurrence) => [recurrenceKey(doc.id, occurrence.key), occurrence])
  );
  const existing = await req.payload.find({
    collection: "events",
    depth: 0,
    limit: MAX_OCCURRENCES + 25,
    overrideAccess: true,
    req,
    where: { recurringParent: { equals: doc.id } },
  });

  for (const occurrence of existing.docs) {
    const key = occurrence.recurrenceKey;

    if (new Date(occurrence.date).getTime() < now) {
      if (key) expectedByKey.delete(key);
      continue;
    }

    const expected = key ? expectedByKey.get(key) : undefined;

    if (occurrence.recurrenceException) {
      if (key) expectedByKey.delete(key);
      continue;
    }

    if (!expected) {
      await req.payload.delete({
        collection: "events",
        context: { [RECURRENCE_SYNC_CONTEXT]: true },
        id: occurrence.id,
        overrideAccess: true,
        req,
      });
      continue;
    }

    await req.payload.update({
      collection: "events",
      context: { [RECURRENCE_SYNC_CONTEXT]: true },
      data: sharedEventData(doc, expected.date),
      id: occurrence.id,
      overrideAccess: true,
      req,
    });
    expectedByKey.delete(key!);
  }

  for (const [key, occurrence] of expectedByKey) {
    await req.payload.create({
      collection: "events",
      context: { [RECURRENCE_SYNC_CONTEXT]: true },
      data: {
        ...sharedEventData(doc, occurrence.date),
        recurrence: "none",
        recurrenceException: false,
        recurrenceKey: key,
        recurringParent: doc.id,
      },
      overrideAccess: true,
      req,
    });
  }

  return doc;
};

export const deleteRelatedEventRecords: CollectionBeforeDeleteHook = async ({
  id,
  req,
}) => {
  const [children, tasks, content] = await Promise.all([
    req.payload.find({
      collection: "events",
      depth: 0,
      limit: MAX_OCCURRENCES + 25,
      overrideAccess: true,
      req,
      where: { recurringParent: { equals: id } },
    }),
    req.payload.find({
      collection: "event-tasks",
      depth: 0,
      limit: 500,
      overrideAccess: true,
      req,
      where: { event: { equals: id } },
    }),
    req.payload.find({
      collection: "content-schedule",
      depth: 0,
      limit: 500,
      overrideAccess: true,
      req,
      where: { event: { equals: id } },
    }),
  ]);

  for (const child of children.docs) {
    await req.payload.delete({
      collection: "events",
      id: child.id,
      overrideAccess: true,
      req,
    });
  }
  for (const task of tasks.docs) {
    await req.payload.delete({
      collection: "event-tasks",
      id: task.id,
      overrideAccess: true,
      req,
    });
  }
  for (const item of content.docs) {
    await req.payload.delete({
      collection: "content-schedule",
      id: item.id,
      overrideAccess: true,
      req,
    });
  }
};
