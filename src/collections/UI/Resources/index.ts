import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

const Resources: CollectionConfig = {
  slug: "resources",
  access: managedCollectionAccess,
  admin: {
    group: "UI",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        {
          label: "General Forms",
          value: "1",
        },
        {
          label: "Campus Resources",
          value: "2",
        },
        {
          label: "Religious Resources",
          value: "3",
        },
        {
          label: "Other",
          value: "4",
        },
      ],
    },
    {
      name: "link",
      type: "relationship",
      relationTo: "link",
      required: true,
      hasMany: true,
    },
  ],
};

export default Resources;
