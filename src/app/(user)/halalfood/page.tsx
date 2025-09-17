import FilterComponent from "./halalFoodClient";
import { fetchHalalDirectory } from "@/Utils/datafetcher";

// Main component for the Halal Directory page
export default async function HalalDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams promise
  const params = await searchParams;
  // Extract filter parameters from URL
  const query = typeof params.query === 'string' ? params.query : '';
  const cuisine = typeof params.cuisine === 'string' ? params.cuisine : 'All Cuisines';
  const method = typeof params.method === 'string' ? params.method : 'All Methods';
  const location = typeof params.location === 'string' ? params.location : 'All Locations';
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const layout = typeof params.layout === 'string' ? params.layout : 'list';

  // Fetch filtered data from the server
  const data = await fetchHalalDirectory({
    query,
    cuisine,
    method,
    location,
    page,
    limit: 12,
  });

  return (
    <FilterComponent
      halalDirectory={data.items}
      pagination={data.pagination}
      initialFilters={{
        query,
        cuisine,
        method,
        location,
        page,
        layout,
      }}
    />
  );
}
