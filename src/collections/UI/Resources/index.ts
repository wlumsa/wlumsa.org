import type { CollectionConfig } from 'payload/types'

const Resources: CollectionConfig = {
    slug: 'resources',
    admin: {
        group: 'UI',
    },
    fields: [
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