
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";


export const PrayerRoomsCollection = buildCollection<PrayerRooms>({
    path: "PrayerRooms",
    name: "Prayer rooms",
    singularName: "Prayer room",
    group: "Home Page",
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
      building: {
        name: "Building Name",
        validation: { required: true },
        dataType: "string",
        description: "Name of building where room is, i.e Bricker Academic",
      },
      description: {
        name: "Description ",
        validation: {
          required: false,
        },
        description: "Description of room amenities i.e Washrooms Nearby",
        dataType: "string",
      },
      roomNumber: {
        name: "Room Number",
        validation: {
          required: true,
          requiredMessage: "You must set a room number between 0 and 10000",
          min: 0,
          max: 1000,
        },
        description: "Room number",
        dataType: "number",
      },
    },
  });