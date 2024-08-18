
import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
export const EventBlock: Block = {
  slug: 'Event', // required
  imageURL: 'https://google.com/path/to/image.jpg',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'EventBlock', // optional
  fields: [
    // required
    
    {
      name: 'Form Link',
      type: 'text',
    },
    {
        name: 'Event Date',
        type: 'date',
        admin: {
          date: {
            pickerAppearance: 'dayOnly',
            displayFormat: 'd MMM yyy',
          },
        },
      },

      {
        name: 'Event Information',
        type: 'richText',
        editor: lexicalEditor({}),
      },

  ],
}