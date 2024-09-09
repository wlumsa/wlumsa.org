import { CollectionConfig } from 'payload';



export const FrequentlyAskedQuestions: CollectionConfig = {
    slug: 'faq',
    admin: {
        useAsTitle: 'Question',
        group: 'IIA',
    },
    fields: [
        {
            name: 'Question',
            type: 'text',
            required: true
        },
        {
            name: 'Answer',
            type: 'text',
            required: true,
        },
    ],
}
export default FrequentlyAskedQuestions;
