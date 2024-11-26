import { supabase } from "@/lib/supabaseClient";
import FilterComponent from "./halalFoodClient";
// Define the structure for the Halal Directory data
import { fetchHalalDirectory } from "@/Utils/datafetcher";

// Function to get the public URL of an image based on its ID
async function getImageByID(id: string) {
  const { data: filename, error } = await supabase.from("media").select("filename").eq("id", id).single();
  if (error) {
    console.error("Error fetching image:", error);
    return "";
  }

  const path = `media/${filename.filename}`;
  const { data } = supabase.storage.from(process.env.NEXT_PUBLIC_S3_BUCKET || "default_bucket").getPublicUrl(path || "");
  return data;
}

// Main component for the Halal Directory page
export default async function HalalDirectoryPage() {
  // Fetch data from the Supabase database
  console.log("SERVER FETCH");
  const res = await fetchHalalDirectory();
  // console.log("DATA", res);
  // const { data, error } = await supabase.from("halal_directory").select("*");
  // if (error) {
  //   console.error("Error fetching Halal Directory:", error);
  //   return <div>Error fetching data</div>;
  // }

  // // Fetch images associated with each item if image_id exists
  // const imagePromises = data.map(async (item) => {
  //   if (item.image_id) {
  //     const image = await getImageByID(item.image_id);
  //     if (typeof image === "object" && "publicUrl" in image) {
  //       return { [item.image_id]: image.publicUrl };
  //     }
  //   }
  //   return { [item.image_id]: "" };
  // });
  // const imageResults = await Promise.all(imagePromises);
  // const imagesObject = Object.assign({}, ...imageResults);

  return (
    <FilterComponent halalDirectory={res}   />
  );
}