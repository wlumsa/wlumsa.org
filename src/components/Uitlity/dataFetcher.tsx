// lib/dataFetcher.ts
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import db from '~/firebase';
import { storage } from '~/firebase';
type LinksWithStringDate = {
  link: string;
  createdAt: string;
  name: string;
};


export const getFooterData = async () => {
  const footerQuery = query(collection(db, "Footer"), orderBy("createdAt"));
  const querySnapshot = await getDocs(footerQuery);

  const groups = await Promise.all(querySnapshot.docs.map(async (doc) => {
    const data = doc.data() as Footer;
    const linksSnapshot = await getDocs(collection(db, `Footer/${doc.id}/Links`));
    const links = linksSnapshot.docs.map(doc => doc.data() as Links);
    return { ...data, Links: links };
  }));

  const socialsCollectionRef = collection(db, "Socials");
  const socialQuery = query(socialsCollectionRef, orderBy("date", "asc"));
  const socialQuerySnapshot = await getDocs(socialQuery);

  const socialLinksData = socialQuerySnapshot.docs.map((doc) => {
    const socialData = doc.data() as Socials;
    return socialData;
  });

  return { footerGroups: groups, socialLinks: socialLinksData };
};

export const getNavbarData = async () => {

  const navbarQuery = query(collection(db, "Navbar"), orderBy("createdAt"));
  const navbarQuerySnapshot = await getDocs(navbarQuery);
  
  const navbarGroups = await Promise.all(
    navbarQuerySnapshot.docs.map(async (doc) => {
      const data = doc.data() as Navbar;
      const group = data.Group === "Other" ? (data.CustomGroup ?? "Other") : data.Group;
      let links: LinksWithStringDate[] = [];

      if (data.Group !== "None") {
        const linksQuerySnapshot = await getDocs(
          collection(db, `Navbar/${doc.id}/Links`)
        );
        links = linksQuerySnapshot.docs.map((linkDoc) => {
          const linkData = linkDoc.data() as Links;
          return {
            ...linkData,
            link: linkData.link ?? "#",
            createdAt: linkData.createdAt.toISOString(), // Convert Date to string
          };
        });
      }

      return {
        group,
        CustomGroup: data.CustomGroup,
        NoGroup: data.NoGroup,
        NoGroupLink: data.NoGroupLink,
        links,
      };
    })
  );

  return navbarGroups;
};

export const getSocialLinksData = async (): Promise<SocialLinkProps[]> => {
  const socialsCollectionRef = collection(db, "Socials");
  const socialQuery = query(socialsCollectionRef, orderBy("date", "asc"));
  const querySnapshot = await getDocs(socialQuery);
  const socialLinks = querySnapshot.docs.map((doc) => doc.data());

  return socialLinks.map((socialData) => {
    let date: string | undefined;
    if (socialData.date) {
      if (typeof socialData.date === "string") {
        date = socialData.date;
      } else if (socialData.date instanceof Timestamp) {
        date = socialData.date.toDate().toISOString();
      }
    }
    return {
      name: socialData.name,
      link: socialData.link,
      icon: socialData.icon,
      date,
    };
  });
};

export const getEventsData = async (): Promise<Events[]> => {
  const eventsCollectionRef = collection(db, "WeeklyEvents");
  const querySnapshot = await getDocs(eventsCollectionRef);

  return Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const eventData = doc.data() as Events;
      const imgURL = await getDownloadURL(ref(storage, eventData.img)); // Assuming eventData.img is the path to the image in Firebase Storage
      return { ...eventData, img: imgURL };
    })
  );
};

export const getHeroImageURL = async (): Promise<string> => {
  const heroRef = ref(storage, "images/hero.jpg");
  return await getDownloadURL(heroRef);
};