import type { Metadata } from "next";
import "../../styles/globals.css";
import { Libre_Baskerville, Inter } from 'next/font/google';
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import {
  fetchNavData,
  fetchFooterData,
  fetchSocialData,
} from "@/Utils/datafetcher";
import { Toaster } from "react-hot-toast";
import GoogleAnalytics from "./GoogleAnalytics";
import ThemeProvider from "./themeprovider";
// import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./providers";
import posthog from 'posthog-js'
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';

// Force dynamic rendering to avoid Clerk issues during static generation
export const dynamic = 'force-dynamic';
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
    "The Muslim Students Association is an organization that aims to create a welcoming, supportive, and inclusive community for Muslim students at Wilfrid Laurier University, enouraging religious, academic and professional growth, through various events, and services.",
};

/*  Nextjs timebased revalidation function for cache, set to 1 hour
More information on nextjs caching, and best pratices can be found here:
https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
*/
export const revalidate = 3600;
/**
 * Renders the root layout of the application using Nextjs Page layouts.
 * This layout is consistent across the entire route group (user), more information on layouts can be found using the link below
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * @param children - The child components to render within the layout.
 * @returns The JSX element representing the root layout.
 */

// Initialize fonts
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre-baskerville',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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
  posthog.capture("test_event", {
    source: "manual_test",
  })
  
  return (
    
      <html lang="en" className={`${libreBaskerville.variable} ${inter.variable}`} data-theme="lightTheme">
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Always start with lightTheme to match server-side rendering
                  document.documentElement.setAttribute('data-theme', 'lightTheme');

                  // Mark that theme script has loaded
                  window.__THEME_SCRIPT_LOADED = true;
                })();
              `,
            }}
          />
        </head>
        <GoogleAnalytics />
        <body>
          <PostHogProvider>
          
          <Toaster position="top-center" />
          {/* Temporarily disabled due to production loading issues */}
          <SpeedInsights /> 
          <Analytics />
            <ThemeProvider>
              <Navbar navbarData={navbarData} />
              <main className="pt-20 md:pt-24">
                {children}
              </main>
              <Footer footerGroups={footerData} socialData={socialData} />
            </ThemeProvider>
            </PostHogProvider>
        </body>
      </html>
  );
}
