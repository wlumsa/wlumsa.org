"use client";
import msalogo from "public/logo.png";


import { EmailPreview } from "./EmailPreview";
import React, { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import {
  Authenticator,
  buildCollection,
  buildProperty,
  FirebaseCMSApp,
} from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import { firebaseConfig } from "../firebase";
import db from "../firebase";
type PrayerRooms = {
  building: string;
  roomNumber: number;
  description: string;
};
type InstagramPost = {
  link: string;
  date: Date;
};
type JummahInfo = {
  room: string;
  time: string;
};

type WeeklyEvents = {
  day: string;
  desc: string;
  img: string;
  name: string;
  room: string;
  time: string;
};
type LocalMosques = {
  name: string;
  link: string;
};

type Other = {
  name: string;
  link: string;
};
type Resources = {
  name: string;
  link: string;
};
type Socials = {
  icon: string;
  link: string;
  name: string;
  date: Date;
};
type Forms = {
  link: string;
  name: string;
};
type Member = {
  FirstName: string;
  LastName: string;
  StudentId: string;
  Email: string;
  Newsletter: boolean;
};

type ServicesOffered = {
  title: string;
  description: string;
  link: string;
};

type CampusResource = {
  title: string;
  link: string;
};

type ReligiousResource = {
  title: string;
  link: string;
};

type OtherResource = {
  title: string;
  link: string;
};
type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
  hasSizes: boolean;
  quantity: number; // For products without sizes
  sizes?: { [size: string]: number }; // For products with sizes
  tags: string[];
};

type EmailEntryImages = {
  type: "images";
  value: string[];
};

type EmailEntryText = {
  type: "text";
  value: string;
};
type EmailEntryAttachments = {
  type: "attachments";
  value: string[];
};
// Define the props for your Email component

// Define the structure for the modified values you expect from FireCMS
interface EmailEntry {
  name: string;
  subject: string;
  content: (EmailEntryImages | EmailEntryText | EmailEntryAttachments)[];
  created_on: Date;
  status: string;
  sendEmail: boolean;
  distributionListType: "members" | "custom";
  customEmails?: string; // Optional, only if distributionListType is 'custom'
}
export const EmailCollection = buildCollection<EmailEntry>({
  name: "Emails",
  path: "Emails",
  views: [{ path: "preview", name: "Preview", Builder: EmailPreview }],
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isMarketing = authController.extra?.roles.includes("Marketing");
    const isEvents = authController.extra?.roles.includes("Events");
    const isExternal = authController.extra?.roles.includes("External");
    return {
      edit: isAdmin || isMarketing || isEvents || isExternal,
      create: isAdmin || isMarketing || isEvents || isExternal,
      delete: isAdmin || isMarketing || isEvents || isExternal,
      
    };
  },
  properties: {
    name: buildProperty({
      name: "Title",
      validation: { required: false },
      dataType: "string",
    }),
    subject: buildProperty({
      name: "Subject",
      validation: { required: true },
      dataType: "string",
    }),
    content: buildProperty({
      name: "Content",
      description:
        "Example of a complex array with multiple properties as children",
      validation: { required: true },
      dataType: "array",
      columnWidth: 400,
      oneOf: {
        typeField: "type",
        valueField: "value",
        properties: {
          images: buildProperty({
            name: "Images",
            dataType: "array",
            of: buildProperty({
              dataType: "string",
              storage: {
                mediaType: "image",
                storagePath: "emails/images",
                acceptedFiles: ["image/*"],
                metadata: { cacheControl: "max-age=1000000" },
              },
            }),
            description:
              "This fields allows uploading multiple images at once and reordering",
          }),
          attachments: buildProperty({
            name: "Attachments - Not recommended for large amount of ppl",
            dataType: "array",
            of: buildProperty({
              dataType: "string",
              storage: {
                mediaType: "file",
                storagePath: "emails/attachments",
                acceptedFiles: [".pdf", ".doc", ".docx", ".xls", ".xlsx"], // List of accepted file types
              },
            }),
            description:
              "This field allows uploading files like documents and images.",
          }),
          text: buildProperty({
            dataType: "string",
            name: "Text",
            markdown: true,
          }),
        },
      },
    }),
    status: buildProperty(({ values }) => ({
      name: "Status",
      validation: { required: true },
      dataType: "string",
      columnWidth: 140,
      enumValues: {
        published: {
          id: "published",
          label: "Published",
        },
        draft: "Draft",
      },
      defaultValue: "draft",
    })),
    created_on: buildProperty({
      name: "Created on",
      dataType: "date",
      autoValue: "on_create",
    }),

    distributionListType: buildProperty({
      name: "Distribution List Type",
      dataType: "string",
      validation: { required: true },
      enumValues: {
        members: {
          id: "members",
          label: "Members",
        },
        custom: {
          id: "custom",
          label: "Custom",
        },
      },
    }),
    customEmails: buildProperty(({ values }) => ({
      name: "Enter Emails",
      dataType: "string",
      multiline: true,
      disabled: values.distributionListType !== "custom" && {
        clearOnDisabled: true,
        disabledMessage: "Sizes are only available if 'Has Sizes' is selected.",
        hidden: true,
      },
    })),
    sendEmail: buildProperty(({ values }) => ({
      name: "Send Email",
      dataType: "boolean",
      validation:
        values.distributionListType == "custom"
          ? { required: true }
          : undefined,
      defaultValue: false,
      // Conditional rendering based on the status

      disabled: values.status !== "published" && {
        clearOnDisabled: true,
        disabledMessage: "Sizes are only available if 'Has Sizes' is selected.",
        hidden: true,
      },
    })),
  },
  callbacks: {
    onSaveSuccess: async ({ values, context }) => {
      if (
        values.sendEmail &&
        values.status === "published" &&
        values.content &&
        values
      ) {
        const contentWithUrls = await Promise.all(
          values.content.map(async (entry) => {
            if (entry.type === "images" || entry.type === "attachments") {
              const fileUrls = await Promise.all(
                entry.value.map((filePath) =>
                  context.storageSource
                    .getDownloadURL(filePath)
                    .then((res) => res.url)
                )
              );
              return { ...entry, value: fileUrls };
            } else {
              return entry;
            }
          })
        );

        const emailData = {
          name: values.name,
          subject: values.subject,
          content: contentWithUrls,
          status: values.status,
          distributionList:
            values.distributionListType === "custom"
              ? values.customEmails
              : "Members",
          created_on: values.created_on,
        }; /*  */
        const baseUrl = window.location.origin; // This will get the domain
        const endpoint = values.sendEmail ? `${baseUrl}/api/sendemails` : "";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
    },
  },
});

