import { CollectionConfig } from 'payload';

export const GeneralUser: CollectionConfig = {
  slug: 'general-user',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
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