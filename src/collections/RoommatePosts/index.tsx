import { CollectionConfig } from 'payload';
import { isUser } from '@/Utils/accessControl';
import { Access } from 'payload';
import { auth as fetchAuth } from "@clerk/nextjs/server";
import payload from 'payload';
import { currentUser } from '@clerk/nextjs/server'

export const isAuthor: Access = async ({ req, id }) => {
  if (req.user?.roles?.includes('admin')) {
    return true;
  }
  const user = await fetchAuth();
  if (!user.userId) {
    return false;
  }
  const post = await payload.find({
    collection: 'RoommatePosts',
    where: {
      "clerkId": {
        equals: id,
      },
    },

  });
  if (!post) {
    return false;
  }

  return Boolean(true);;
}
export const RoommatePosts: CollectionConfig = {
  slug: 'RoommatePosts',
  labels: {
    singular: 'Roommate Post',
    plural: 'Roommate Posts',
  },

  admin: {
    useAsTitle: 'title',
    group: 'Roommate Services',
  },
  access: {
    read: async ({ req }) => true,
    create: async ({ req }) => await isUser({ req }),
    update: async ({ req, id }) => await isAuthor({ req, id }),
    delete: async ({ req, id }) => await isAuthor({ req, id }),

  },
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation === 'create') {
          try {
            const clerkUser = await fetchAuth();


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
                data.email = generalUser.docs[0]?.email;
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
      name: 'userId',
      type: 'relationship',
      relationTo: 'general-user',
      required: true,

    }, {
      name: 'author',
      type: 'text',

    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: "checkbox",
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Address',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },

    {
      name: 'rent',
      type: 'number',
      required: true,
      label: 'Monthly Rent',
    },
    {
      name: 'deposit',
      type: 'number',
      label: 'Deposit Amount',
    },
    {
      name: 'gender',
      required: true,
      type: 'select',
      options: [
        { label: 'Female', value: '1' },
        { label: 'Male', value: '2' },
      ],
    },
    {
      name: 'propertyType',
      required: true,
      type: 'select',
      options: [
        { label: 'House', value: '1' },
        { label: 'Apartment', value: '2' },
        { label: 'Condo', value: '3' },
        { label: 'Townhouse', value: '4' },
      ],
      label: 'Property Type',
    },
    {
      name: 'furnishingType',
      required: true,
      type: 'select',
      options: [
        { label: 'Unfurnished', value: '1' },
        { label: 'Partially Furnished', value: '2' },
        { label: 'Furnished', value: '3' },
      ],

    },
    {
      name: 'utilities',
      type: 'select',
      options: [
        { label: 'Wifi', value: '1' },
        { label: 'Electricity, water, gas', value: '2' },
        { label: 'Laundry (in unit)', value: '3' },
        { label: 'Laundry (on site)', value: '4' },
        { label: 'Heating', value: '5' },
        { label: 'Air Conditioning', value: '6' },
      ],
      label: 'Utilities',
      hasMany: true,

    },
    {
      name: 'amenities',
      type: 'select',
      options: [
        { label: 'Parking available', value: '1' },
        { label: 'Recreational spaces', value: '2' },
        { label: 'Pets allowed', value: '3' },
        { label: 'Private kitchen', value: '4' },
        { label: 'Private bathroom', value: '5' },


      ], label: 'Amenities',
      hasMany: true,

    },
    {
      name: 'images',
      type: 'text',
      required: true,
      hasMany: true,
      label: 'Images',
    },
    {
      name: 'availableDate',
      type: 'date',
      required: true,
      label: 'Available Date',
    },

    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook',

    }
    ,
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram',

    }
    ,

    {
      name: 'whatsapp',
      type: 'text',
      label: 'Whatsapp',
    },

    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
      ],
      defaultValue: 'approved',
      label: 'Status',
    },
  ],
};

export default RoommatePosts;
