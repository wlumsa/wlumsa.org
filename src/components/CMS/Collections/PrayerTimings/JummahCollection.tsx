
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const JummahCollection = buildCollection<JummahInfo>({
    path: "Jummah",
    name: "Jummah",
    group: "Prayer Timings",
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
      room: {
        name: "Room",
        validation: { required: true },
        dataType: "string",
        description: "Room Number i.e P110",
      },
      time: {
        name: "Time",
        validation: {
          required: true,
          requiredMessage: "You must set a time",
        },
        description: "Set a time for Jummah i.e 2:00 PM",
        dataType: "string",
      },
    },
  });