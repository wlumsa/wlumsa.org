import { GlobalConfig } from 'payload/types';

const Nav: GlobalConfig = {
    slug: 'nav',
    fields: [
        {
            name: 'items',
            type: 'array',
            required: true,
            maxRows: 8,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'links',
                    type: 'relationship',
                    relationTo: 'link',
                    required: true,
                    hasMany: true,
                },        
            ],
            
        },
    ],
}

export default Nav