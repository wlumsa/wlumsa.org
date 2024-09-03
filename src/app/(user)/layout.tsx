import type { Metadata } from "next";
import "../../styles/globals.css";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { fetchNavData, fetchFooterData, fetchSocialData } from "@/Utils/datafetcher";
import { Providers } from "@/redux/Provider";
import { Toaster } from "react-hot-toast";
/*
  Default Metadata for entire project, to be changed
  More info on Nextjs Metadata API can be found: https://nextjs.org/docs/app/building-your-application/optimizing/metadata

    *Metadata can be defined as (GPT description)
      Website metadata refers to the descriptive information embedded within the code of a web page, 
      invisible to users but crucial for search engines and browsers. It includes elements like title tags, 
      meta descriptions, and meta keywords, providing concise summaries of the page's content. 
      Metadata helps improve search engine optimization (SEO), making it easier for search engines 
      to understand and categorize the content, ultimately influencing how the page appears in search results.
  
*/
export const metadata: Metadata = {
  title: "WLU MSA",
  description:
    "Wilfrid Laurier Univeristies Offical Muslim Students Assoication Website. We are a Muslim community at Wilfrid Laurier's Universities and our main focus ",
};

/*  Nextjs timebased revalidation function for cache, set to 1 hour
More information on nextjs caching, and best pratices can be found here: 
https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
*/
export const revalidate = 600;
/**
 * Renders the root layout of the application using Nextjs Page layouts.
 * This layout is consistent across the entire route group (user), more information on layouts can be found using the link below
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * @param children - The child components to render within the layout.
 * @returns The JSX element representing the root layout.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch data from database for dynamic data
  //const navbarData = await getNavbarData();
  const socialData = await fetchSocialData();
  const footerData = await fetchFooterData();
  const navbarData = await fetchNavData();
  return (
    <html lang="en">
      <body>
      <Toaster
        position="top-center"
      />
        <SpeedInsights />
        <Analytics />
        <Providers>
          <Navbar navbarData={navbarData} />
          {children}
          <Footer footerGroups={footerData} socialData={socialData} />
        </Providers>
      </body>

    </html >
  );
}
