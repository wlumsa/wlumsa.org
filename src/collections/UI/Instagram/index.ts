import type { CollectionConfig } from "payload/types"

export const Instagram: CollectionConfig = {
    slug: 'Instagram',
    admin: {
        group: 'UI',
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
