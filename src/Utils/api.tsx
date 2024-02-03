// lib/firebaseApi.js
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  collectionGroup,getDoc,where
} from "firebase/firestore";
import db from "@/firebase";
import { storage } from "@/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { cache } from "react";
export const getNavbarData = cache(async () => {
  const navbarQuery = query(collection(db, "Navbar"), orderBy("index"));
  const navbarQuerySnapshot = await getDocs(navbarQuery);
  const navbarGroups = await Promise.all(
    navbarQuerySnapshot.docs.map(async (doc) => {
      const data = doc.data(); 
      const linksCollectionRef = collection(db, `Navbar/${doc.id}/Links`);
      const linksQuery = query(linksCollectionRef, orderBy("index")); 
      const linksSnapshot = await getDocs(linksQuery);
      const links = linksSnapshot.docs.map(
        (linkDoc) => linkDoc.data() as LinkItem
      );
      return { 
        Group: data.Group, 
        CustomGroup: data.CustomGroup, 
        NoGroup: data.NoGroup, 
        NoGroupLink: data.NoGroupLink, 
        links 
      }; 
    })
  );
  return navbarGroups;
})

export const fetchSocialLinks = cache(async () => {
  const socialsCollectionRef = collection(db, "Socials");
  const socialQuery = query(socialsCollectionRef, orderBy("index", "asc"));
  const querySnapshot = await getDocs(socialQuery);
  return querySnapshot.docs.map((doc) => doc.data() as SocialLink);
});

export const fetchInstagramPosts = cache(async () => {
  const instagramPostsCollectionRef = collection(db, "Posts");
  const postsQuery = query(
    instagramPostsCollectionRef,
    orderBy("date", "desc")
  );
  const querySnapshot = await getDocs(postsQuery); // Use getDocs on the query

  const instagramPostsData = querySnapshot.docs.map((doc) => {
    const data = doc.data() as instagramPost;
    return {
      ...data,
      date: new Date(data.date), // Convert Firestore Timestamp to JavaScript Date
    };
  });
  return instagramPostsData;
});
export const getFooterData = cache(async () => {
  const footerQuery = query(collection(db, "Footer"), orderBy("index"));
  const footerQuerySnapshot = await getDocs(footerQuery);
  const footerGroups = await Promise.all(
    footerQuerySnapshot.docs.map(async (doc) => {
      const data = doc.data(); 
      const linksCollectionRef = collection(db, `Footer/${doc.id}/Links`);
      const linksQuery = query(linksCollectionRef, orderBy("index")); 
      const linksSnapshot = await getDocs(linksQuery);
      const links = linksSnapshot.docs.map(
        (linkDoc) => linkDoc.data() as Links
      );
      return { 
        Group: data.Group, 
        CustomGroup: data.CustomGroup, 
        links 
      }; 
    })
  );
  return footerGroups;
})

export const fetchEvents = cache(async () => {
  const eventsCollectionRef = collection(db, "WeeklyEvents");
  const querySnapshot = await getDocs(eventsCollectionRef);

  return Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const eventData = doc.data() as Events;
      const imgURL = await getDownloadURL(ref(storage, eventData.img)); // Assuming eventData.icon is the path to the icon in Firebase Storage
      return { ...eventData, img: imgURL };
    })
  );
});

export const fetchDiscountCodes = cache(async () => {
  const discountCodesCollection = collection(db, "DiscountCodes");
  const querySnapshot = await getDocs(discountCodesCollection);

  const discountCodeData = querySnapshot.docs.map(
    (doc) => doc.data() as DiscountCodes
  );
  return discountCodeData;
})

export const fetchJummahTimes = cache(async () => {
  const jummahCollectionRef = collection(db, "Jummah");
  const querySnapshot = await getDocs(jummahCollectionRef);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { room: data.room as string, time: data.time as string };
  });
});
export const fetchTimings = cache(async () => {
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });

  let daysCollectionRef = collection(db, "PrayerTimings", currentMonth, "Days");
  let q = query(daysCollectionRef, orderBy("Day", "asc"));

  let querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    timings: doc.data() as Timings,
    day: doc.data().Day as number,
  }));
});

