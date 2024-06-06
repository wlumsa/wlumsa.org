import type { CollectionConfig } from 'payload/types'

const Socials: CollectionConfig = {
    slug: 'Socials',
    admin: {
        group: 'UI',
    },
    fields: [
        {
            name:"title",
            type:"text",
            label:"Title",
            required:true,
        },
        {
            name: 'link',
            type: 'relationship',
            relationTo: 'link',
            required: true,
            hasMany: false,
        },
        {
            name: 'icon',
            type: 'text',
            label: 'svg of icon',
            required: true,
        }
    ],
}

export default Socials;