import { NextPage } from "next";
import React from "react";
import Footer from "~/components/Global/Footer";
import Navbar from "~/components/Global/Navbar";
import { GetStaticProps } from "next";
import {
  getServicesOffered,
  getNavbarData,
  getFooterData,
  fetchSocialLinks,
} from "~/lib/api";
interface AboutUsPageProps {
  servicesInfo: ServicesOffered[];
  socialLinks: SocialLinkProps[];
  navbarData: NavbarGroup[];
  footerData: FooterGroup[];
}
export const getStaticProps: GetStaticProps = async () => {
  const servicesInfo = await getServicesOffered();
  const socialLinks = await fetchSocialLinks();
  const navbarData = await getNavbarData();
  const footerData = await getFooterData();
  return {
    props: {
      servicesInfo,
      socialLinks,
      navbarData,
      footerData,
    },
    revalidate: 43200,
  };
};
const About: NextPage<AboutUsPageProps> = ({ servicesInfo,socialLinks,navbarData,footerData }) => {
  return (
    <div className="min-h-screen">
      <Navbar navbarData={navbarData} />
      <div className="mt-20  flex-grow px-10">
        <div className="flex flex-col items-center justify-center">
          {/* About Us Section */}
          <div className="hero h-fit self-center">
            <div className="min-w-96 hero-content flex flex-col items-center justify-center gap-8 sm:max-w-[80%]">
              <h1 className="text-center text-4xl font-bold text-primary">
                About Us
              </h1>
              <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                <img
                  src="/logo.png"
                  className="h-64 w-64 rounded-lg shadow-2xl md:h-48 md:w-48"
                />
                <p className="py-6 text-lg">
                  The <strong>Laurier Muslim Student Association (MSA)</strong>{" "}
                  is a student-run organization at Laurier which was founded in
                  2010. Its primary purpose is to provide a platform for Muslim
                  students to come together, practice their faith, engage in
                  community service, and promote understanding and awareness of
                  Islam on campus.
                </p>
              </div>
            </div>
          </div>

          {/* Services Offered Section */}
          <div className="flex-1 " id="services">
            <h2 className="mb-4 text-center text-4xl font-bold text-primary">
              Services Offered
            </h2>
            <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
              {servicesInfo.map((service, index) => (
                <div
                  className="card card-compact w-fit bg-base-100 shadow-xl sm:w-96"
                  key={index}
                >
                  <div className="card-body">
                    <h3 className="card-title mb-2 text-2xl font-semibold text-secondary">
                      {service.title}
                    </h3>
                    <p className="text-neutral">{service.description}</p>
                    {/* Conditionally render the button if service.link is not empty */}
                    {service.link && (
                      <div className="card-actions justify-end">
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-secondary"
                        >
                          <button className="btn btn-primary mt-4 border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
                            Learn more
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer footerGroups={footerData} socialLinks={socialLinks} />
    </div>
  );
};

export default About;
