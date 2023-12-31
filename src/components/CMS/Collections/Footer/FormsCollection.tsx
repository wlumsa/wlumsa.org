
import {
    buildCollection,
    buildProperty,
} from "firecms";

export const FormsCollection = buildCollection<Forms>({
    path: "Forms",
    name: "Forms",
    singularName: "Form",
    group: "Footer",
    permissions: ({ user, authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isExternal = authController.extra?.roles.includes("External");
      return {
        edit: isAdmin || isExternal,
        create: isAdmin || isExternal,
        // we have created the roles object in the navigation builder
        delete: isAdmin || isExternal,
      };
    },
    properties: {
      name: {
        name: "Form Title",
        validation: { required: true },
        dataType: "string",
        description: "Title of form (keep short)",
      },
      link: {
        name: "Link",
        validation: {
          required: true,
          requiredMessage: "You must set a link",
        },
        description: "Form Link",
        dataType: "string",
      },
    },
  });