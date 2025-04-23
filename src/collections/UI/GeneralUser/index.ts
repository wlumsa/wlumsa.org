import { CollectionConfig } from 'payload';
import {isUser } from '@/Utils/accessControl';
import { Access } from 'payload';
import {auth as fetchAuth} from "@clerk/nextjs/server";
import payload from 'payload';

export const isAuthor: Access = async ({ req }) => {
  if( req.user) {
    return true;
  }
  const user = await fetchAuth();
  if(!user.userId){
    return false;
  }
  const post = await payload.find({
    collection: 'GeneralUser',
    where: {
      "clerkId": {
        equals: user.userId,
      },
    },
   
  });
  if (!post || post.docs.length === 0) {
    return false;
  }
  return false;
}

export const GeneralUser: CollectionConfig = {
  slug: 'GeneralUser',
  access: {
    read: () => true,
    create: ({req}) => isUser({req}),
    update: ({req}) => isAuthor({ req }),
    delete: ({ req }) => isAuthor({ req }),
  },
  fields: [
    {
      name: 'clerkId',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Landlord', value: 'landlord' },
        { label: 'Parent', value: 'parent' },
        { label: 'Business', value: 'business' },
        { label: 'Alumni', value: 'alumni' },
      ],
    },
    {
      name: 'laurierEmail',
      type: 'text',
    },
    {
      name: 'studentId',
      type: 'text',
    },
     {
      name: 'year',
      type: 'text',

     },
    {
      name: 'program',
      type: 'text',
    },
    {
      name: 'newsletter',
      type: 'checkbox',
    },

   
    
  ],
  admin: {
    useAsTitle: 'email',
  },
  
};
export default GeneralUser;