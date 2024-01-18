import type { Metadata } from "next";
import "../../styles/globals.css";
import { Providers } from "@/redux/Provider";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import { getNavbarData, getFooterData, fetchSocialLinks } from "../../utils/api"
export const metadata: Metadata = {
  title: "WLU MSA",
  description:
    "Wilfrid Laurier Univeristies Offical Muslim Students Assoication Website. We are a Muslim community at Wilfrid Laurier's Universities and our main focus ",
};
export const revalidate = 3600
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarData = await getNavbarData();
  const socialLinks = await fetchSocialLinks();
  const footerData = await getFooterData();
  return (
    <html lang="en">
      <body >
        <Providers>
          <Navbar navbarData={navbarData} />
          {children}
          <Footer footerGroups={footerData} socialLinks={socialLinks} />
        </Providers>
      </body>
    </html>
  );
}
