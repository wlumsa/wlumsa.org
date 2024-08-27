import type { CollectionConfig } from "payload"

export const Instagram: CollectionConfig = {
    slug: 'Instagram',
    labels:{
        singular: 'Instagram Post',
        plural: 'Instagram Posts',
    },
    admin: {
        group: 'Marketing',
    },
    
    timestamps: true,
    fields: [
        {
            name: 'url',
            type: 'text',
            required: true,
        },
    ],
}
