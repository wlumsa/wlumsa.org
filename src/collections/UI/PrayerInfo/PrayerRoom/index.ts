import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

const PrayerRooms: CollectionConfig = {
  slug: "prayer-rooms",
  access: managedCollectionAccess,
  admin: {
    group: "Prayer Info",
  },
  fields: [
    {
      name: "building",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
      maxLength: 50,
    },
    {
      name: "room_number",
      type: "number",
      max: 1000,
      required: true,
    },
  ],
};

export default PrayerRooms;
