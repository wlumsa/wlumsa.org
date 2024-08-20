import { CollectionConfig } from "payload";
import { NewsletterBlock } from "@/blocks/Emails/Newsletter";
import { EventBlock } from "@/blocks/Emails/Event";
import { GeneralBlock } from "@/blocks/Emails/General";
export const EmailCollection: CollectionConfig = {
  slug: "email-collection",
  labels: {
    singular: "Email Collection",
    plural: "Email Collection",
  },
  admin: {
    group: "Marketing",
    description: "Collection of emails for marketing purposes",
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "subject",
      type: "text",
      //  maxLength: 100,
    },
    {
      name: "layout", // required
      type: "blocks", // required
      minRows: 1,
      maxRows: 20,
      blocks: [
        // required
        NewsletterBlock,
        EventBlock,
        GeneralBlock,
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      admin: {
        position: "sidebar"
      }
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        condition: (siblingData) => {
          if (siblingData.status == "published") {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    {
      name: "distributionList",
      label: "Distribution List(s)",
      type: "relationship",
      relationTo: "distribuitionList",
      hasMany: true,
      required: true,
      admin: {
        condition: (siblingData) => {
          if (siblingData.status === "published") {
            return true;
          } else {
            return false;
          }
        },
        position: "sidebar",
      },
    },
  ],
};
