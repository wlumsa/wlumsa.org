// pages/events.tsx
import React from "react";
import CalendarComponent from "~/components/UI/CalenderComponent";
import { GetStaticProps } from "next";
import Navbar from "~/components/Global/Navbar";
import Footer from "~/components/Global/Footer";
import { getNavbarData, getFooterData, fetchSocialLinks } from "~/lib/api";
import { NextPage } from "next";
interface EventsProps{
  socialLinks: SocialLinkProps[];
  navbarData: NavbarGroup[]; 
  footerData: FooterGroup[];
}
const Events: NextPage<EventsProps> = ({
  socialLinks,
  navbarData, // Add this line
  footerData,
}) => {
  return (
    <div>
      <Navbar navbarData={navbarData} />
      <div className=" min-h-screen">
        <div className="flex flex-col py-10">
          <CalendarComponent />
          <div className="mt-4 text-center">
            <a
              href="https://calendar.google.com/calendar/u/1?cid=ZmZhZWUwMTExMjBmYWIzOTZjNDBjZWY1NWUyYjA0OTY5NmEzYTUwYmNhMzIyOWE1MDAwMjM2ODQ1MTc5OTU5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10"
            >
              <button className="btn border-0 bg-primary text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
                Add to your calendar
              </button>
            </a>
          </div>
        </div>
      </div>
      <Footer footerGroups={footerData} socialLinks={socialLinks} />
      
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  try {
    const socialLinks = await fetchSocialLinks();
    const navbarData = await getNavbarData();
    const footerData = await getFooterData();
    return {
      props: {
        socialLinks,
        navbarData,
        footerData,
      },
      revalidate: 43200, // or however many seconds you prefer
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        socialLinks: [],
        navbarData: [],
        footerdata: [],
      },
    };
  }
};

export default Events;
