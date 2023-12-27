import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MemberSignup from "../components/MemberSignup";
import PrayerSection from "../components/PrayerSection";
import News from "../components/News";
import Events from "../components/WeeklyEvents";
import { Timestamp } from "firebase/firestore";
import { GetStaticProps } from "next";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import db, { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Popup from "~/components/Popup";

interface SocialLinkProps {
  name: string;
  link: string;
  icon: string;
  date?: string; // Define date as string
}
interface Events {
  day: string;
  desc: string;
  img: string;
  name: string;
  room: string;
  time: string;
}

interface HomeProps {
  socialLinks: SocialLinkProps[];
  heroUrl: string;
  events: Events[]; // Add this line
}
const Home: NextPage<HomeProps> = ({
  socialLinks,
  heroUrl,
  events,
}) => {
  return (
    <>
      <Head>
        <title>WLU MSA</title>
        <meta name="The Laurier Muslim Student Association (MSA) is a student-run organization at Laurier which was founded in 2010. Its primary purpose is to provide a platform for Muslim students to come together, practice their faith, engage in community service, and promote understanding and awareness of Islam on campus." />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-base-100 ">
        <Navbar />
        <Hero socialLinks={socialLinks} heroUrl={heroUrl} />
        <Popup />
        <News />
        <PrayerSection />
        <Events events={events} />
        <MemberSignup />
        <Footer />
      </main>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const fetchSocialLinks = async () => {
    const socialsCollectionRef = collection(db, "Socials");
    const socialQuery = query(socialsCollectionRef, orderBy("date", "asc"));
    const querySnapshot = await getDocs(socialQuery);
    return querySnapshot.docs.map((doc) => doc.data());
  };

  const socialLinks = await fetchSocialLinks();

  const socialLinksData: SocialLinkProps[] = socialLinks.map((socialData) => {
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
  const fetchEvents = async () => {
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

  const heroRef = ref(storage, "images/hero.jpg");
  const url = await getDownloadURL(heroRef);
  const events = await fetchEvents();
  return {
    props: {
      socialLinks: socialLinksData,

      heroUrl: url,
      events,
    },
  };
};
export default Home;
