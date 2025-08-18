import { CollectionConfig } from 'payload';

export const link: CollectionConfig = {
  slug: 'link',
  admin: {
   hidden: false, // Changed from true to false
   useAsTitle:'title',
   group: 'Resources', // Group it with other resource-related collections
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
