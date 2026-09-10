import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

export const link: CollectionConfig = {
  slug: "link",
  access: managedCollectionAccess,
  admin: {
    hidden: false, // Changed from true to false
    useAsTitle: "title",
    group: "Resources", // Group it with other resource-related collections
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

    // Add more fields as needed
  ],
};
