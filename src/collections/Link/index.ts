import { CollectionConfig } from 'payload';

export const link: CollectionConfig = {
  slug: 'link',
  admin: {
   hidden: true,
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
