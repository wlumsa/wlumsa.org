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
            name: 'name',
            type: 'text',
            required: true
        },
        {
            name: 'price',
            type: 'number',
            required: true
        }, 
        {
            name: 'desc',
            type: 'textarea',
            required: true
        },
        {
            name: 'image',
            type: 'relationship',
            relationTo: 'media',
            hasMany: true,
            required: true
        },
        {
            name: 'tags',
            type: 'number',
            required: true
        },
        {
            name: 'sizes',
            type: 'number',
            required: true
        },
        {
            name: 'quantity',
            type: 'number',
            required: true
        }
        //Basic fields for the email, will add custom email blocks later based on marketing teams needs
        //https://payloadcms.com/docs/fields/blocks for more info on blocks
        // {
        //     name: 'content',
        //     type: 'richText',
        //     editor: lexicalEditor({})
        // },
        // {
        //     name: 'attachments',
        //     type: 'relationship',
        //     relationTo: 'media',
        //     hasMany: true,
        // },
        // {
        //     name: 'published',
        //     type: 'select',
        //     options: ['Yes', 'No'],
        //     defaultValue: 'No',
        //     hooks: {
        //         afterChange: [({ value, previousValue, req }) => {
        //             if(value === 'Yes'){
        //                 console.log('Email Published')
        //             }
        //         }],
        //     }
        // },
    ],
}
export default Products;