
import { GetStaticProps } from "next";
import { fetchSocialLinks,getNavbarData,getFooterData } from "~/lib/api";
import { NextPage } from "next";
import Navbar from "~/components/Global/Navbar";
import Footer from "~/components/Global/Footer";
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
interface DirectoryPageProps {
  socialLinks: SocialLinkProps[];
  navbarData: NavbarGroup[];
  footerData: FooterGroup[];
}
const DirectoryPage: NextPage<DirectoryPageProps> = ({
  socialLinks,
  navbarData, // Add this line
  footerData,
}) => {
    return (
      <div className="flex min-h-screen flex-col">
      <Navbar navbarData={navbarData} />
    <div className="flex justify-center items-center mt-40 mb-20 flex-grow">
      <h1 className="font-sans text-primary font-bold  text-xl md:text-5xl">Coming Soon Inshallah!</h1>
    </div>
    <Footer footerGroups={footerData} socialLinks={socialLinks} />
  </div>
  );
    
  };
  
  export default DirectoryPage;
  
  
  
  
  