
import { Block } from 'payload'
import { lexicalEditor} from "@payloadcms/richtext-lexical";
export const NewsletterBlock: Block = {
  slug: 'Newsletter', // required
  imageURL: 'https://google.com/path/to/image.jpg',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'NewsletterBlock', // optional
  fields: [
    // required
   
    {
      name: 'Monday',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
        name: 'Tuesday',
        type: 'richText',
        editor: lexicalEditor({}),
      },
      {
        name: 'Wednesday',
        type: 'richText',
        editor: lexicalEditor({}),
      },

      {
        name: 'Thursday',
        type: 'richText',
        editor: lexicalEditor({}),
      },
      {
        name: 'Friday',
        type: 'richText',
        editor: lexicalEditor({}),
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
  ],
}
