import { CollectionConfig } from 'payload';
import { revalidateEventsPage } from "@/lib/revalidateEvents";

const Socials: CollectionConfig = {
    slug: 'Socials',
    admin: {
        group: 'UI',
    },
    hooks: {
        afterChange: [
            async () => {
                await revalidateEventsPage();
            },
        ],
        afterDelete: [
            async () => {
                await revalidateEventsPage();
            },
        ],
    },
    fields: [
        {
            name:"title",
            type:"text",
            label:"Title",
            required:true,
        },
        {
            name: 'link',
            type: 'relationship',
            relationTo: 'link',
            required: true,
            hasMany: false,
        },
        {
            name: 'icon',
            type: 'text',
            label: 'svg of icon',
            required: true,
        }
    ],
}

export default Socials;
