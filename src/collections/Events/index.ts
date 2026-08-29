import type { CollectionConfig } from "payload";
import { revalidateEventsPage } from "@/lib/revalidateEvents";
import { createEventPlanningItems } from "@/collections/EventPlanning/createPlanningItems";
import { departmentOptions } from "@/collections/EventPlanning/options";
import {
  deleteRelatedEventRecords,
  markRecurringEventException,
  syncRecurringEvents,
} from "@/collections/Events/recurrence";
import { validateRecurrenceEnd } from "@/collections/Events/recurrenceDates";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "name",
    group: "App",
  },
  hooks: {
    beforeChange: [markRecurringEventException],
    beforeDelete: [deleteRelatedEventRecords],
    afterChange: [
      async () => {
        await revalidateEventsPage();
      },
      createEventPlanningItems,
      syncRecurringEvents,
    ],
    afterDelete: [
      async () => {
        await revalidateEventsPage();
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Event name",
    },
    {
      name: "date",
      type: "date",
      required: true,
      label: "Date and Time",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "time",
      type: "text",
      required: false,
      label: "Display Time (optional)",
      admin: {
        position: "sidebar",
        description:
          "Optional. Fill only if you want a time shown on the site.",
      },
    },
    {
      name: "location",
      type: "text",
      required: false,
      label: "Location",
    },
    {
      name: "locationLink",
      type: "text",
      required: false,
      label: "Location Link (optional)",
      admin: {
        position: "sidebar",
        description:
          "Optional directions URL (e.g., Google Maps). Shows as 'Get directions' under location.",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Event Description",
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      required: false,
      label: "Image",
    },
    {
      name: "link",
      type: "text",
      required: false,
      label: "Link",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "planningLead",
      label: "Event lead",
      type: "relationship",
      relationTo: "execs",
      admin: {
        position: "sidebar",
        description: "The main person responsible for this event.",
      },
    },
    {
      name: "departments",
      type: "select",
      hasMany: true,
      options: departmentOptions,
      admin: {
        position: "sidebar",
        description: "Departments helping with this event.",
      },
    },
    {
      name: "planningTemplate",
      label: "Create planning schedule",
      type: "select",
      defaultValue: "standard",
      options: [
        { label: "Standard event", value: "standard" },
        { label: "Do not create a schedule", value: "none" },
      ],
      admin: {
        position: "sidebar",
        description:
          "When this event is first created, add the usual checklist and Instagram schedule automatically.",
      },
    },
    {
      name: "recurrence",
      label: "Repeats",
      type: "select",
      defaultValue: "none",
      options: [
        { label: "Does not repeat", value: "none" },
        { label: "Every week", value: "weekly" },
        { label: "Every two weeks", value: "biweekly" },
        { label: "Every month", value: "monthly" },
      ],
      admin: {
        position: "sidebar",
        description:
          "Each occurrence is created as a normal event so it can have its own tasks and edits.",
      },
    },
    {
      name: "recurrenceEnd",
      label: "Repeat until",
      type: "date",
      admin: {
        condition: (_, siblingData) => siblingData.recurrence !== "none",
        date: {
          pickerAppearance: "dayOnly",
        },
        position: "sidebar",
      },
      validate: (value, { siblingData }) => {
        const eventData = siblingData as {
          date?: Date | string | null;
          recurrence?: "biweekly" | "monthly" | "none" | "weekly";
        };

        return validateRecurrenceEnd(
          value,
          eventData.recurrence ?? "none",
          eventData.date
        );
      },
    },
    {
      name: "recurrenceExcludedDates",
      label: "Skipped dates",
      type: "array",
      admin: {
        condition: (_, siblingData) => siblingData.recurrence !== "none",
        description: "Occurrences will not be created on these dates.",
      },
      fields: [
        {
          name: "date",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayOnly",
            },
          },
        },
      ],
    },
    {
      name: "recurringParent",
      type: "relationship",
      relationTo: "events",
      index: true,
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: "recurrenceKey",
      type: "text",
      index: true,
      unique: true,
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: "recurrenceException",
      label: "Keep this occurrence independent",
      type: "checkbox",
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.recurringParent),
        description:
          "Edits to this occurrence will be preserved when the recurring event is updated.",
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
};
