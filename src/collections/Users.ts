import type { CollectionConfig } from 'payload/types'
import { admins } from '@/access/admin'
import { anyone } from '@/access/anyone'
import adminsAndUser from './Users/access/adminAndUser'
import { checkRole } from './Users/checkRole'
import { ensureFirstUserIsAdmin } from './Users/hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './Users/hooks/loginAfterCreate'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    
    },
  ],
  timestamps: true,
}

export default Users