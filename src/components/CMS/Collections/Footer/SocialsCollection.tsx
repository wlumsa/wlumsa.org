
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const SocialsCollection = buildCollection<Socials>({
    path: "Socials",
    name: "Socials",
    group: "Footer",
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isExternal = authController.extra?.roles.includes("External");
      const isMarketing = authController.extra?.roles.includes("Marketing");
      return {
        edit: isAdmin || isExternal || isMarketing,
        create: isAdmin || isExternal || isMarketing,
        delete: isAdmin || isExternal || isMarketing,
      };
    },
    properties: {
      name: {
        name: "Title",
        validation: { required: true },
        dataType: "string",
        description: "Title of Social, i.e Linkedin",
      },
      link: {
        name: "Link",
        validation: {
          required: true,
          requiredMessage: "You must set a link",
        },
        description: "Link to Social",
        dataType: "string",
      },
      date: buildProperty({
        dataType: "date",
        name: "Created at",
        autoValue: "on_create",
      }),
      icon: buildProperty({
        dataType: "string",
        name: "Icon",
        storage: {
          storagePath: "images",
          acceptedFiles: ["icons/*"],
          maxSize: 500 * 500,
          metadata: {
            cacheControl: "max-age=1000000",
          },
          fileName: (context) => {
            return context.file.name;
          },
        },
        validation: {
          required: true,
          requiredMessage: "You must set an icon",
        },
      }),
    },
  });