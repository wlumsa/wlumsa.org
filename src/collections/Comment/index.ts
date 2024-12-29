import type { Access, CollectionConfig } from "payload";
import { auth as fetchAuth } from "@clerk/nextjs/server";
import { currentUser } from '@clerk/nextjs/server'
import payload from 'payload'
import { isUser } from '@/Utils/accessControl';


export const isAuthor: Access = async ({ req, id }) => {

  const user = await fetchAuth();
  if( req.user?.roles?.includes('admin')) {
    return true;
  }
  if(!user.userId){
    return false;
  }
  const comment = await payload.find({
    collection: 'comments',
    where: {
      "clerkId": {
        equals: id,
      },
    },
   
  });
  if(!comment) {
    return false;
  }

  return Boolean(comment);  ;
}


export const Comments: CollectionConfig = {
  slug: 'comments',
  labels: {
    singular: 'Comment',
    plural: 'Comments',
  },
  admin: {
    hidden: false,
    useAsTitle: 'comment',
  },
  access: {
   // read: async ({ req }) => await isUser({ req }),
    create: async ({ req }) => await isUser({ req }),
    update: async ({ req, id }) => await isAuthor({ req, id, }),
    delete: async ({ req, id }) => await isAuthor({ req, id,  }),
  
  },
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        if (operation === 'create') {
       
          const user = await currentUser();
          if (user) {
            data.author = `${user.firstName} ${user.lastName}`
            data.clerkId = user.id
            return data;
          }
        }
      },
    ],
  },
 
  fields: [
    {
      name: 'clerkId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'comment',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'postId',
      type: 'relationship',
      required: true,
      relationTo: 'RoommatePosts',
      hasMany: false,
    },
  ],
};

