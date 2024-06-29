import { CollectionConfig } from 'payload';

export const link: CollectionConfig = {
  slug: 'link',
  admin: {
    useAsTitle: 'title',
    group:'Admin'
  },
  fields: [
    {
      name:'title',
      type: 'text',
      required: false,
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
