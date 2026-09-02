import type { CollectionConfig } from "payload";

import { managedCollectionAccess } from "@/collections/EventPlanning/access";

const Jummah: CollectionConfig = {
  slug: "jummah-timings",
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
      name: "room_number",
      label: "Room Number",
      type: "number",
      required: false,
    },
    {
      name: "timing",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "timeOnly",
          displayFormat: "h:mm aa",
          timeIntervals: 30,
        },
      },
    },
  ],
};

export default Jummah;
