
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const OtherCollection = buildCollection<Other>({
    path: "Other",
    name: "Other",
    group: "Footer",
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isExternal = authController.extra?.roles.includes("External");
      const isMarketing = authController.extra?.roles.includes("Marketing");
      return {
        edit: isAdmin || isExternal || isMarketing,
        create: isAdmin || isExternal || isMarketing,
        // we have created the roles object in the navigation builder
        delete: isAdmin || isExternal || isMarketing,
      };
    },
    properties: {
      name: {
        name: "Title",
        validation: { required: true },
        dataType: "string",
        description: "Name of item, i.e donate",
      },
      link: {
        name: "Link",
        validation: {
          required: true,
          requiredMessage: "You must set a link",
        },
        description: "Link to Item",
        dataType: "string",
      },
    },
  });