
import type { CollectionConfig } from 'payload/types'

export const Execs: CollectionConfig = {
  slug: 'execs',
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
  },
  // access : {
  //   create: isAdmin,
  //   read: isAdminOrSelf,
  //   update: isAdminOrSelf,
  //   delete: isAdmin,
  // },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name:'email',
      type: 'email',
      required: true,
    },
    {
      name:"department",
      type:'relationship',
      relationTo: 'departments',
        
    },
    {
      name:'student id',
      type:'number',
    },
    {
      name:'major',
      type:'text',
    },
    {
      name:'year',
      type:'number',
    },
    {
      name:'phone number',
      type:'number',
    },
    {
      name:'mylaurier email',
      type: 'email'
    },
    {
      name:'city',
      type:'text',
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
