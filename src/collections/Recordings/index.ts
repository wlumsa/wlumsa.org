import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

export const Recording: CollectionConfig = {
  slug: "recording",
  access: managedCollectionAccess,
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: false,
      index: true,
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Halaqah", value: "1" },
        { label: "Khutbah", value: "2" },
        { label: "Guest speaker", value: "3" },
        { label: "Ramadan Series", value: "4" },
      ],
    },
  ],
};
