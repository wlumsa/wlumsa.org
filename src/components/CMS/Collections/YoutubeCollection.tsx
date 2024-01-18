
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const YoutubeCollection = buildCollection<YoutubeVideo>({
    path: "Recordings",
    name: "Youtube recordings",
    singularName: "Youtube recording",
    initialSort: ["date", "desc"],
    
  
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
        description: "Link to Youtube Video",
        dataType: "string",
      },
      type: buildProperty({
        dataType: "string",
        name: "Role",
        validation: { required: true },
  
        enumValues: {
          Kutbah: "Kutbah",
          GuestSpeaker:"Guest Speaker" ,
          Halaqah:"Halaqah" ,
      
        },
      }),
      date: buildProperty({
        dataType: "date",
        name: "Created at",
        autoValue: "on_create",
      }),
    },
  });
  