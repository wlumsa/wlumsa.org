 import GroceryStoresClient from "./groceryStoresClient";
 import { getHalalGroceryStores } from "@/Utils/datafetcher";

// Main component for the Halal Grocery Stores page
export default async function GroceryStoresPage() {
  // Fetch all grocery stores
  const groceryStores = await getHalalGroceryStores();

   return <GroceryStoresClient groceryStores={groceryStores} />;
}
