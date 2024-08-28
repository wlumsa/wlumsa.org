import { CollectionConfig } from 'payload';



export const WeeklyEvents: CollectionConfig = {
    slug: 'WeeklyEvents',
    admin: {
        useAsTitle: 'name',
        group: 'UI',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true
        },
        {
            name: 'day',
            type: 'select',
            options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        {
            name: 'timeStart',
            label: 'Start Time',
            type: 'date',
            admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'h:mm aa',
                  timeIntervals:30,
                },
            },
            required: true
        },
        {
            name: 'timeEnd',
            label: 'End Time',
            type: 'date',
            admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'h:mm aa',
                  timeIntervals:30,
                },
            },
            required: true
        },
        {
            name: 'location',
            type: 'text',
            required: true
        },
        {
            name: 'caption',
            type: 'text',
            required: true,
            maxLength:250,
        },
        {
            name: 'image',
            type: 'relationship',
            relationTo: 'media',
            hasMany: true,
            required: true
        },
        
        
    ],
}
export default WeeklyEvents;