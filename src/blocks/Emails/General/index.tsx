
import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { lexicalToMarkdownFieldHook } from '@/Utils/converter'
export const GeneralBlock: Block = {
  slug: 'General', // required
  imageURL: 'https://google.com/path/to/image.jpg',
  imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: 'GeneralBlock', // optional
  fields: [
    // required
   
    {
      name: 'Form Link',
      type: 'text',
    },
    {
      name: 'Date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
      {
        name: 'Content',
        type: 'richText',
        editor: lexicalEditor({}),
        hooks: {
          afterChange: [lexicalToMarkdownFieldHook],
        },
       
      },

  ],
  
}