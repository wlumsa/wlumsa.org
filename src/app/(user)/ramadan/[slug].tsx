"use client";
import { useRouter } from "next/router";
import CountdownPage from "./CountdownPage";
import Ramadan2024Page from "./Ramadan2024Page";

export default function RamadanPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Render based on the slug
  if (!slug) {
    return <CountdownPage />; // Default route: /ramadan
  }

  if (slug === "2024") {
    return <Ramadan2024Page />; // Route for /ramadan/2024
  }

  // Fallback for unknown slugs
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">The page you are looking for does not exist.</p>
    </div>
  );
}
