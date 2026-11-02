import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

import { managersAndAdmins } from "@/collections/EventPlanning/access";

const Nav: GlobalConfig = {
  slug: "nav",
  access: {
    update: managersAndAdmins,
  },
  hooks: {
    afterChange: [
      async () => {
        revalidatePath("/", "layout");
      },
    ],
  },

  fields: [
    {
      name: "items",
      type: "array",
      required: true,
      maxRows: 8,
      fields: [
        {
          name: "label",
          type: "text",
          required: false,
          index: true,
        },
        {
          name: "links",
          type: "array",
          required: true,
          maxRows: 8,
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
          ],
        },
      ],
    },
  ],
};

export default Nav;
