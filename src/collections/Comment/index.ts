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

  return Boolean(true);  ;
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
    read: async ({ req }) => true,
    create: async ({ req }) => await isUser({ req }),
    update: async ({ req, id }) => await isAuthor({ req, id, }),
    delete: async ({ req, id }) => await isAuthor({ req, id,  }),
  
  },
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation === 'create') {
          try {
            const clerkUser =  await fetchAuth();

  
            if (clerkUser) {
              // Find the user in the general-user collection by clerkId
              const generalUser = await req.payload.find({
                collection: 'general-user',
                where: {
                  clerkId: {
                    equals: clerkUser.userId,
                  },
                },
                limit: 1,
              });
  
              // if a user was found
              if (generalUser?.docs?.length > 0) {
                data.userId = generalUser.docs[0]?.id;
                data.author = `${generalUser.docs[0]?.firstName} ${generalUser.docs[0]?.lastName}`;
              } else {
                throw new Error('No matching user found in general-user collection');
              }
            }
  
            return data;
          } catch (error) {
            console.error('Error in beforeChange hook:', error);
            throw new Error('Failed');
          }
        }
      },
    ],
  },
 
  fields: [
   
    {
      name: 'author',
      type: 'text',
    },
    {
      name: 'comment',
      type: 'text',
      
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

export default Comments;