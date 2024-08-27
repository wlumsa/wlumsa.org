import { CollectionConfig } from "payload";

export const DistributionList: CollectionConfig = {
  slug: "distribution-list",
  admin: {
    useAsTitle: "List Name",
    group: "Marketing",
    hidden: false,
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
