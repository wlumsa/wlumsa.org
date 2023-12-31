
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const ResourcesCollection = buildCollection<Resources>({
    path: "Resources",
    name: "Resources",
    singularName: "Resource",
    group: "Footer",
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isMarketing = authController.extra?.roles.includes("Marketing");
      const isExternal = authController.extra?.roles.includes("External");
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
        description: "Title of link, i.e Tajweed App",
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