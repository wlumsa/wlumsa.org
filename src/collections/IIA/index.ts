import { CollectionConfig } from 'payload';



export const IIAServices: CollectionConfig = {
    slug: 'iia-services',
    admin: {
        useAsTitle: 'name',
        group: 'IIA',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true
        },
        {
            name: 'caption',
            type: 'text',
            required: true,
            maxLength: 250,
        },
        {
            name: 'image',
            type: 'relationship',
            relationTo: 'media',
            hasMany: true,
            required: true
        },
        
        
    ],
}
export default IIAServices;
