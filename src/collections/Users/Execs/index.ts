import type { CollectionConfig } from "payload";

import {
  adminOrSelf,
  adminOrSelfField,
  adminsOnly,
  adminsOnlyAdmin,
  adminsOnlyField,
  authenticated,
} from "@/collections/EventPlanning/access";

export const Execs: CollectionConfig = {
  slug: "execs",
  admin: {
    useAsTitle: "name",
    group: "Admin",
  },
  access: {
    admin: adminsOnlyAdmin,
    create: adminsOnly,
    delete: adminsOnly,
    read: authenticated,
    unlock: adminsOnly,
    update: adminOrSelf,
  },
  auth: {
    cookies: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
    lockTime: 10 * 60 * 1000,
    maxLoginAttempts: 5,
    tokenExpiration: 2 * 60 * 60,
    useSessions: true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, previousDoc, req }) => {
        if (operation === "update" && previousDoc.roles !== doc.roles) {
          await req.payload.update({
            collection: "execs",
            id: doc.id,
            data: { sessions: [] },
            overrideAccess: true,
            req,
          });
        }

        return doc;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
      required: true,
      access: {
        create: adminsOnlyField,
        read: adminOrSelfField,
        update: adminOrSelfField,
      },
    },
    {
      name: "department",
      type: "select",
      access: {
        update: adminsOnlyField,
      },
      options: [
        {
          label: "Marketing",
          value: "marketing",
        },
        {
          label: "Events Brothers",
          value: "events_brothers",
        },
        {
          label: "Events Sisters",
          value: "events_sisters",
        },
        {
          label: "Religious Affairs Brothers",
          value: "religious_affairs_brothers",
        },
        {
          label: "Religious Affairs Sisters",
          value: "religious_affairs_sisters",
        },
        {
          label: "Finance",
          value: "finance",
        },
        {
          label: "Community Enagagement",
          value: "community_engagement",
        },
        {
          label: "Operations",
          value: "operations",
        },
        {
          label: "Technology",
          value: "technology",
        },
      ],
    },
    {
      name: "position",
      type: "select",
      access: {
        update: adminsOnlyField,
      },
      options: [
        {
          label: "Vice President",
          value: "vice_president",
        },
        {
          label: "Head Director",
          value: "head_director",
        },
        {
          label: "Director",
          value: "director",
        },
      ],
    },
    {
      name: "student id",
      type: "number",
      access: {
        create: adminsOnlyField,
        read: adminOrSelfField,
        update: adminOrSelfField,
      },
    },
    {
      name: "major",
      type: "text",
      access: {
        create: adminsOnlyField,
        read: adminOrSelfField,
        update: adminOrSelfField,
      },
    },
    {
      name: "year",
      type: "number",
      access: {
        create: adminsOnlyField,
        read: adminOrSelfField,
        update: adminOrSelfField,
      },
    },
    {
      name: "phone number",
      type: "number",
      access: {
        create: adminsOnlyField,
        read: adminOrSelfField,
        update: adminOrSelfField,
      },
    },
    {
      name: "mylaurier email",
      type: "email",
      access: {
        create: adminsOnlyField,
        read: adminOrSelfField,
        update: adminOrSelfField,
      },
    },
    {
      name: "city",
      type: "text",
      access: {
        create: adminsOnlyField,
        read: adminOrSelfField,
        update: adminOrSelfField,
      },
    },
    {
      name: "roles",
      required: true,
      defaultValue: ({ req }) => (req.user ? "editor" : "admin"),
      saveToJWT: true,
      type: "select",
      access: {
        create: adminsOnlyField,
        update: adminsOnlyField,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Manager",
          value: "manager",
        },
        {
          label: "Editor",
          value: "editor",
        },
      ],
    },
    // Add more fields as needed
  ],
};
