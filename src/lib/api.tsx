// lib/firebaseApi.js
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  collectionGroup,
} from "firebase/firestore";
import db from "~/firebase";
import { storage } from "~/firebase";
import { ref, getDownloadURL } from "firebase/storage";

export async function getNavbarData() {
  const navbarQuery = query(collection(db, "Navbar"), orderBy("index"));
  const navbarQuerySnapshot = await getDocs(navbarQuery);
  const navbarGroups = await Promise.all(
    navbarQuerySnapshot.docs.map(async (doc) => {
      const data = doc.data(); // Assuming the Navbar type matches your data structure
      const linksCollectionRef = collection(db, `Navbar/${doc.id}/Links`);
      const linksQuery = query(linksCollectionRef, orderBy("index")); // If you want to order links as well
      const linksSnapshot = await getDocs(linksQuery);
      const links = linksSnapshot.docs.map(
        (linkDoc) => linkDoc.data() as Links
      );
      return { ...data, links };
    })
  );
  return navbarGroups;
}

export const fetchSocialLinks = async () => {
  const socialsCollectionRef = collection(db, "Socials");
  const socialQuery = query(socialsCollectionRef, orderBy("index", "asc"));
  const querySnapshot = await getDocs(socialQuery);
  return querySnapshot.docs.map((doc) => doc.data());
};
export async function getFooterData() {
  const footerQuery = query(collection(db, "Footer"), orderBy("index"));
  const footerQuerySnapshot = await getDocs(footerQuery);
  const footerGroups = await Promise.all(
    footerQuerySnapshot.docs.map(async (doc) => {
      const data = doc.data(); // Assuming the Footer type matches your data structure
      const linksCollectionRef = collection(db, `Footer/${doc.id}/Links`);
      const linksQuery = query(linksCollectionRef, orderBy("index")); // If you want to order links as well
      const linksSnapshot = await getDocs(linksQuery);
      const links = linksSnapshot.docs.map((linkDoc) => {
        const linkData = linkDoc.data() as Links;

        return linkData;
      });
      return { ...data, links };
    })
  );
  return footerGroups;
}

export const fetchEvents = async () => {
  const eventsCollectionRef = collection(db, "WeeklyEvents");
  const querySnapshot = await getDocs(eventsCollectionRef);

  return Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const eventData = doc.data() as Events;
      const imgURL = await getDownloadURL(ref(storage, eventData.img)); // Assuming eventData.icon is the path to the icon in Firebase Storage
      return { ...eventData, img: imgURL };
    })
  );
};

export async function fetchDiscountCodes() {
  const discountCodesCollection = collection(db, "DiscountCodes");
  const querySnapshot = await getDocs(discountCodesCollection);

  const discountCodeData = querySnapshot.docs.map(
    (doc) => doc.data() as DiscountCodes
  );
  return discountCodeData;
}

export const fetchJummahTimes = async (): Promise<Jummah[]> => {
  const jummahCollectionRef = collection(db, "Jummah");
  const querySnapshot = await getDocs(jummahCollectionRef);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { room: data.room as string, time: data.time as string };
  });
};
export const fetchTimings = async (): Promise<DayTimings[]> => {
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
  
    let daysCollectionRef = collection(db, 'PrayerTimings', currentMonth, 'Days');
    let q = query(daysCollectionRef, orderBy('Day', 'asc'));
  
    let querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      timings: doc.data() as Timings,
      day: doc.data().Day as number,
    }));
  };
  

export const heroRef = ref(storage, "images/hero.jpg");
export const heroUrl = await getDownloadURL(heroRef);
