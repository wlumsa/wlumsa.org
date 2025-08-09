import { CollectionConfig } from "payload";

export const DailyReminders: CollectionConfig = {
  slug: "daily-reminders",
  admin: {
    useAsTitle: "reference",
    group: "App",
  },
  fields: [
    {
      name: "reference",
      type: "text",
      required: true,
      label: "Reference",
    },
    {
        name:"arabic",
        type:"text",
        required:true,
        label:"Arabic",
       
    }, 
    {
        name:"english",
        type:"text",
        required:true,
        label:"English",
       
    }, 
       
     
    
   
    
  ],
};
