import "../styles/globals.css";
import { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
