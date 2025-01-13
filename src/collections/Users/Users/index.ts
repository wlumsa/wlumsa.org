// import { isAdminFieldLevel } from '@/access/isAdmin'
import { CollectionConfig } from "payload";

export const GeneralUser: CollectionConfig = {
  slug: "general-user",
  admin: {
    group: "users",
  },
  fields: [
    {
      name: "user_id",
      type: "text",
      required: true,
    },
  ],
};
