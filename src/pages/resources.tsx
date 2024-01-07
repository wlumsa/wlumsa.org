import React from "react";

import { GetStaticProps } from "next";

import { NextPage } from "next";
import Navbar from "~/components/Global/Navbar";
import Footer from "~/components/Global/Footer";
interface ResourcePageProps {
  resourcesData: ResourceData[];
  navbarData: NavbarGroup[];
  footerData: FooterGroup[];
  socialLinks: SocialLinkProps[];
}
import {
  getNavbarData,
  getFooterData,
  fetchSocialLinks,
  getResourcesData,
} from "~/lib/api";
export const getStaticProps: GetStaticProps = async () => {
  const resourcesData = await getResourcesData();
  const socialLinks = await fetchSocialLinks();

  const navbarData = await getNavbarData();

  const footerData = await getFooterData();

  return {
    props: {
      resourcesData,
      socialLinks,
      navbarData,
      footerData,
    },
    revalidate: 43200, // or however many seconds you prefer
  };
};

const ResourcesPage: NextPage<ResourcePageProps> = ({
  resourcesData,
  navbarData,
  footerData,
  socialLinks,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navbarData={navbarData} />
      <main className="mt-20 flex-grow px-20">
        <h1 className="text-4xl font-bold text-primary my-10">Resources</h1>
        {resourcesData.map((resourceGroup, index) => {
          // Check if the group is "Single Link" and render a different JSX
          if (resourceGroup.group === "SingleLink") {
            return resourceGroup.links.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 text-xl font-medium"
              >
                {link.name}
              </a>
            ));
          } else {
            // Render the collapsible group for other types of resources
            return (
              <details
                key={index}
                className="mb-4 border border-base-300 bg-base-200"
              >
                <summary className="cursor-pointer text-xl font-medium">
                  {resourceGroup.group} Resources
                </summary>
                <ul className="p-2">
                  {resourceGroup.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        - {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            );
          }
        })}
      </main>
      <Footer footerGroups={footerData} socialLinks={socialLinks} />
    </div>
  );
};

export default ResourcesPage;
