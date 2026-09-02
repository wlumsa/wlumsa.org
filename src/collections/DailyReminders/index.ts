import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

export const DailyReminders: CollectionConfig = {
  slug: "daily-reminders",
  access: managedCollectionAccess,
  admin: {
    useAsTitle: "reference",
    group: "App",
  },
  fields: [
    {
      name: "reference",
      type: "text",
      required: true,
      label: "Reference",
    },
    {
      name: "arabic",
      type: "text",
      required: true,
      label: "Arabic",
    },
    {
      name: "english",
      type: "text",
      required: true,
      label: "English",
    },
  ],
};
