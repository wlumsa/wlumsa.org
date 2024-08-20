
import { Block } from 'payload'
import { lexicalEditor } from "@payloadcms/richtext-lexical";
export const NewsletterBlock: Block = {
  slug: 'Newsletter', // required
  imageURL: 'https://google.com/path/to/image.jpg',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'NewsletterBlock', // optional
  fields: [
    // required
    {
      name: 'Days',
      type: 'array',
      fields: [
        {
          name: 'Day',
          type: 'select',
          options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        },
        {
          name: 'Content',
          type: 'richText',
          editor: lexicalEditor({}),
        },
      ],
      minRows: 1,
      maxRows: 7,
      required: true,

    },
  ],
}
