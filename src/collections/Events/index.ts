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
        required:false,
        label:"Date",
        admin: {
            position: "sidebar",
          },
    }, 
    {
        name:"time",
        type:"text",
        required:false,
        label:"Time",
        admin: {
            position: "sidebar",
          },
    }, {
        name:"location",
        type:"text",
        required:false,
        label:"Location"
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
