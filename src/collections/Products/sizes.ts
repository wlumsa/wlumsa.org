import { CollectionConfig } from 'payload';
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
        group: 'Products',
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
