// lib/firebaseApi.js
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  collectionGroup,getDoc,
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
  const currentMonth = today.toLocaleString("default", { month: "long" });

  let daysCollectionRef = collection(db, "PrayerTimings", currentMonth, "Days");
  let q = query(daysCollectionRef, orderBy("Day", "asc"));

  let querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    timings: doc.data() as Timings,
    day: doc.data().Day as number,
  }));
};

export async function getResourcesData() {
  const resourcesQuery = query(collection(db, "Resources"), orderBy("index"));
  const resourcesQuerySnapshot = await getDocs(resourcesQuery);;

  const resourcesData = await Promise.all(
    resourcesQuerySnapshot.docs.map(async (doc) => {
      const group = doc.data().Group;
      const linksCollectionRef = collection(db, `Resources/${doc.id}/Links`);
      const linksQuery = query(linksCollectionRef, orderBy("index"));
      const linksQuerySnapshot = await getDocs(linksQuery);
      const links = linksQuerySnapshot.docs.map((linkDoc) => linkDoc.data());

      return {
        group,
        links,
      };
    })
  );

  return resourcesData;
}
export async function getServicesOffered() {
  const serviceCollectionRef = collection(db, 'ServicesOffered');
  const querySnapshot = await getDocs(serviceCollectionRef);

  const servicesInfo = querySnapshot.docs.map((doc) => ({
   
    ...doc.data(),
  }));

  return servicesInfo;
}

export async function getProductsData() {
  const productsCollectionRef = collection(db, 'Products');
  const querySnapshot = await getDocs(productsCollectionRef);

  const productsData = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    // If using TypeScript, ensure that the data structure matches the Product type
    return { ...data, id: doc.id };
  });

  return productsData;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  hasSizes: boolean;
  quantity: number;
  sizes: { S: number; M: number; L: number };
  tags: string[];
}
export async function fetchProduct(id: string): Promise<{ product: Product | null, imageUrl: string }> {
  let product = null;
  let imageUrl = '';

  try {
    const docRef = doc(db, "Products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      product = {
        id: docSnap.id,
        ...docSnap.data(),
      } as Product;

    
      const imageRef = ref(storage, product.image);
      imageUrl = await getDownloadURL(imageRef).catch(() => '');
    }
  } catch (error) {
    // Handle any errors here, such as logging or throwing the error
    console.error("Error fetching product: ", error);
    throw new Error("Error fetching product");
  }

  return { product, imageUrl };
}

export const fetchProductIds = async () => {
  const productsCollectionRef = collection(db, 'Products');
  const querySnapshot = await getDocs(productsCollectionRef);
  return querySnapshot.docs.map((doc) => ({
    params: { id: doc.id },
  }));
};
export const fetchFilters = async () => {
  // Simulating a delay and fetching filters (e.g., from a database or external API)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return a list of filters (e.g., categories, tags, etc.)
  // This is just example data. Replace this with your actual filter data.
  return [
    { id: 'category1', name: 'Category 1' },
    { id: 'category2', name: 'Category 2' },
    { id: 'category3', name: 'Category 3' },
    // ... other filters
  ];
};
export const heroRef = ref(storage, "images/hero.jpg");
export const heroUrl = await getDownloadURL(heroRef);
