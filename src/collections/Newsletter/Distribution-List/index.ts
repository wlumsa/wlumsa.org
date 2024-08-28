import { CollectionConfig } from "payload";

export const DistributionList: CollectionConfig = {
  slug: "distribution-list",
  admin: {
    useAsTitle: "listName",
    group: "Marketing",
    hidden: false,
  },
  fields: [
    {
        name:"listName",
        label:"List Name",
        type:"text",
        required:true,
    },
    {
      label: "Individual",
      name: "list",
      type: "array",
      fields: [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
        },
        {
          name: "lastName",
          label: "Last Name",
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