export const getResourcesData= cache(async () => {
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
})
export const  getServicesOffered =  cache(async () => {
  const serviceCollectionRef = collection(db, 'ServicesOffered');
  const querySnapshot = await getDocs(serviceCollectionRef);

  const servicesInfo = querySnapshot.docs.map((doc) => ({
   
    ...doc.data(),
  }));

  return servicesInfo;
})

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

export const getProductsData =  cache(async () => {
  const productsCollectionRef = collection(db, 'Products');
  const querySnapshot = await getDocs(productsCollectionRef);

  const productsData = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    // If using TypeScript, ensure that the data structure matches the Product type
    return { ...data as Product, id: doc.id };
  });

  return productsData;
})

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

  
  return [
    { id: 'category1', name: 'Category 1' },
    { id: 'category2', name: 'Category 2' },
    { id: 'category3', name: 'Category 3' },
    // ... other filters
  ];
};

export const fetchPrayerRooms = cache(async () => {
  const prayerRoomsCollectionRef = collection(db, "PrayerRooms");
  const querySnapshot = await getDocs(prayerRoomsCollectionRef);

  const prayerRoomsData = querySnapshot.docs.map(doc => {
    return doc.data() as PrayerRoomItem; // Cast the data to the PrayerRoomItem type
  });

  return prayerRoomsData;
})

export const fetchJummahInfo = cache(async () => {
  const jummahCollectionRef = collection(db, "Jummah");
  const querySnapshot = await getDocs(jummahCollectionRef);

  return querySnapshot.docs.map((doc) => doc.data() as JummahItem);
})

export const fetchTodaysTimings  = cache(async () => {
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const dayOfMonth = today.getDate();
  const daysCollectionRef = collection(db, "PrayerTimings", currentMonth, "Days");
  const q = query(daysCollectionRef, where("Day", "==", dayOfMonth));
  const querySnapshot = await getDocs(q);
  const doc = querySnapshot.docs[0];
  return doc ? { timings: doc.data() as Timings, day: doc.data().Day as number } : null;
});

export const fetchYoutubeVideos = cache(async (category:string) => {
  const youtubeVideosCollectionRef = collection(db, "Recordings");
  const postsQuery = query(
    youtubeVideosCollectionRef,
    where("category", "==", category), // Filter based on category
    orderBy("date", "desc")
  );
  const querySnapshot = await getDocs(postsQuery); // Use getDocs on the query

  const youtubeVideosData = querySnapshot.docs.map((doc) => {
    const data = doc.data() as  YoutubeVideo;
    return {
      ...data,
      date: new Date(data.date), // Convert Firestore Timestamp to JavaScript Date
    };
  });
  return youtubeVideosData;
});


export const getBlogsData =  cache(async () => {
  const blogCollectionRef = collection(db, 'blog');
  const querySnapshot = await getDocs(blogCollectionRef);

  const blogData = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    // If using TypeScript, ensure that the data structure matches the Product type
    return { ...data as BlogEntry, id: doc.id };
  });

  return blogData;
})
export async function getPost(id: string): Promise<{ post:BlogEntry }> {
  let post = null;
  

  try {
    const docRef = doc(db, "blog", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      post = {
        ...docSnap.data(),
      } as BlogEntry;

    
      //const imageRef = ref(storage, post.image);
      //imageUrl = await getDownloadURL(imageRef).catch(() => '');
    }
  } catch (error) {
    // Handle any errors here, such as logging or throwing the error
    console.error("Error fetching product: ", error);
    throw new Error("Error fetching product");
  }

  return { post: post ? post : {} as BlogEntry };
}

export const heroRef = ref(storage, "images/hero.jpg");
export const heroUrl = await getDownloadURL(heroRef);
