import type { CollectionConfig } from "payload";

import { managerPrivateCollectionAccess } from "@/collections/EventPlanning/access";

const individuals: CollectionConfig = {
  slug: "individuals",
  access: managerPrivateCollectionAccess,
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
