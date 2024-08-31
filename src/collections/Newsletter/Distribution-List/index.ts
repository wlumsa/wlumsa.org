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
      name: "emails",
      label: "emails",
      type: "relationship",
      relationTo:"individuals",
      hasMany:true,
      required:true,
    },
  ],
};
export default DistributionList;
