import type {CollectionConfig} from "payload/types"

const Instagram: CollectionConfig = {
    slug: 'Instagram',
    admin: {
        group: 'UI',
    },
    timestamps: true,
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

export default Instagram;