import { CollectionConfig } from "payload";

export const individuals: CollectionConfig = {
  slug: "individuals",
  admin: {
    useAsTitle: "firstName",
    group: "Marketing",
    hidden: false,
  },
  labels: {
    singular: "Individual",
    plural: "Individuals",
  },
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
};
export default individuals;
