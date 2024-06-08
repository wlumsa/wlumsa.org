import { isAdminFieldLevel } from '@/access/isAdmin'
import type { CollectionConfig } from 'payload/types'

export const departments: CollectionConfig = {
  slug: 'departments',
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
  ],
}