const ProductsCollection = buildCollection<Product>({
  name: "Products",
  singularName: "Product",
  path: "Products",
  group: "Products page",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isMarketing = authController.extra?.roles.includes("Marketing");
    const isFinance = authController.extra?.roles.includes("Finance");
    const isExternal = authController.extra?.roles.includes("External");
    return {
      edit: isAdmin || isMarketing || isFinance || isExternal,
      create: isAdmin || isMarketing || isFinance || isExternal,
      delete: isAdmin || isMarketing || isFinance || isExternal,
      
    };
  },
  properties: {
    name: buildProperty({
      dataType: "string",
      name: "Name",
      description: "The name of the product.",
      validation: { required: true },
    }),
    price: buildProperty({
      dataType: "number",
      name: "Price",
      description: "The price of the product in your preferred currency.",
      validation: { required: true, min: 0 },
    }),
    description: buildProperty({
      dataType: "string",
      name: "Description",
      description: "A detailed description of the product.",
      validation: { required: true },
    }),
    image: buildProperty({
      dataType: "string",
      title: "Image",
      description: "Upload an image for the product.",
      storage: {
        storagePath: "images/products",
        acceptedFiles: ["image/png", "image/jpg", "image/jpeg"],
        maxSize: 1920 * 1080,
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    }),
    tags: buildProperty({
      dataType: "array",
      name: "Tags",
      description:
        "Tags for categorizing the product. Can include multiple tags.",
      of: {
        dataType: "string",
      },
    }),

    hasSizes: buildProperty({
      dataType: "boolean",
      name: "Has Sizes",
      description: "Does this product come in different sizes?",
    }),

    quantity: buildProperty(({ values }) => ({
      dataType: "number",
      name: "Quantity",
      description: "Total quantity available for this product.",
      disabled: values.hasSizes && {
        clearOnDisabled: true,
        disabledMessage: "Quantity is not applicable for products with sizes.",
      },
      validation: { required: !values.hasSizes, min: 0 },
    })),

    sizes: buildProperty(({ values }) => ({
      dataType: "map",
      name: "Sizes",
      description: "Quantities for each size.",
      properties: {
        S: {
          dataType: "number",
          name: "Small",
          validation: { required: false, min: 0 },
        },
        M: {
          dataType: "number",
          name: "Medium",
          validation: { required: false, min: 0 },
        },
        L: {
          dataType: "number",
          name: "Large",
          validation: { required: false, min: 0 },
        },
      },
      disabled: !values.hasSizes && {
        clearOnDisabled: true,
        disabledMessage: "Sizes are only available if 'Has Sizes' is selected.",
        hidden: true,
      },

      validation: values.hasSizes ? { required: true } : undefined,
    })),
  },
});

