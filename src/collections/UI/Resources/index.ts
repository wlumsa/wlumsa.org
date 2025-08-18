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
            name: 'category',
            type: 'select',
            required: true,
            options: [
                {
                    label: 'General Forms',
                    value: '1',
                },
                {
                    label: 'Campus Resources',
                    value: '2',
                },
                {
                    label: 'Religious Resources',
                    value: '3',
                },
                {
                    label: 'Other',
                    value: '4',
                },
            ],
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
