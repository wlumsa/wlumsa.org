import type { CollectionConfig } from 'payload/types'

export const link: CollectionConfig = {
  slug: 'link',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name:'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
   
    // Add more fields as needed
  ],
}
