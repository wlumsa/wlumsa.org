import { CollectionConfig } from 'payload';
import {

  lexicalEditor,

} from "@payloadcms/richtext-lexical";
import { lexicalToPlainTextFieldHook } from '@/Utils/converter';
export const Posts: CollectionConfig = {
  slug: "Posts",
  admin: {
    useAsTitle: "Title",
    group: "Admin",
  },

  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "text",
      maxLength: 100,
    },
    {
      name: "header_image",
      label: "Header Image",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },

    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
       
      }),
    },
    {
      name: "plaintext",
      type: "text",
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "authors",
      type: "relationship",
      relationTo: "execs",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
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
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        condition: (data, siblingData, { user }) => {
          if (data.status === "published") {
            return true;
          } else {
            return false;
          }
        },
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
  ],
};
