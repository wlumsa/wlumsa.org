
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const ServicesOfferedCollection = buildCollection<ServicesOffered>({
    path: "ServicesOffered",
    name: "Services Offered",
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isExternal = authController.extra?.roles.includes("External");
      const isMarketing = authController.extra?.roles.includes("Marketing");
      const isProfessionalDevelopment = authController.extra?.roles.includes(
        "ProfessionalDevelopment"
      );
      return {
        edit: isAdmin || isExternal || isMarketing || isProfessionalDevelopment,
        create: isAdmin || isExternal || isMarketing || isProfessionalDevelopment,
        // we have created the roles object in the navigation builder
        delete: isAdmin || isExternal || isMarketing || isProfessionalDevelopment,
      };
    },
    properties: {
      title: {
        name: "Title of service",
        validation: { required: true },
        dataType: "string",
  
        description: "Title of service i.e religious affairs",
      },
      description: {
        name: "Description of service ",
        validation: {
          required: true,
        },
        description: "Description of service offered",
        dataType: "string",
      },
      link: {
        name: "link to service",
        validation: { required: false },
        dataType: "string",
        description: "Link to service i.e /events ",
      },
    },
  });