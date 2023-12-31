import {
    buildCollection,
    buildProperty,
  
  } from "firecms";


export const ReligiousResourcesCollection = buildCollection<ReligiousResource>({
    path: "ReligiousResources",
    name: "Religious Resources",
    group: "Resources Page",
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isMarketing = authController.extra?.roles.includes("Marketing");
      const isProfessionalDevelopment = authController.extra?.roles.includes(
        "ProfessionalDevelopment"
      );
      const isExternal = authController.extra?.roles.includes("External");
      return {
        edit: isAdmin || isMarketing || isProfessionalDevelopment || isExternal,
        create: isAdmin || isMarketing || isProfessionalDevelopment || isExternal,
        delete: isAdmin || isMarketing || isProfessionalDevelopment || isExternal,
      };
    },
    properties: {
      title: buildProperty({
        name: "Title of Resource",
        validation: {
          required: true,
          requiredMessage: "You must set the Title",
        },
        description: "Title of resource",
        dataType: "string",
      }),
  
      link: buildProperty({
        name: "Link to resource",
        validation: {
          required: true,
          requiredMessage: "You must set a link to the resource",
        },
        description: "Link to resource",
        dataType: "string",
      }),
    },
  });