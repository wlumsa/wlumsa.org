import { CollectionConfig } from 'payload';

const Resources: CollectionConfig = {
    slug: 'resources',
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
            name: 'link',
            type: 'relationship',
            relationTo: 'link',
            required: true,
            hasMany: true,
        },
    ],
}

export default Resources;