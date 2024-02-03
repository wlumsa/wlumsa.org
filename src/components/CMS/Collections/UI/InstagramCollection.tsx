
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const InstagramCollection = buildCollection<instagramPost>({
    path: "Posts",
    name: "Instagram Posts",
    singularName: "Instagram Post",
    initialSort: ["date", "desc"],
    group: "UI",
  
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
      link: {
        name: "Link",
        validation: {
          required: true,
          requiredMessage: "You must set a link",
        },
        description: "Link to Instagram Post",
        dataType: "string",
      },
      date: buildProperty({
        dataType: "date",
        name: "Created at",
        autoValue: "on_create",
      }),
    },
  });
  