
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";


export const usersCollection = buildCollection({
    path: "users", // Path to the collection in Firestore
    name: "Users",
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      return {
        edit: isAdmin,
        create: isAdmin,
        delete: isAdmin,
      };
    },
    properties: {
      email: buildProperty({
        dataType: "string",
        name: "Email",
        validation: { required: true, email: true },
      }),
      role: buildProperty({
        dataType: "string",
        name: "Role",
        validation: { required: true },
  
        enumValues: {
          Admin: "Admin" /* Everything */,
          Marketing:
            "Marketing" /* Products + Orders + Instagram Posts + Footer + Resources Page */,
          ReligiousAffairs:
            "Religious Affairs" /* Prayer timings + Prayer Rooms + Events + Local Mosques + Jummah*/,
          Events: "Events" /* Emails + Events + Calander wehn made */,
          Finance: "Finance" /* Orders + Products */,
          External: "External/Internal" /* Everything But Users  */,
          ProfessionalDevelopment: "Professional Development" /* Resource Page*/,
          Member: "Member" /* Nothing lol */,
        },
      }),
    },
  });