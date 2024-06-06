import type { CollectionConfig } from 'payload/types'
import {
    lexicalEditor
} from '@payloadcms/richtext-lexical'

export const Emails: CollectionConfig = {
    slug: 'Emails',
    admin: {
        useAsTitle: 'Title',
        group: 'Admin',
    },

    auth: true,
    fields: [
        {
            name: 'Title',
            type: 'text',
        },
        {
            name: 'Subject',
            type: 'text',
        },
        //Basic fields for the email, will add custom email blocks later based on marketing teams needs
        //https://payloadcms.com/docs/fields/blocks for more info on blocks
        {
            name: 'content',
            type: 'richText',
            editor: lexicalEditor({})
        },
        {
            name: 'attachments',
            type: 'relationship',
            relationTo: 'media',
            hasMany: true,
        },
        {
            name: 'published',
            type: 'select',
            options: ['Yes', 'No'],
            defaultValue: 'No',
            hooks: {
                afterChange: [({ value, previousValue, req }) => {
                    if(value === 'Yes'){
                        console.log('Email Published')
                    }
                }],
            }
        },

        // Add more fields as needed
    ],
}
export default Emails;