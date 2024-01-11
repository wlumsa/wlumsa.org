import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../components/UI/Hero";

import MemberSignup from "../components/UI/MemberSignup";
import PrayerSection from "../components/UI/PrayerSection";
import News from "../components/UI/News";
import Events from "../components/UI/WeeklyEvents";
import { GetStaticProps } from "next";
import Navbar from "~/components/Global/Navbar";
import Popup from "~/components/UI/Popup";
import Footer from "~/components/Global/Footer";


interface HomeProps {
  socialLinks: SocialLinkProps[];
  heroUrl: string;
  events: Events[];
  navbarData: NavbarGroup[]; // Add this line
  footerData: FooterGroup[]
  prayerRoomsData: PrayerRoomItem[];
  jummahInfo: JummahInfo[];
  timingsData: DayTimings;
}

const Home: NextPage<HomeProps> = ({
  socialLinks,
  heroUrl,
  events,
  navbarData, // Add this line
  footerData,
  prayerRoomsData,
  jummahInfo,
  timingsData,
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
      <Navbar navbarData={navbarData} />
        <Hero socialLinks={socialLinks} heroUrl={heroUrl} />
        <Popup />
        <News />
        <PrayerSection prayerRoomsData={prayerRoomsData}  jummahInfo={jummahInfo}  timingsData={timingsData} />

        <Events events={events} />
        <MemberSignup />
        <Footer footerGroups={footerData} socialLinks={socialLinks} />
      </main>
    </>
  );
};
import { fetchPrayerRooms, fetchSocialLinks,getFooterData,fetchJummahInfo,fetchTodaysTimings  } from "~/lib/api";
import { fetchEvents, getNavbarData,heroUrl } from "~/lib/api";


export const getStaticProps: GetStaticProps = async () => {
  try {
    const socialLinks = await fetchSocialLinks();
    const events = await fetchEvents();
    const navbarData = await getNavbarData();
    const heroImageUrl = heroUrl;
    const footerData = await getFooterData();
    const prayerRoomsData = await fetchPrayerRooms()
    const jummahInfo = await fetchJummahInfo();
    const timingsData = await fetchTodaysTimings();
    return {
      props: {
        socialLinks,
        prayerRoomsData,
        events,
        navbarData,
        footerData,
        heroUrl: heroImageUrl,
        jummahInfo,
        timingsData
      },
      revalidate: 43200, // or however many seconds you prefer
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        socialLinks: [],
        events: [],
        navbarData: [],
        footerdata:[],
        heroUrl: '', // Provide a default value or handle the error as appropriate
      },
    };
  }
};

export default Home;
