
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
      type:'select',
      options:[ 
        {
          label:'Marketing',
          value:'marketing',
        },
        {
          label:'Events Brothers',
          value:'events_brothers',
        },
        {
          label:'Events Sisters',
          value:'events_sisters',
        },
        {
          label:'Religious Affairs Brothers',
          value:'religious_affairs_brothers',
        },
        {
          label:'Religious Affairs Sisters',
          value:'religious_affairs_sisters',
        },
        {
          label:'Finance',
          value:'finance',
        },
        {
          label:'Community Enagagement',
          value:'community_engagement',
        },
        {
          label:'Operations',
          value:'operations',
        },
        {
          label:'Technology',
          value:'technology',
        },
      ]
    },
    {
      name:"position",
      type:'select',
      options:[
        {
          label:'Vice President',
          value:'vice_president',
        },
        {
          label:'Head Director',
          value:'head_director',
        },
        {
          label:'Director',
          value:'director',
        }
      ]
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
