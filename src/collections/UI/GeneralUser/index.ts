import { CollectionConfig } from 'payload';

export const GeneralUser: CollectionConfig = {
  slug: 'general-user',
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
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
   
    
  ],
  admin: {
    useAsTitle: 'email',
  },
  
};
export default GeneralUser;