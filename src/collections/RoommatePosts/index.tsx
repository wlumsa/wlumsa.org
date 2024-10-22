import { Field } from 'payload/types'; // Import Field type
import React from 'react';
/**import { FieldTypeProps } from 'payload/dist/admin/components/forms';

const DescriptionField: React.FC<FieldTypeProps> = ({ value }) => (
  <div>{value?.toString().trim() || 'No description provided'}</div>
);

const RoommatePosts: Field = {
  name: 'roommate-posts',
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
        description: 'Provide a detailed description about the roommate post',
        components: {
          Field: DescriptionField, // Attach custom field component
        },
      },
    },**/
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
