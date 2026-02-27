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
            name: 'recurrence',
            label: 'Recurrence',
            type: 'select',
            required: true,
            defaultValue: 'weekly',
            options: [
                {
                    label: 'Weekly',
                    value: 'weekly',
                },
                {
                    label: 'Biweekly',
                    value: 'biweekly',
                },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'startDate',
            label: 'Recurrence Start Date',
            type: 'date',
            required: false,
            admin: {
                position: 'sidebar',
                description: 'Required for biweekly events. Set the first date this recurring event should run.',
                date: {
                    pickerAppearance: 'dayOnly',
                },
            },
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
            name: 'locationLink',
            label: 'Location Link (optional)',
            type: 'text',
            required: false,
            admin: {
                position: 'sidebar',
                description: "Optional directions URL (e.g., Google Maps). Shows as 'Get Directions' on the event card.",
            },
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
