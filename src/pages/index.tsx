import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MemberSignup from "../components/MemberSignup";
import PrayerSection from "../components/PrayerSection";
import News from "../components/News";
import Events from "../components/WeeklyEvents";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WLU MSA</title>
        <meta name="description" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-base-100 ">
        <Navbar />
        <Hero />
        <News />
        <PrayerSection />
        <Events />
        <MemberSignup />
        <Footer />
      </main>
    </>
  );
};

export default Home;
