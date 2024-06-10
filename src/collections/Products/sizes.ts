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


export const Sizes: CollectionConfig = {
    slug: 'Sizes',
    admin: {
        useAsTitle: 'Title',
        group: 'Admin',
    },
    fields: [
        {
            name: 'size',
            label: 'Size',
            type: 'select',
            options: ['Small', 'Medium', 'Large',],
            required: true,
        },
        {
            name: 'quantity',
            label: 'Quantity',
            type: 'number',
            required: true,
            
        }
        
    ],
}
