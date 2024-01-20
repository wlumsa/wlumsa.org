import "../styles/globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata: Metadata = {
  title: "WLU MSA",
  description:
    "Wilfrid Laurier Univeristies Offical Muslim Students Assoication Website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
