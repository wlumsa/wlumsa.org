import { CollectionConfig } from 'payload';

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
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Address',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      label: 'Contact Email',
    },
    {
      name: 'rent',
      type: 'text',
      required: true,
      label: 'Deposit',
    },
    {
      name: 'PropertyType',
      type: 'text',
      required: true,
      label: 'Property Type',
    },
    {
      name: 'roomfurnishing',
      type: 'text',
      required: true,
      label: 'Room Furnishing',
    },
    {
      name: 'availableDate',
      type: 'date',
      required: true,
      label: 'Available Date',
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },

    {
      name: 'comments',
      type: 'relationship',
      relationTo: 'Comments',
      hasMany: true,
    }
    ,
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
      ],
      defaultValue: 'pending',
      label: 'Status',
    },
  ],
};

export default RoommatePosts;
