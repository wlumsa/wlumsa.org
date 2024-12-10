import { CollectionConfig } from 'payload';

export const Comments: CollectionConfig = {
  slug: 'Comments',
  labels: {
    singular: 'Comment',
    plural: 'Comments',
  },
  admin: {
    hidden: false,
    useAsTitle:'comment'
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'comment',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'postId',
      type: 'relationship',
      relationTo: 'RoommatePosts',
      hasMany: true,
    },
  ],
}