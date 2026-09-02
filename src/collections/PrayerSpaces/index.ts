import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

export const Masjid: CollectionConfig = {
  slug: "masjid",
  access: managedCollectionAccess,
  admin: {
    hidden: false,
    useAsTitle: "title",
    group: "Resources",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      hasMany: false,
      required: false,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "googleMapsLink",
      type: "text",
      required: true,
    },
    {
      name: "websiteLink",
      type: "text",
      required: false,
    },
  ],
};
