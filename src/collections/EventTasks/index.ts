import type { CollectionConfig } from "payload";

import { adminsOnly, authenticated } from "@/collections/EventPlanning/access";
import {
  departmentOptions,
  planningStatusOptions,
} from "@/collections/EventPlanning/options";

export const EventTasks: CollectionConfig = {
  slug: "event-tasks",
  labels: {
    singular: "Event Task",
    plural: "Event Tasks",
  },
  admin: {
    group: "Event Planning",
    useAsTitle: "title",
    defaultColumns: ["title", "event", "dueDate", "status", "assignees"],
    description: "Simple internal tasks connected to an event.",
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
      index: true,
    },
    {
      name: "dueDate",
      label: "Due date",
      type: "date",
      required: true,
      index: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "not_started",
      options: planningStatusOptions,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "assignees",
      type: "relationship",
      relationTo: "execs",
      hasMany: true,
      admin: {
        position: "sidebar",
        description: "The people responsible for completing this task.",
      },
    },
    {
      name: "department",
      type: "select",
      options: departmentOptions,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notes",
      type: "textarea",
      admin: {
        description:
          "Optional. Keep discussion in WhatsApp; use this only for a short final note if needed.",
      },
    },
    {
      name: "createdFromTemplate",
      type: "checkbox",
      defaultValue: false,
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: "reminderSentAt",
      type: "date",
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
};
