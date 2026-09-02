import type { CollectionConfig } from "payload";
import { revalidateEventsPage } from "@/lib/revalidateEvents";
import { managedCollectionAccess } from "@/collections/EventPlanning/access";

const Socials: CollectionConfig = {
  slug: "Socials",
  access: managedCollectionAccess,
  admin: {
    group: "UI",
  },
  hooks: {
    afterChange: [
      async () => {
        await revalidateEventsPage();
      },
    ],
    afterDelete: [
      async () => {
        await revalidateEventsPage();
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "link",
      type: "relationship",
      relationTo: "link",
      required: true,
      hasMany: false,
    },
    {
      name: "icon",
      type: "text",
      label: "svg of icon",
      required: true,
    },
  ],
};

export default Socials;
