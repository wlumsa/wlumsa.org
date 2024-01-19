"use client";
import msalogo from "../../logo.png"
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
import { ProductsCollection } from "./Collections/Products Page/ProductCollection";
import { usersCollection } from "./Collections/UsersCollection";
import { InstagramCollection } from "./Collections/Home Page/InstagramCollection";
import { JummahCollection } from "./Collections/Home Page/JummahCollection";
import { MemberCollection } from "./Collections/MembersCollection";
import { ordersCollection } from "./Collections/Products Page/OrdersCollection";
import { PrayerRoomsCollection } from "./Collections/Home Page/PrayerRoomsCollection";
import { PrayerTimingsCollection } from "./Collections/PrayerTimings Page/PrayerTimingsCollection";
import { SocialsCollection } from "./Collections/Footer/SocialsCollection";
import { WeeklyEventsCollection } from "./Collections/Home Page/WeeklyEventsCollection";
import { NavbarCollection } from "./Collections/Footer/NavbarCollection";
import { FooterCollection } from "./Collections/Footer/FooterCollection";
import { ResourcesCollection } from "./Collections/Resources Page/ResourcesCollection";
import { blogCollection } from "./Collections/BlogCollection";

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
        FooterCollection,
        JummahCollection,
        PrayerRoomsCollection,
        SocialsCollection,
        WeeklyEventsCollection,
        EmailCollection,
        NavbarCollection,
        ResourcesCollection,
        blogCollection
      ]}
      firebaseConfig={firebaseConfig}
      logo={msalogo.src}
    />
  );
}
