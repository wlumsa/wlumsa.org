import type { CollectionConfig } from "payload";

import {
  adminsOnly,
  adminsOnlyField,
  authenticated,
  managersAndAdmins,
  managersAndAdminsField,
  managersOrAssigned,
} from "@/collections/EventPlanning/access";
import {
  departmentOptions,
  planningStatusOptions,
} from "@/collections/EventPlanning/options";

export const ContentSchedule: CollectionConfig = {
  slug: "content-schedule",
  labels: {
    singular: "Scheduled Post",
    plural: "Content Schedule",
  },
  admin: {
    group: "Event Planning",
    useAsTitle: "title",
    defaultColumns: ["title", "event", "scheduledFor", "format", "status"],
    description:
      "A lightweight posting schedule. Keep discussion in WhatsApp and designs in Canva.",
  },
  access: {
    create: managersAndAdmins,
    read: authenticated,
    update: managersOrAssigned,
    delete: adminsOnly,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      access: {
        update: managersAndAdminsField,
      },
    },
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
      index: true,
      access: {
        update: managersAndAdminsField,
      },
    },
    {
      name: "scheduledFor",
      label: "Post on",
      type: "date",
      required: true,
      index: true,
      access: {
        update: managersAndAdminsField,
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "format",
      type: "select",
      required: true,
      defaultValue: "instagram_story",
      access: {
        update: managersAndAdminsField,
      },
      options: [
        { label: "Instagram feed", value: "instagram_feed" },
        { label: "Instagram story", value: "instagram_story" },
        { label: "Email", value: "email" },
        { label: "Other", value: "other" },
      ],
      admin: {
        position: "sidebar",
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
      access: {
        update: managersAndAdminsField,
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "department",
      type: "select",
      defaultValue: "marketing",
      options: departmentOptions,
      access: {
        update: managersAndAdminsField,
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "createdFromTemplate",
      type: "checkbox",
      defaultValue: false,
      access: {
        create: adminsOnlyField,
        update: adminsOnlyField,
      },
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: "reminderSentAt",
      type: "date",
      access: {
        create: adminsOnlyField,
        update: adminsOnlyField,
      },
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
};
