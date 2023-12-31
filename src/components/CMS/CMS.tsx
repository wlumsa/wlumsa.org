"use client";
import msalogo from "public/logo.png";


import React, { useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import {
  Authenticator,
  buildCollection,
  buildProperty,
  FirebaseCMSApp,
} from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import { firebaseConfig } from "../../firebase";
import db from "../../firebase";
import { EmailCollection } from "./Collections/EmailCollection";
import {ProductsCollection} from "./Collections/Products Page/ProductCollection"
import { usersCollection } from "./Collections/UsersCollection";
import { CampusResourcesCollection } from "./Collections/Resources Page/CampusResourceCollection";
import { FormsCollection } from "./Collections/Footer/FormsCollection";
import { InstagramCollection } from "./Collections/Home Page/InstagramCollection";
import { JummahCollection } from "./Collections/Home Page/JummahCollection";
import { LocalMosquesCollection } from "./Collections/Footer/LocalMosquesCollection";
import { MemberCollection } from "./Collections/MembersCollection";
import { ordersCollection } from "./Collections/Products Page/OrdersCollection";
import { OtherCollection } from "./Collections/Footer/OtherCollection";
import { OtherResourcesCollection } from "./Collections/Resources Page/OtherResourceCollection";
import { PrayerRoomsCollection } from "./Collections/Home Page/PrayerRoomsCollection";
import { PrayerTimingsCollection } from "./Collections/PrayerTimings Page/PrayerTimingsCollection";
import { ReligiousResourcesCollection} from "./Collections/Resources Page/ReligiousResourceCollection"
import { ResourcesCollection } from "./Collections/Footer/ResourcesCollection";
import { ServicesOfferedCollection } from "./Collections/Resources Page/ServicesCollection";
import { SocialsCollection } from "./Collections/Footer/SocialsCollection";
import { WeeklyEventsCollection } from "./Collections/Home Page/WeeklyEventsCollection";
export const customFormCollection = buildCollection<CustomForm>({
  name: "Custom Forms",
  path: "custom_forms",
  properties: {
    name: buildProperty({
      name: "Title",
      validation: { required: false },
      dataType: "string",
    }),
    title: buildProperty({
      name: "Subject",
      validation: { required: true },
      dataType: "string",
    }),
    description: buildProperty({
      name: "Description",
      validation: { required: true },
      dataType: "string",
    }),
    questions: buildProperty({
      name: "Questions",
      dataType: "array",
      oneOf: {
        typeField: "type",
        properties: {
          paragraph: buildProperty({
            name: "Paragraph ",
            dataType: "map",
            properties: {
              label: { name: "Label", dataType: "string" },
              required: { name: "Required", dataType: "boolean" },
            },
          }),
          short_ans: buildProperty({
            name: "Short Answer",
            dataType: "map",
            properties: {
              label: { name: "Label", dataType: "string" },
              maxCharacters: { name: "Max characters", dataType: "number" },
              required: { name: "Required?", dataType: "boolean" },
              // Add other properties specific to FormShortAns
            },
          }),
          image: buildProperty({
            name: "Images",
            dataType: "array",
            of: buildProperty({
              dataType: "string",
              storage: {
                mediaType: "image",
                storagePath: "forms/images",
                acceptedFiles: ["image/*"],
                metadata: { cacheControl: "max-age=1000000" },
              },
            }),
            description:
              "This field allows uploading multiple images at once and reordering",
          }),
          attachments: buildProperty({
            name: "Attachments",
            dataType: "array",
            of: buildProperty({
              dataType: "string",
              storage: {
                mediaType: "file",
                storagePath: "emails/attachments",
                acceptedFiles: [".pdf", ".doc", ".docx", ".xls", ".xlsx"], // List of accepted file types
              },
            }),
          }), // Missing comma here
          number: buildProperty({
            name: "Number",
            dataType: "map",
            properties: {
              label: { name: "Label", dataType: "string" },
              min: { name: "Min", dataType: "number" },
              max: { name: "Max", dataType: "number" },
              required: { name: "Required?", dataType: "boolean" },
              // Add other properties specific to FormNumber
            },
          }),
          checkbox: buildProperty({
            name: "Checkbox",
            dataType: "map",
            properties: {
              questionText: { name: "Label", dataType: "string" },
              options: {
                label: "Options",
                dataType: "array",
                of: { dataType: "string" },
              },
              required: { name: "Required?", dataType: "boolean" },
              // Add other properties specific to FormCheckbox
            },
          }),
          multiple_choice: buildProperty({
            name: "Multiple Choice",
            dataType: "map",
            properties: {
              questionText: { dataType: "string" },
              options: {
                label: "Options",
                dataType: "array",
                of: { dataType: "string" },
              },
              required: { name: "Required?", dataType: "boolean" },
              // Add other properties specific to FormMultipleChoiceQuestion
            },
          }),
          email: buildProperty({
            name: "Email",
            dataType: "map",
            properties: {
              label: { name: "label", dataType: "string" },
              required: { name: "Required?", dataType: "boolean" },
              // Add other properties specific to FormEmail
            },
          }),
          telephone: buildProperty({
            name: "Telephone Number",
            dataType: "map",
            properties: {
              label: { name: "label", dataType: "string" },
              required: { name: "Required?", dataType: "boolean" },
            },
          }),
        },
      },
    }),
    registrationLimit: buildProperty({
      name: "Registration Limit",
      validation: { required: false },
      dataType: "number",
      description:
        "Maximum number of registrations allowed (leave empty for no limit)",
    }),
    sendEmails: buildProperty({
      name: "Send Emails",
      dataType: "boolean",
      description: "Enable to send confirmation emails to registrants",
    }),
  },
});






























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
        customFormCollection,
      ]}
      firebaseConfig={firebaseConfig}
      logo={msalogo.src}
    />
  );
}
