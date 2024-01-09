import React from "react";
import CtaForm from "~/components/Forms/CtaForm";
import { GetStaticProps } from "next";
import Navbar from "~/components/Global/Navbar";
import Footer from "~/components/Global/Footer";
import { getNavbarData, getFooterData, fetchSocialLinks } from "~/lib/api";
import { NextPage } from "next";
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
interface ContactPageProps {
  socialLinks: SocialLinkProps[];
  navbarData: NavbarGroup[];
  footerData: FooterGroup[];
}
const Contact: NextPage<ContactPageProps> = ({
  socialLinks,
  navbarData, // Add this line
  footerData,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar navbarData={navbarData} />
      <div className="mt-20 flex flex-col items-center flex-grow">
        <section className="bg-base-100" id="contact">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-4">
              <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                <h2 className="pt-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105 lg:pt-0">
                  Contact Us!
                </h2>
                <p className="text-center lg:text-lg">
                  Fill out the form or send us a message on one of our social
                  media accounts!
                </p>
              </div>
            </div>
            <div className="flex items-stretch justify-center">
              <div className="hidden md:grid md:grid-cols-2">
                <div>
                  <p className="mb-12 mt-3 text-sm text-gray-600">
                    At the Laurier Muslim Students Association we are commited
                    to ensure the spiritural and professional development of
                    Laurier Students as well as provide a variety of services to
                    enhance the student experience. If you would like to
                    colloberate with us fill out the form
                  </p>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca"
                    className="h-96 w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                  <CtaForm category="Contact" />
                </div>
              </div>
            </div>
            <div className="grid md:hidden">
              <div>
                <p className="mb-12 mt-3 text-sm text-gray-600">
                  At the Laurier Muslim Students Association we are commited to
                  ensure the spiritural and professional development of Laurier
                  Students as well as provide a variety of services to enhance
                  the student experience. If you would like to colloberate with
                  us fill out the form
                </p>
                <CtaForm category="Contact" />
              </div>
              <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.5123406885597!2d-80.52840270038443!3d43.47394430083161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3f61b1f9a23%3A0xd224e64459372537!2sWilfrid%20Laurier%20University%20Waterloo%20Campus!5e0!3m2!1sen!2sca!4v1699381173730!5m2!1sen!2sca"
                  className="h-96 w-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer footerGroups={footerData} socialLinks={socialLinks} />
    </div>
  );
};

export default Contact;
