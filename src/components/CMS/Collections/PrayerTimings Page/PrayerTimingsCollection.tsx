
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const PrayerTimingsCollection = buildCollection({
    path: "PrayerTimings",
    name: "Prayer Timings",
    singularName: "Month",
    group: "Prayer Timings Page",
    permissions: ({ user, authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isReligiousAffairs = authController.extra?.roles.includes("ReligiousAffairs");
      const isExternal = authController.extra?.roles.includes("External");
      return {
        edit: isAdmin || isReligiousAffairs || isExternal,
        create: isAdmin || isReligiousAffairs || isExternal,
        // we have created the roles object in the navigation builder
        delete: isAdmin || isReligiousAffairs || isExternal,
      };
    },
    properties: {}, // This is kept empty because the month name is the document ID
    subcollections: [
      buildCollection({
        path: "Days",
        name: "Days",
        singularName: "Day",
        permissions: ({ user, authController }) => {
          const isAdmin = authController.extra?.roles.includes("Admin");
          const isReligiousAffairs = authController.extra?.roles.includes("ReligiousAffairs");
          return {
            edit: isAdmin || isReligiousAffairs,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin,
          };
        },
        properties: {
          Day: buildProperty({
            dataType: "number",
            title: "Day",
            validation: { required: true },
            description: "Day",
          }),
          Fajr: buildProperty({
            dataType: "string",
            title: "Fajr",
            validation: { required: true },
            description: "Fajr prayer timing",
          }),
  
          FajrIqamah: buildProperty({
            dataType: "string",
            title: "Isha",
            validation: { required: true },
            description: "Fajr Iqamah timing",
          }),
          Sunrise: buildProperty({
            dataType: "string",
            title: "Sunrise",
            validation: { required: true },
            description: "Sunrise timing",
          }),
          Dhuhr: buildProperty({
            dataType: "string",
            title: "Dhuhr",
            validation: { required: true },
            description: "Dhuhr prayer timing",
          }),
          DhuhrIqamah: buildProperty({
            dataType: "string",
            title: "Dhuhr Iqamah",
            validation: { required: true },
            description: "Dhuhr Iqamah timing",
          }),
          Asr: buildProperty({
            dataType: "string",
            title: "Asr",
            validation: { required: true },
            description: "Asr prayer timing",
          }),
          AsrIqamah: buildProperty({
            dataType: "string",
            title: "Asr Iqamah",
            validation: { required: true },
            description: "Asr Iqamah timing",
          }),
          Maghrib: buildProperty({
            dataType: "string",
            title: "Maghrib",
            validation: { required: true },
            description: "Maghrib prayer timing",
          }),
          MaghribIqamah: buildProperty({
            dataType: "string",
            title: "Fajr",
            validation: { required: true },
            description: "Fajr Iqamah timing",
          }),
          Isha: buildProperty({
            dataType: "string",
            title: "Isha",
            validation: { required: true },
            description: "Isha prayer timing",
          }),
          IshaIqamah: buildProperty({
            dataType: "string",
            title: "Isha Iqamah",
            validation: { required: true },
            description: "Isha Iqamah timing",
          }),
          // ... other prayer times
        },
        customId: true,
      }),
    ],
    customId: true,
  });