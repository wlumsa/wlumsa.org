import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "name",
    group: "App",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Event name",
    },
    {
        name:"date",
        type:"date",
        required:true,
        label:"Date and Time",
        admin: {
            position: "sidebar",
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
    }, 
    {
        name:"time",
        type:"text",
        required:false,
        label:"Display Time (optional)",
        admin: {
            position: "sidebar",
            description: "Optional. Fill only if you want a time shown on the site.",
          },
    }, {
        name:"location",
        type:"text",
        required:false,
        label:"Location"
    }, {
        name:"locationLink",
        type:"text",
        required:false,
        label:"Location Link (optional)",
        admin: {
            position: "sidebar",
            description: "Optional directions URL (e.g., Google Maps). Shows as 'Get directions' under location.",
          },
    }, {
        name:"description",
        type:"textarea",
        required:true,
        label:"Event Description"
    }, {
        name:"image",
        type:"relationship",
        relationTo:"media",
        required:false,
        label:"Image"
    }, 
    {
        name:"link",
        type:"text",
        required:false,
        label:"Link",
        admin: {
            position: "sidebar",
          },
    }, {
        name: "status",
        type: "select",
        defaultValue: "draft",
        options: [
         {
            label: "Draft",
            value: "draft",
            },
        {
            label: "Published",
            value: "published",
        },
        ],
         admin: {
            position: "sidebar",
            },

    }
    
   
    
  ],
};
