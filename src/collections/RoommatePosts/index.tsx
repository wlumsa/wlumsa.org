import { CollectionConfig } from 'payload';
import React from 'react';

const DescriptionField: React.FC<{ value?: string }> = ({ value }) => (
  <div>{value || 'No description provided'}</div>
);

const RoommatePosts: CollectionConfig = {
  slug: 'roommate-posts',
  labels: {
    singular: 'Roommate Post',
    plural: 'Roommate Posts',
  },
  admin: {
    useAsTitle: 'title',
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
      admin: {
        components: {
          Field: DescriptionField,
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Location',
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      label: 'Contact Email',
    },
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
