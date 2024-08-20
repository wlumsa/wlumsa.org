import { CollectionConfig } from "payload";

export const DistributionList: CollectionConfig = {
  slug: "distribuitionList",
  admin: {
    useAsTitle: "email",
    group: "Admin",
    hidden: true,
  },
  fields: [
    {
        name:"List Name",
        type:"text",
        required:true,
    },
    {
      name: "List",
      type: "array",
     
      label: "Individual",
      fields: [
        {
          name: "First Name",
          type: "text",
        },
        {
          name: "Last Name",
          type: "text",
        },
        {
          name: "email",
          type: "email",
          required: true,
        },
      ],
      required: true,
      
    },
  ],
};
export default DistributionList;
