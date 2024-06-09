// import { isAdminFieldLevel } from '@/access/isAdmin'
import type { CollectionConfig } from 'payload/types'

export const Execs: CollectionConfig = {
  slug: 'execs',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
//   access : {
//     create: isAdmin,
//     read: isAdminOrSelf,
//     update: isAdminOrSelf,
//     delete: isAdmin,
//   },
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
    {
      name:"roles",
      saveToJWT: true,
      type:'select',
      // access:{
      //   create:isAdminFieldLevel,
      //   update:isAdminFieldLevel,
      // },
      options:[
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        }
      ]
    }
    // Add more fields as needed
  ],
}
