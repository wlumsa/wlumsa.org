import { GlobalConfig } from 'payload/types';

const PrayerRooms: GlobalConfig = {
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
            name:'room number',
            type:'number',
            max:1000,
            required:true,
        }
    ],
}

export default PrayerRooms