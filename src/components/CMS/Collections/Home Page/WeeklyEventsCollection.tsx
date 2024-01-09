
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const WeeklyEventsCollection = buildCollection<WeeklyEvents>({
    path: "WeeklyEvents",
    name: "Events",
    singularName: "Event",
    group: "Home Page",
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isEvents = authController.extra?.roles.includes("Events");
      const isReligiousAffairs =
        authController.extra?.roles.includes("ReligiousAffairs");
      const isExternal = authController.extra?.roles.includes("External");
      return {
        edit: isAdmin || isEvents || isReligiousAffairs || isExternal,
        create: isAdmin || isEvents || isReligiousAffairs || isExternal,
        delete: isAdmin || isEvents || isReligiousAffairs || isExternal,
      };
    },
    properties: {
      name: {
        name: "Title",
        validation: {
          required: true,
          requiredMessage: "You must set the title of the event",
        },
        dataType: "string",
        description: "Title of Event, i.e Halaqas",
      },
      room: {
        name: "Room Code",
        validation: {
          required: true,
          requiredMessage: "You must set the room code",
        },
        dataType: "string",
        description: "Enter room code i.e P110",
      },
      desc: {
        name: "Description ",
        validation: {
          required: true,
          requiredMessage: "You must set a description",
        },
        description: "description of event",
        dataType: "string",
      },
      time: {
        name: "Timing of events",
        validation: {
          required: true,
          requiredMessage: "You must set a time range for the event",
        },
        description: "Time range of event i.e 5:00 PM - 5:30 PM",
        dataType: "string",
      },
      day: {
        name: "Day of event",
        validation: {
          required: true,
          requiredMessage: "You must set the day of the event",
        },
        description: "Day of the weekly event i.e Tuesdays",
        dataType: "string",
      },
      img: buildProperty({
        dataType: "string",
        name: "Image",
        storage: {
          storagePath: "images",
          acceptedFiles: ["images/*"],
          maxSize: 1920 * 1080,
          metadata: {
            cacheControl: "max-age=1000000",
          },
          fileName: (context) => {
            return context.file.name;
          },
        },
        validation: {
          required: false,
        },
        description: "Image for event, max size 1920 x 1080 pixels",
      }),
    },
  });