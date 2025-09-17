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
import { ClerkProvider } from "@clerk/nextjs";

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
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in'}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up'}
      signInFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard'}
    >
      <html lang="en" className={`${libreBaskerville.variable} ${inter.variable}`} data-theme="lightTheme">
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Mark that we're in the initial script phase to prevent hydration mismatches
                  window.__THEME_SCRIPT_LOADED = true;

                  // Ensure we start with the same theme as server
                  var currentTheme = document.documentElement.getAttribute('data-theme');
                  if (!currentTheme) {
                    document.documentElement.setAttribute('data-theme', 'lightTheme');
                    currentTheme = 'lightTheme';
                  }

                  // Store the server theme to prevent hydration mismatch
                  window.__SERVER_THEME = currentTheme;

                  // Only apply theme changes after hydration is complete
                  setTimeout(function() {
                    try {
                      var theme = localStorage.getItem('theme');
                      if (theme && theme !== currentTheme) {
                        document.documentElement.setAttribute('data-theme', theme);
                      } else if (!theme) {
                        var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        var defaultTheme = systemPrefersDark ? 'darkTheme' : 'lightTheme';
                        // Only change if the system preference is different AND we're not in the initial render
                        if (defaultTheme !== currentTheme && window.__THEME_SCRIPT_LOADED) {
                          document.documentElement.setAttribute('data-theme', defaultTheme);
                        }
                      }
                    } catch (e) {
                      // Keep current theme if there's an error
                      if (!document.documentElement.getAttribute('data-theme')) {
                        document.documentElement.setAttribute('data-theme', 'lightTheme');
                      }
                    }
                  }, 100); // Increased delay to ensure hydration is complete
                })();
              `,
            }}
          />
        </head>
        <GoogleAnalytics />
        <body>
          <Toaster position="top-center" />
          {/* Temporarily disabled due to production loading issues */}
          {/* <SpeedInsights /> */}
          {/* <Analytics /> */}
            <ThemeProvider>
              <Navbar navbarData={navbarData} />
              {children}
              <Footer footerGroups={footerData} socialData={socialData} />
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
