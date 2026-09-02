import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    hidden: true,
    useAsTitle: "title",
  },
  access: {
    ...managedCollectionAccess,
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
  ],
};
