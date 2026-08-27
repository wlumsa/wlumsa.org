import type { CollectionConfig } from "payload";
import { revalidateEventsPage } from "@/lib/revalidateEvents";
import { createEventPlanningItems } from "@/collections/EventPlanning/createPlanningItems";
import { departmentOptions } from "@/collections/EventPlanning/options";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "name",
    group: "App",
  },
  hooks: {
    afterChange: [
      async () => {
        await revalidateEventsPage();
      },
      createEventPlanningItems,
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
  ],
};
