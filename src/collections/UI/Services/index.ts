import { CollectionConfig } from 'payload';

const Services: CollectionConfig = {
    slug: 'services',
    admin: {
        group: 'UI',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required:true,
        },
        {
            name: 'description',
            type: 'text',
            required:true,
        },
        {
            name: 'link',
            type: 'relationship',
            relationTo: 'link',
            required: true,
            hasMany: false,
        },
    ],
}

export default Services;