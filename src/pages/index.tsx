import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MemberSignup from "../components/MemberSignup";
import PrayerSection from "../components/PrayerSection";
import News from "../components/News";
import Events from "../components/WeeklyEvents";
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Popup from "~/components/Popup";


// Define the props structure for prayer times
interface PrayerTimesProps {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface IndexPageProps {
  prayerTimes: PrayerTimesProps;
}
export const getServerSideProps: GetServerSideProps = async () => {
  const city = "Waterloo";
  const country = "Canada";
  const state = "Ontario";
  const response = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&state=${state}&school=1`
  );
  const data = await response.json();

  if (!response.ok) {
    return { props: { timings: null } }; // Handle the error appropriately
  }

  return {
    props: {
      prayerTimes: data.data.timings || null,
    },
  };
};
const Home: NextPage<IndexPageProps> = ({ prayerTimes }) => {
const [popupOpen, setPopupOpen] = useState(false);

useEffect(() => {
  const popupDisplayed = localStorage.getItem('popupDisplayed');
  if(!popupDisplayed) {
    const timeout = setTimeout(() => {
      setPopupOpen(true);
      localStorage.setItem('popupDisplayed', 'true');

    }, 4000);
    return () => clearTimeout(timeout);  

  } 
}, [])
const displayPopup = () => {
  setPopupOpen(true);
};

const hidePopup = () => {
  setPopupOpen(false);
};

  return (
    <>
        <Head>
            <title>WLU MSA</title>
            <meta name="description" />
            <link rel="icon" href="/logo.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center bg-base-100 ">
            <Navbar />
            <Hero />
           
            {popupOpen && (
        <div className="overlay fixed inset-0 bg-black opacity-50 z-50"></div>)}  
      <Popup isPopupOpen={popupOpen} hidePopup={hidePopup}/>
         
            <News /> 
            <PrayerSection prayerTimes={prayerTimes} />
            <Events />
            <MemberSignup/>
            <Footer/>
        </main>
    </>
  );
};

export default Home;
