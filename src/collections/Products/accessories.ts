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


export const aaccessories: CollectionConfig = {
    slug: 'accessories',

    fields: [
       
        
        {
            name: 'quantity',
            label: 'Quantity',
            type: 'number',
            required: true,
        }
    ]
}

