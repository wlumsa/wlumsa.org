import { CollectionConfig } from "payload";
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import type { HTMLConverter } from "@payloadcms/richtext-lexical";
let isDatePicked = false;
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
  access: {
    update: () => true,
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
      name: "attachments",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },

    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML("content", {
      name: "content_html",
    }),

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
        position: "sidebar",
      },
    },

    {
      name: "publishedAt",
      type: "date",
      required: true,
      label:"Published At Date (max allowed is 3 days from now)",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
        condition: (siblingData, data) => {
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
      relationTo: "distribution-list",
      hasMany: false,
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
    {
      name: "Send",
      label: "Send Email",
      type: "checkbox",
      hooks: {
        afterChange: [
          async ({ req, originalDoc, siblingData }) => {
            if (siblingData.Send === true) {
              const body = {
                title: siblingData.title,
                subject: siblingData.subject,
                headerImage: siblingData.headerImage,
                publishedAt: siblingData.publishedAt,
                content: siblingData.content,
                distributionListId: siblingData.distributionList,
                content_html: siblingData.content_html,
              };

              // Log the body to check its contents
              console.log("Request Body:", JSON.stringify(body));

              const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sendByDistributionList`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(JSON.stringify(body)).toString(), // Set Content-Length manually
                  },
                  body: JSON.stringify(body),
                }
              );

              console.log("API REQUEST:", response.status);
            }
          },
        ],
      },
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
  ],
};
