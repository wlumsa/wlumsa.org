import { CollectionConfig } from 'payload';

/*
name
price
desc
image
tags
sizes
quantity
*/


export const clothing: CollectionConfig = {
    slug: 'clothing',
    fields: [
        {
            name: 'sizes',
            type: 'array',
            label: 'Sizes',
            minRows: 1,
            maxRows: 5,
            interfaceName: 'Size',
            required: false,
            fields: [
                {
                    name: 'size',
                    label: 'Size',
                    type: 'select',
                    options:['XS', 'S', 'M', 'L', 'XL',],
                    required: true,
                },
                {
                    name: 'quantity',
                    label: 'Quantity',
                    type: 'number',
                    required: true,
                }
            ]
        },
    ],
}
