// pages/api/fetchHalalDirectory.ts

import { createClient } from "../../Utils/client"; // Make sure this path is correct
const supabase = createClient();

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("halal_directory") // Table name from Supabase
    .select("id, name, category, slaughtered, short_description, location, google_maps_link, website") // Fetch required columns
    .limit(50); // Adjust limit as needed

  if (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }

  res.status(200).json({ data });
}
