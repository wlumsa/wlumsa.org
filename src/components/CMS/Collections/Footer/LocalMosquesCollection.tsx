
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const LocalMosquesCollection = buildCollection<LocalMosques>({
    path: "LocalMosques",
    name: "LocalMosques",
    singularName: "Mosque",
    group: "Footer",
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isReligiousAffairs =
        authController.extra?.roles.includes("ReligiousAffairs");
      const isExternal = authController.extra?.roles.includes("External");
      return {
        edit: isAdmin || isReligiousAffairs || isExternal,
        create: isAdmin || isReligiousAffairs || isExternal,
        // we have created the roles object in the navigation builder
        delete: isAdmin || isReligiousAffairs || isExternal,
      };
    },
    properties: {
      name: {
        name: "Mosque Name",
        validation: { required: true },
        dataType: "string",
        description: "Name of Mosque, i.e Waterloo Masjid",
      },
      link: {
        name: "Link",
        validation: {
          required: true,
          requiredMessage: "You must set a link",
        },
        description: "Link to mosque website / google maps location",
        dataType: "string",
      },
    },
  });