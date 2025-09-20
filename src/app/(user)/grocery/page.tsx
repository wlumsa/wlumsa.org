import GroceryStoresClient from "./groceryStoresClient";
import { fetchHalalGroceryStores } from "@/Utils/datafetcher";

// Main component for the Halal Grocery Stores page
export default async function GroceryStoresPage() {
  // Fetch all grocery stores
  const groceryStores = await fetchHalalGroceryStores();

  return <GroceryStoresClient groceryStores={groceryStores} />;
}
