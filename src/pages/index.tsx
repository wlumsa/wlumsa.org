import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../components/UI/Hero";

import MemberSignup from "../components/UI/MemberSignup";
import PrayerSection from "../components/UI/PrayerSection";
import News from "../components/UI/News";
import Events from "../components/UI/WeeklyEvents";

import { GetStaticProps } from "next";

import Popup from "~/components/UI/Popup";

import { getSocialLinksData, getEventsData, getHeroImageURL } from "../components/Uitlity/dataFetcher"
import Navbar from "~/components/Global/Navbar";
import Footer from "~/components/Global/Footer";
import { getNavbarData, getFooterData } from "../components/Uitlity/dataFetcher";
type HomeProps = {
  socialLinks: SocialLinkProps[];
  heroUrl: string;
  events: EventsProps;
  navbar: Navbar;
  footer: Footer;
};

const Home: NextPage<HomeProps> = ({
  socialLinks,
  heroUrl,
  events,
  navbar,
  footer,
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
        <Events events={events.events} />
        <MemberSignup />
       
      </main>
    </>
  );
};


export const getStaticProps: GetStaticProps = async () => {
  const socialLinksData = await getSocialLinksData();
  const eventsData = await getEventsData();
  const heroUrl = await getHeroImageURL();
  const navbarData = await getNavbarData(); // Ensure this returns NavbarGroup[]
  console.log(navbarData)
  const footerData = await getFooterData();

  return {
    props: {
      socialLinks: socialLinksData,
      events: eventsData,
      heroUrl,
      navbar: navbarData, // This should be NavbarGroup[]
      footer: footerData,
    },
    revalidate: 60 * 60 * 24, // This will re-generate the page every 24 hours
  };
};
export default Home;
