import { CollectionConfig } from 'payload';
import {

  lexicalEditor,

} from "@payloadcms/richtext-lexical";
import { lexicalToPlainTextFieldHook } from '@/Utils/converter';
export const Posts: CollectionConfig = {
  slug: "Posts",
  labels:{
    singular: "Blog Post",
    plural: "Blog Posts",
  },
  admin: {

    group: "Marketing",
   /*  livePreview: {
      url: 'www.wlumsa.org/blog', 
    }, */
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
      required: true,
    },
    {
      name: "categories",
      type: "relationship",
      required: true,
      relationTo: "categories",
      hasMany: false,
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