const PrayerTimingsCollection = buildCollection({
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
      create: isAdmin || isReligiousAffairs || isExternal ,
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
        return {
          edit: isAdmin,
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

const ordersCollection = buildCollection({
  name: "Orders",
  path: "Orders",
  group: "Products page",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isMarketing = authController.extra?.roles.includes("Marketing");
    const isFinance = authController.extra?.roles.includes("Finance");
    return {
      edit: isAdmin || isMarketing || isFinance,
      create: isAdmin || isMarketing || isFinance,
      delete: isAdmin || isMarketing || isFinance,
      
    };
  },
  properties: {
    Name: buildProperty({
      dataType: "string",
      name: "Name",
      validation: { required: true },
    }),
    delivered: buildProperty({
      dataType: "boolean",
      name: "Delivered",
    }),
    email: buildProperty({
      dataType: "string",
      name: "Email",
      validation: { required: true, email: true },
    }),
    image: buildProperty({
      dataType: "string",
      name: "Image URL",
      config: {
        storageMeta: {
          mediaType: "image",
          storagePath: "path/to/images",
          acceptedFiles: ["image/*"],
        },
      },
    }),
    password: buildProperty({
      dataType: "string",
      name: "Password",
      // Ensure to hash and properly secure passwords in a real application
    }),
    phoneNumber: buildProperty({
      dataType: "string",
      name: "Phone Number",
    }),
    pickuptime: buildProperty({
      dataType: "string",
      name: "Pick-up Time",
    }),
    price: buildProperty({
      dataType: "string",
      name: "Price",
    }),
    products: buildProperty({
      dataType: "array",
      name: "Products",
      of: {
        dataType: "map",
        properties: {
          
          name: {
            dataType: "string",
            name: "Product Name",
          },
          quantity: {
            dataType: "number",
            name: "Quantity",
          },
          size: {
            dataType: "string",
            name: "Size",
          },
        },
      },
    }),
  },
});

const MemberCollection = buildCollection<Member>({
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

const FormsCollection = buildCollection<Forms>({
  path: "Forms",
  name: "Forms",
  singularName: "Form",
  group: "Footer",
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
    name: {
      name: "Form Title",
      validation: { required: true },
      dataType: "string",
      description: "Title of form (keep short)",
    },
    link: {
      name: "Link",
      validation: {
        required: true,
        requiredMessage: "You must set a link",
      },
      description: "Form Link",
      dataType: "string",
    },
  },
});

const JummahCollection = buildCollection<JummahInfo>({
  path: "Jummah",
  name: "Jummah",
  group: "Home Page",
  permissions: ({ authController }) => {
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

const ServicesOfferedCollection = buildCollection<ServicesOffered>({
  path: "ServicesOffered",
  name: "Services Offered",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isExternal = authController.extra?.roles.includes("External");
    const isMarketing = authController.extra?.roles.includes("Marketing");
    const isProfessionalDevelopment = authController.extra?.roles.includes("ProfessionalDevelopment");
    return {
      edit: isAdmin || isExternal || isMarketing || isProfessionalDevelopment,
      create: isAdmin || isExternal || isMarketing || isProfessionalDevelopment,
      // we have created the roles object in the navigation builder
      delete: isAdmin || isExternal || isMarketing || isProfessionalDevelopment,
    };
  },
  properties: {
    title: {
      name: "Title of service",
      validation: { required: true },
      dataType: "string",

      description: "Title of service i.e religious affairs",
    },
    description: {
      name: "Description of service ",
      validation: {
        required: true,
      },
      description: "Description of service offered",
      dataType: "string",
    },
    link: {
      name: "link to service",
      validation: { required: false },
      dataType: "string",
      description: "Link to service i.e /events ",
    },
  },
});

const LocalMosquesCollection = buildCollection<LocalMosques>({
  path: "LocalMosques",
  name: "LocalMosques",
  singularName: "Mosque",
  group: "Footer",
  permissions: ({ authController }) => {
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
const OtherCollection = buildCollection<Other>({
  path: "Other",
  name: "Other",
  group: "Footer",
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
    name: {
      name: "Title",
      validation: { required: true },
      dataType: "string",
      description: "Name of item, i.e donate",
    },
    link: {
      name: "Link",
      validation: {
        required: true,
        requiredMessage: "You must set a link",
      },
      description: "Link to Item",
      dataType: "string",
    },
  },
});

const InstagramCollection = buildCollection<InstagramPost>({
  path: "Posts",
  name: "Instagram Posts",
  singularName: "Instagram Post",
  initialSort: ["date", "desc"],
  group: "Home Page",

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
      description: "Link to Instagram Post",
      dataType: "string",
    },
    date: buildProperty({
      dataType: "date",
      name: "Created at",
      autoValue: "on_create",
    }),
  },
});

const ResourcesCollection = buildCollection<Resources>({
  path: "Resources",
  name: "Resources",
  singularName: "Resource",
  group: "Footer",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isMarketing = authController.extra?.roles.includes("Marketing");
    const isExternal = authController.extra?.roles.includes("External");
    return {
      edit: isAdmin || isExternal || isMarketing,
      create: isAdmin || isExternal || isMarketing,
      // we have created the roles object in the navigation builder
      delete: isAdmin || isExternal || isMarketing,
    };
  },
  properties: {
    name: {
      name: "Title",
      validation: { required: true },
      dataType: "string",
      description: "Title of link, i.e Tajweed App",
    },
    link: {
      name: "Link",
      validation: {
        required: true,
        requiredMessage: "You must set a link",
      },
      description: "Link to Item",
      dataType: "string",
    },
  },
});
const PrayerRoomsCollection = buildCollection<PrayerRooms>({
  path: "PrayerRooms",
  name: "Prayer rooms",
  singularName: "Prayer room",
  group: "Home Page",
  permissions: ({ authController }) => {
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

const SocialsCollection = buildCollection<Socials>({
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

const WeeklyEventsCollection = buildCollection<WeeklyEvents>({
  path: "WeeklyEvents",
  name: "Events",
  singularName: "Event",
  group: "Home Page",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isEvents = authController.extra?.roles.includes("Events");
    const isReligiousAffairs = authController.extra?.roles.includes("ReligiousAffairs");
    const isExternal = authController.extra?.roles.includes("External");
    return {
      edit: isAdmin || isEvents || isReligiousAffairs || isExternal,
      create: isAdmin || isEvents || isReligiousAffairs || isExternal,
      delete: isAdmin || isEvents || isReligiousAffairs ||isExternal,
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

const CampusResourcesCollection = buildCollection<CampusResource>({
  path: "CampusResources",
  name: "Campus Resources",
  group: "Resources Page",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isMarketing = authController.extra?.roles.includes("Marketing");
    const isProfessionalDevelopment = authController.extra?.roles.includes("ProfessionalDevelopment");
    const isExternal = authController.extra?.roles.includes("External");
    return {
      edit: isAdmin ||isMarketing || isProfessionalDevelopment || isExternal,
      create: isAdmin ||isMarketing || isProfessionalDevelopment || isExternal,
      delete: isAdmin ||isMarketing || isProfessionalDevelopment || isExternal,
    };
  },
  properties: {
    title: buildProperty({
      name: "Title of Resource",
      validation: {
        required: true,
        requiredMessage: "You must set the Title",
      },
      description: "Title of resource",
      dataType: "string",
    }),

    link: buildProperty({
      name: "Link to resource",
      validation: {
        required: true,
        requiredMessage: "You must set a link to the resource",
      },
      description: "Link to resource",
      dataType: "string",
    }),
  },
});

const ReligiousResourcesCollection = buildCollection<ReligiousResource>({
  path: "ReligiousResources",
  name: "Religious Resources",
  group: "Resources Page",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isMarketing = authController.extra?.roles.includes("Marketing");
    const isProfessionalDevelopment = authController.extra?.roles.includes("ProfessionalDevelopment");
    const isExternal = authController.extra?.roles.includes("External");
    return {
      edit: isAdmin ||isMarketing || isProfessionalDevelopment || isExternal,
      create: isAdmin ||isMarketing || isProfessionalDevelopment || isExternal,
      delete: isAdmin ||isMarketing || isProfessionalDevelopment || isExternal,
    };
  },
  properties: {
    title: buildProperty({
      name: "Title of Resource",
      validation: {
        required: true,
        requiredMessage: "You must set the Title",
      },
      description: "Title of resource",
      dataType: "string",
    }),

    link: buildProperty({
      name: "Link to resource",
      validation: {
        required: true,
        requiredMessage: "You must set a link to the resource",
      },
      description: "Link to resource",
      dataType: "string",
    }),
  },
});
const OtherResourcesCollection = buildCollection<OtherResource>({
  path: "OtherResources",
  name: "Other Resources",
  group: "Resources Page",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isMarketing = authController.extra?.roles.includes("Marketing");
    const isProfessionalDevelopment = authController.extra?.roles.includes("ProfessionalDevelopment");
    const isExternal = authController.extra?.roles.includes("External");
    return {
      edit: isAdmin ||isMarketing || isProfessionalDevelopment || isExternal,
      create: isAdmin ||isMarketing || isProfessionalDevelopment || isExternal,
      delete: isAdmin ||isMarketing || isProfessionalDevelopment || isExternal,
    };
  },
  properties: {
    title: buildProperty({
      name: "Title of Resource",
      validation: {
        required: true,
        requiredMessage: "You must set the Title",
      },
      description: "Title of resource",
      dataType: "string",
    }),

    link: buildProperty({
      name: "Link to resource",
      validation: {
        required: true,
        requiredMessage: "You must set a link to the resource",
      },
      description: "Link to resource",
      dataType: "string",
    }),
  },
});



const usersCollection = buildCollection({
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
      validation: { required: true, email: true }
    }),
    role: buildProperty({
      dataType: "string",
      name: "Role",
      validation: { required: true },
     
      enumValues: {
          
          Admin: "Admin", /* Everything */
          Marketing: "Marketing", /* Products + Orders + Instagram Posts + Footer + Resources Page */
          ReligiousAffairs: "Religious Affairs", /* Prayer timings + Prayer Rooms + Events + Local Mosques + Jummah*/
          Events: "Events", /* Emails + Events + Calander wehn made */
          Finance: "Finance", /* Orders + Products */ 
          External:"External/Internal", /* Everything But Users  */
          ProfessionalDevelopment: "Professional Development", /* Resource Page*/
          Member: "Member" /* Nothing lol */
      }
    
    }),
  }
});



import { collection, query, where, getDocs } from "firebase/firestore";

export default function CMS() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (user?.email) {
      
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty && querySnapshot.docs[0]?.exists()) {
          const userData = querySnapshot.docs[0].data();
          if (userData && userData.role) {
            authController.setExtra({ roles: [userData.role] });
            return true;
          }
        }
        throw Error("User not found in the system");
      } else {
        throw Error("No email associated with the Firebase user");
      }
    },
    []
  );
  return (
    <FirebaseCMSApp
      name={"Muslim Students Association "}
      basePath={"/cms"}
      authentication={myAuthenticator}
      collections={[
        usersCollection,
        ordersCollection,
        ProductsCollection,
        PrayerTimingsCollection,
        InstagramCollection,
        MemberCollection,
        FormsCollection,
        JummahCollection,
        LocalMosquesCollection,
        OtherCollection,
        PrayerRoomsCollection,
        ResourcesCollection,
        SocialsCollection,
        WeeklyEventsCollection,
        ServicesOfferedCollection,
        ReligiousResourcesCollection,
        OtherResourcesCollection,
        CampusResourcesCollection,
        EmailCollection,
      ]}
      firebaseConfig={firebaseConfig}
      logo={msalogo.src}
    />
  );
}
