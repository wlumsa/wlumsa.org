import type { CollectionConfig } from 'payload/types'

export const Members: CollectionConfig = {
    slug: 'Members',
    admin: {
        useAsTitle: 'email',
        group: 'Admin',
    },

    auth: true,
    fields: [
        {
            name: 'First Name',
            type: 'text',
        },
        {
            name: 'Last Name',
            type: 'text',
        },
        {
            name: 'mylaurier email',
            type: 'email',
            required: true,
        },
        {
            name: 'Student Id',
            type: 'text',
        },
        {
            name: 'Newsletter',
            type: 'checkbox',
        },
        
 
    ],
}
export default Members;