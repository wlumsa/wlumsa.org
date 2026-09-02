import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

export const Tags: CollectionConfig = {
  slug: "tags",
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
    },
    {
      name: "color",
      label: "Hex Color Code for tags",
      type: "text",
      defaultValue: "#000000",
    },
  ],
};
