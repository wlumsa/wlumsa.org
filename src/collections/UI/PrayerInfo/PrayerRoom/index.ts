import { CollectionConfig } from "payload";

const PrayerRooms: CollectionConfig = {
    slug: 'prayer-rooms',
    fields: [
        {
            name: 'building',
            type: 'text',
            required: true,
        },
        {
            name:'description',
            type:'text',
            required:true,
            maxLength:50,
        },
        {
            name:'room_number',
            type:'number',
            max:1000,
            required:true,
        }
    ],
}

export default PrayerRooms