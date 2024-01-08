import React from "react";
import { useRouter } from "next/router";
import CtaForm from "~/components/Forms/CtaForm";
import { GetStaticPaths } from "next";
import { NextPage } from "next";
import { GetStaticProps } from "next";
import { getNavbarData, getFooterData, fetchSocialLinks } from "~/lib/api";
import Navbar from "~/components/Global/Navbar";
import Footer from "~/components/Global/Footer";
export const getStaticPaths: GetStaticPaths = async () => {
  
  const types = ['Incident', 'Support', 'Fiqh'];

  
  const paths = types.map((type) => ({
    params: { type },
  }));


  return { paths, fallback: false };
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
interface DynamicContactPageProps {
  socialLinks: SocialLinkProps[];
  navbarData: NavbarGroup[];
  footerData: FooterGroup[];
}
const DynamicContact: NextPage<DynamicContactPageProps> = ({
  socialLinks,
  navbarData, // Add this line
  footerData,
}) => {
  const router = useRouter();
  const category = Array.isArray(router.query.type)
    ? router.query.type[0]
    : router.query.type;

  // Ensure category is defined before rendering CtaForm
  if (!category) {
    return null; // or some fallback UI
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar navbarData={navbarData} />
      <div className="mt-20 flex flex-col items-center flex-grow">
        <div className="mb-10">
          <h3 className="pt-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105 lg:pt-0">
            {category} Form!
          </h3>
          <p className="text-center text-neutral lg:text-lg">
            Fill out the form and Inshallah we will get back to you soon
          </p>
        </div>
        <CtaForm category={category} />
      </div>
      <Footer footerGroups={footerData} socialLinks={socialLinks} />
    </div>
  );
};

export default DynamicContact;
