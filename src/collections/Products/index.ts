import type { CollectionConfig } from 'payload/types'
import {
    lexicalEditor
} from '@payloadcms/richtext-lexical'
/*
name
price
desc
image
tags
sizes
quantity
*/


export const Products: CollectionConfig = {
    slug: 'Products',
    admin: {
        useAsTitle: 'Title',
        group: 'Admin',
    },
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
    ],
}
export default Products;