import type { Metadata } from "next";
import FilterComponent from "./halalFoodClient";
import { fetchHalalDirectory } from "@/Utils/datafetcher";

export const metadata: Metadata = {
  title: "Halal Food Directory | WLU MSA",
  description:
    "Find halal restaurants and food options near Wilfrid Laurier University.",
};

export default async function HalalDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.query === "string" ? params.query : "";
  const cuisine =
    typeof params.cuisine === "string" ? params.cuisine : "All Cuisines";
  const method =
    typeof params.method === "string" ? params.method : "All Methods";
  const location =
    typeof params.location === "string" ? params.location : "All Locations";
  const requestedPage =
    typeof params.page === "string" ? Number.parseInt(params.page, 10) : 1;
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const data = await fetchHalalDirectory({
    query,
    cuisine,
    method,
    location,
    page,
    limit: 12,
  });

  return (
    <FilterComponent halalDirectory={data.items} pagination={data.pagination} />
  );
}
