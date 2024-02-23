
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";



export const MemberCollection = buildCollection<Member>({
    path: "Members",
    name: "Members",
    singularName: "Member",
    permissions: ({ user, authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isExternal = authController.extra?.roles.includes("External");
      return {
        edit: isAdmin || isExternal,
        create: isAdmin || isExternal,
        // we have created the roles object in the navigation builder
        delete: isAdmin || isExternal,
      };
    },
    properties: {
      FirstName: {
        name: "First Name",
        validation: { required: true },
        dataType: "string",
        description: "First name of person",
      },
      LastName: {
        name: "Last Name",
        validation: {
          required: true,
        },
        description: "Last name of person",
        dataType: "string",
      },
      StudentId: {
        name: "Student Id",
        validation: { required: true },
        description: "Student id of person",
        dataType: "string",
      },
      Email: {
        name: "Email",
        validation: { required: true },
        description: "Email address of person",
        dataType: "string",
      },
      Newsletter: {
        name: "Newsletter",
        validation: { required: false },
        description: "Is the user signed up for the newsletter?",
        dataType: "boolean",
      },
    },
  });