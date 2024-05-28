import type { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  
  auth: true,
  fields: [
    {
      name:'email',
      type: 'email',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name:'phone_number',
      type:'number',
    },
    {
      name:'mylaurier_email',
      type: 'email'
    },

    // Add more fields as needed
  ],
}
