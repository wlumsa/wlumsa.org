import FilterComponent from "./halalFoodClient";
import { fetchHalalDirectory } from "@/Utils/datafetcher";

// Main component for the Halal Directory page
export default async function HalalDirectoryPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract filter parameters from URL
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const cuisine = typeof searchParams.cuisine === 'string' ? searchParams.cuisine : 'All Cuisines';
  const method = typeof searchParams.method === 'string' ? searchParams.method : 'All Methods';
  const location = typeof searchParams.location === 'string' ? searchParams.location : 'All Locations';
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const layout = typeof searchParams.layout === 'string' ? searchParams.layout : 'list';

  // Fetch filtered data from the server
  console.log("SERVER FETCH with filters:", { query, cuisine, method, location, page });
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
