import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

export const Instagram: CollectionConfig = {
  slug: "Instagram",
  access: managedCollectionAccess,
  labels: {
    singular: "Instagram Post",
    plural: "Instagram Posts",
  },
  admin: {
    group: "Marketing",
  },

  timestamps: true,
  fields: [
    {
      name: "url",
      type: "text",
      required: true,
    },
  ],
};
