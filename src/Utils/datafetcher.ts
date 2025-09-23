import { Markdown } from "@react-email/markdown";
import "server-only";
import { createClient } from "./client";
import { getPayload } from "payload";
import configPromise from "@payload-config";
const supabase = createClient();
import { unstable_cache } from "next/cache";
import { RoommatePost } from "@/payload-types";
export const revalidate = 3600;

// Lazy initialization of payload to prevent database connection issues
let payloadInstance: any = null;

async function getPayloadInstance() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: configPromise });
  }
  return payloadInstance;
}

export async function fetchRoommateProfiles() {
  const { data, error } = await supabase
    .from("roommates")
    .select("*");

  if (error) {
    console.error("Error fetching roommate profiles:", error);
    return [];
  }

  return data;
}

/**
 * Fetch a roommate profile by ID.
 * @param {number} id - The ID of the roommate.
 * @returns {Promise<any | null>} The roommate profile or null if not found.
 */
export async function fetchRoommateById(id: number) {
  const { data, error } = await supabase
    .from("roommates")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching roommate with ID ${id}:`, error);
    return null;
  }

  return data;
}

/**
 * Get the public URL for a roommate's image from Supabase storage.
 * @param {string} imageId - The ID of the image in storage.
 * @returns {Promise<string>} Public URL of the image.
 */
export async function getRoommateImageURL(imageId: string): Promise<string> {
  const { data } = supabase.storage
    .from(process.env.S3_BUCKET || "default_bucket")
    .getPublicUrl(`RoommateService/${imageId}`);

  return data?.publicUrl || "";
}

/**
 * Add a new roommate profile to the 'roommates' table.
 * @param {string} name - Name of the roommate.
 * @param {string} gender - Gender of the roommate (e.g., Male, Female, Other).
 * @param {string} location - Location (e.g., Downtown, Campus).
 * @param {number} rent - Monthly rent.
 * @param {string} [imageId] - Optional image ID.
 * @returns {Promise<any | null>} The newly added profile or null on error.
 */
export async function addRoommateProfile(
  name: string,
  gender: string,
  location: string,
  rent: number,
  imageId?: string,
) {
  const { data, error } = await supabase
    .from("roommates")
    .insert([{ name, gender, location, rent, image_id: imageId }]);

  if (error) {
    console.error("Error adding roommate profile:", error);
    return null;
  }

  return data;
}

/**
 * Update an existing roommate profile by ID.
 * @param {number} id - The ID of the roommate profile to update.
 * @param {Partial<{name: string; gender: string; location: string; rent: number; image_id: string}>} updatedData - Fields to update.
 * @returns {Promise<any | null>} The updated profile or null on error.
 */
export async function updateRoommateProfile(
  id: number,
  updatedData: Partial<{
    name: string;
    gender: string;
    location: string;
    rent: number;
    image_id: string;
  }>,
) {
  const { data, error } = await supabase
    .from("roommates")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.error(`Error updating roommate profile with ID ${id}:`, error);
    return null;
  }

  return data;
}

/**
 * Delete a roommate profile by ID.
 * @param {number} id - The ID of the roommate profile to delete.
 * @returns {Promise<any | null>} The deleted profile data or null on error.
 */
export async function deleteRoommateProfile(id: number) {
  const { data, error } = await supabase
    .from("roommates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting roommate profile with ID ${id}:`, error);
    return null;
  }

  console.log(`Roommate profile with ID ${id} deleted.`);
  return data;
}

export async function getPublicURL(
  folder: string | null | undefined,
  fileName: string | null | undefined,
) {
  const path = `${folder}/${fileName}`;
  const { data } = supabase
    .storage
    .from(process.env.S3_BUCKET || "default_bucket")
    .getPublicUrl(path || "");
  return data;
}

export async function getMedia(alt: string) {
  const payload = await getPayloadInstance();
  const Media = await payload.find({
    collection: "media",
    where: {
      "alt": {
        equals: alt,
      },
    },
    pagination: false,
    limit: 1,
    depth: 1,
  });
  return Media.docs;
}

export async function fetchSocialData() {
  const payload = await getPayloadInstance();
  const socials = await payload.find({
    collection: "Socials",
    limit: 10,
  });

  return socials.docs;
}

export async function fetchNavData() {
  const payload = await getPayloadInstance();
  const nav = await payload.findGlobal({
    slug: "nav",
  });
  return nav;
}

export async function fetchFooterData() {
  const payload = await getPayloadInstance();
  const footer = await payload.findGlobal({
    slug: "footer",
  });
  return footer;
}

export async function fetchWeeklyEventsData() {
  const payload = await getPayloadInstance();
  const events = await payload.find({
    collection: "WeeklyEvents",
    limit: 10,
  });
  return events.docs;
}

export async function fetchBlogPosts() {
  const payload = await getPayloadInstance();
  const posts = await payload.find({
    collection: "Posts",
    where: {
      "status": {
        equals: "published",
      },
    },
    sort: "-publishedAt", // Sort by 'publishedAt' in descending order
    limit: 10,
  });
  return posts.docs;
}

export async function fetchBlogPostsByCategory(
  category: string,
  postId: string,
) {
  const payload = await getPayloadInstance();
  const posts = await payload.find({
    collection: "Posts",
    where: {
      "status": {
        equals: "published",
      },
      "categories": {
        equals: category,
      },
      "id": {
        not_equals: postId,
      },
    },
    sort: "-publishedAt", // Sort by 'publishedAt' in descending order
    limit: 10,
  });
  return posts.docs;
}

export async function fetchBlogPostsByCategoryAndTag(
  category: string,
  tag: string,
) {
  const payload = await getPayloadInstance();
  const posts = await payload.find({
    collection: "Posts",
    where: {
      "status": {
        equals: "published",
      },
      "category": {
        equals: category,
      },
      "tag": {
        equals: tag,
      },
    },
    sort: "-publishedAt", // Sort by 'publishedAt' in descending order
    limit: 10,
  });
  return posts.docs;
}
export async function fetchBlogPostById(id: string) {
  const payload = await getPayloadInstance();
  const post = await payload.find({
    collection: "Posts",
    where: {
      "status": {
        equals: "published",
      },
      "id": {
        equals: id,
      },
    },
    limit: 1,
  });
  return post.docs;
}

export async function fetchBlogPostByTitle(title: string) {
  const payload = await getPayloadInstance();
  const post = await payload.find({
    collection: "Posts",
    where: {
      "status": {
        equals: "published",
      },
      "title": {
        equals: title,
      },
    },
    limit: 1,
  });
  return post.docs;
}

export async function fetchBlogPostsBytag(tag: string) {
  const payload = await getPayloadInstance();
  const posts = await payload.find({
    collection: "Posts",
    where: {
      "status": {
        equals: "published",
      },
      "tag": {
        equals: tag,
      },
    },
    sort: "-publishedAt", // Sort by 'publishedAt' in descending order
    limit: 10,
  });
  return posts.docs;
}
export async function fetchBlogPostsByQuery(query: string) {
  const payload = await getPayloadInstance();
  const posts = await payload.find({
    collection: "Posts",
    where: {
      or: [
        {
          "title": {
            like: `${query}`,
          },
        },
        {
          "description": {
            like: `${query}`,
          },
        },
      ],
    },
    limit: 10,
  });
  return posts.docs;
}
export async function getCategories() {
  const payload = await getPayloadInstance();
  const categories = await payload.find({
    collection: "categories",
    limit: 10,
  });
  return categories.docs;
}
export async function fetchBlogPostsByQueryAndCategory(
  query: string,
  categoryId: string,
) {
  const payload = await getPayloadInstance();
  const posts = await payload.find({
    collection: "Posts",
    where: {
      or: [
        {
          "title": {
            like: `${query}`,
          },
        },
        {
          "description": {
            like: `${query}`,
          },
        },
      ],
      and: [
        {
          "categories.id": {
            equals: `${categoryId}`,
          },
        },
      ],
    },
    limit: 10,
  });
  return posts.docs;
}

export async function fetchInstagramPosts() {
  const payload = await getPayloadInstance();
  const posts = await payload.find({
    collection: "Instagram",
    limit: 10,
    sort: "-createdAt",
  });

  return posts.docs;
}

export async function getPrayerTimings() {
  const payload = await getPayloadInstance();
  const timings = await payload.findGlobal({
    slug: "prayer-timings",
  });
  return timings;
}

export async function getPrayerRooms() {
  const payload = await getPayloadInstance();
  const rooms = await payload.find({
    collection: "prayer-rooms",
    limit: 10,
  });
  return rooms.docs;
}
export async function getJummahTimings() {
  const payload = await getPayloadInstance();
  const timings = await payload.find({
    collection: "jummah-timings",
    limit: 10,
  });
  return timings.docs;
}
export async function getResources() {
  const payload = await getPayloadInstance();
  const resources = await payload.find({
    collection: "resources",
    limit: 50,
    sort: "-createdAt",
  });
  return resources.docs;
}

export async function getDistributionList(id: string) {
  const payload = await getPayloadInstance();
  const distributionList = await payload.findByID({
    collection: "distribution-list",
    id: id,
  });
  return distributionList.emails;
}

export async function getImageByID(id: string) {
  const payload = await getPayloadInstance();
  const media = await payload.findByID({
    collection: "media",
    id: id,
  });
  return media;
}

export async function uploadFile(file: File) {
  const client = createClient();
  const { data, error } = await client.storage.from(
    "wlumsa_storage_bucket_testbucket_name",
  ).upload("photos", file);
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

type individualSchema = {
  email: string;
  first_name: string;
  last_name: string;
};

// export async function updateDistributionList(
//   list: string,
//   data: individualSchema,
// ) {
//   const result = await payload.create({
//     collection: "distribution-list",
//     where: {
//       "listName": {
//         equals: list,
//       },
//     },

//     data: {
//       emails: [
//         {
//          email: data.email,
//          firstName: data.firstName,
//          lastName: data.lastName,

//         },

//       ],
//     },
//   });
//   return result;
// }

export async function addMember(
  firstName: string,
  lastName: string,
  email: string,
  studentID: string,
  newsletter: boolean,
) {
  const payload = await getPayloadInstance();
  const result = await payload.create({
    collection: "members",
    data: {
      firstName: firstName,
      lastName: lastName,
      mylaurierEmail: email,
      studentId: studentID,
      newsletter: newsletter,
    },
  });
  return result;
}

export async function isMember(studentId: string) {
  const { data, error } = await supabase
    .from("members")
    .select("student_id, newsletter")
    .eq("student_id", studentId)
    .eq("newsletter", true);
  if (error) {
    return error;
  }
  return data.length > 0;
}

export async function updateNewsletterStatus(email: string) {
const payload = await getPayloadInstance();
const exists = await payload.find({
  collection: "members",
  where: {
    "mylaurierEmail": {
      equals: email,
    },
  },
  limit: 1,
})
if(exists.docs.length > 0) {
  const result = await payload.update({
    collection: "members",
    where: {
      "mylaurierEmail": {
        equals: email,
      },
    },
    data: {
      newsletter: false,
    },
  });
  return true;
} else {
  return false;
}

}
//function to remove  a person from the newsletter list, given their email
export async function removeIndividualFromList(
  listName: string,
  email: string,
) {
  try {
    const { data: existingIndividual, error: existingIndividualError } =
      await supabase
        .from("individuals")
        .select("*")
        .eq("email", email)
        .single();
    console.log("EXISITING INDIVIDUAL:", existingIndividual);
    if (
      existingIndividualError && existingIndividualError.code !== "PGRST116"
    ) {
      throw new Error(
        `Error checking individual: ${existingIndividualError.message}`,
      );
    }

    const { data: existingList, error: listError } = await supabase
      .from("distribution_list")
      .select("id")
      .eq("list_name", listName)
      .single();

      if(listError) {
        throw new Error(`Error fetching list: ${listError.message}`);
      }

      if (!existingList || existingList.id === undefined) {
        throw new Error(`List does not exist`);
      }

      const removeIndividual = await supabase
      .from("distribution_list_rels")
      .delete()
      .eq("parent_id", existingList.id)
      .eq("individuals_id", existingIndividual.id);

      if(removeIndividual.error) {
        throw new Error(`Error removing individual: ${removeIndividual.error.message}`);
      }
      if(removeIndividual)
      {
        return {
          success: true,
          message: "Individual removed from list",
        };
      }
  } catch (error) {
    console.error("Error :", error);
    return {
      success: false,
      message: error,
    };
  }
}


export async function addIndividualToList(
  listName: string,
  individualData: individualSchema,
) {
  try {
    // Step 1: Check if the individual already exists
    console.log("EMAIL", individualData.email);
    const { data: existingIndividual, error: existingIndividualError } =
      await supabase
        .from("individuals")
        .select("*")
        .eq("email", individualData.email) // Assuming email is a unique identifier
        .single();
    console.log("EXISITING INDIVIDUAL:", existingIndividual);
    if (
      existingIndividualError && existingIndividualError.code !== "PGRST116"
    ) {
      // PGRST116 is the error code for "Results contain 0 rows"
      throw new Error(
        `Error checking individual: ${existingIndividualError.message}`,
      );
    }

    let individual;
    if (existingIndividual?.length === 0 || !existingIndividual) {
      // Step 2: Insert the new individual into the individuals table
      const { data: newIndividual, error: individualError } = await supabase
        .from("individuals")
        .insert([individualData])
        .select();

      if (individualError) {
        throw new Error(
          `Error inserting individual: ${individualError.message}`,
        );
      }

      individual = newIndividual[0];
    } else {
      individual = existingIndividual;
    }

    console.log("INDIVIDUAL:", individual);
    // Step 3: Get the id of the specified list or create a new one
    let newsletterList;
    const { data: existingList, error: listError } = await supabase
      .from("distribution_list")
      .select("id")
      .eq("list_name", listName)
      .single();
    console.log("EXISTING LIST:", existingList);
    if (listError && listError.code !== "PGRST116") {
      // PGRST116 is the error code for "Results contain 0 rows"
      throw new Error(`Error fetching list: ${listError.message}`);
    }

    if (!existingList || existingList.id === undefined) {
      // List doesn't exist, create a new one
      const { data: newList, error: createListError } = await supabase
        .from("distribution_list")
        .insert([{ list_name: listName }])
        .select()
        .single();
      console.log("NEW LIST:", newList);
      if (createListError) {
        throw new Error(`Error creating new list: ${createListError.message}`);
      }

      newsletterList = newList;
    } else {
      newsletterList = existingList;
    }

    // Step 4: Insert the relationship into the distribution_list_rels table
    const { data: relation, error: relationError } = await supabase
      .from("distribution_list_rels")
      .insert([
        {
          order: 1,
          parent_id: newsletterList.id,
          individuals_id: individual.id,
          path: `emails`,
        },
      ]);

    if (relationError) {
      throw new Error(`Error creating relation: ${relationError.message}`);
    }

    console.log("SUCCESS");

    return {
      success: true,
      individual: individual,
      list: newsletterList,
    };
  } catch (error) {
    console.error("Error in addIndividualToList:", error);
    return {
      success: false,
      message: error,
    };
  }
}

// Example usage:

export async function getResourceById(id: string) {
  const payload = await getPayloadInstance();
  const resource = await payload.findByID({
    collection: "resources",
    id: id,
    sort: "-createdAt",
  });
  return resource;
}

export async function getResourcesByCategory(categoryId: string) {
  const payload = await getPayloadInstance();

  if (categoryId === '0') {
    const resources = await payload.find({
      collection: "resources",
      depth: 1,
    });
    return resources.docs;
  }
  else {
    const resources = await payload.find({
      collection: "resources",
      where: {
        category: {
          equals: categoryId,
        },
      },
      depth: 1,
      sort: "-createdAt",
    });
    return resources.docs;
  }


}

export async function getAllResources() {
  const payload = await getPayloadInstance();

  const resources = await payload.find({
    collection: "resources",
    depth: 1, // This will populate the link relationship
    sort: "-createdAt",
  });

  return resources.docs;
}

export async function createSampleResources() {
  const payload = await getPayloadInstance();

  // First, create some sample links
  const link1 = await payload.create({
    collection: "link",
    data: {
      title: "MSA Registration Form",
      url: "https://example.com/msa-registration",
    },
  });

  const link2 = await payload.create({
    collection: "link",
    data: {
      title: "Prayer Room Schedule",
      url: "https://example.com/prayer-schedule",
    },
  });

  const link3 = await payload.create({
    collection: "link",
    data: {
      title: "Halal Food Guide",
      url: "https://example.com/halal-guide",
    },
  });

  // Then create resources with these links
  const resource1 = await payload.create({
    collection: "resources",
    data: {
      title: "MSA Forms",
      category: "1", // General Forms
      link: [link1.id],
    },
  });

  const resource2 = await payload.create({
    collection: "resources",
    data: {
      title: "Campus Prayer Information",
      category: "2", // Campus Resources
      link: [link2.id],
    },
  });

  const resource3 = await payload.create({
    collection: "resources",
    data: {
      title: "Halal Dining",
      category: "3", // Religious Resources
      link: [link3.id],
    },
  });

  return { resource1, resource2, resource3 };
}

export async function fetchServices() {
  const payload = await getPayloadInstance();
  const services = await payload.find({
    collection: "services",
  });
  return services.docs;
}

export const fetchHalalDirectory = unstable_cache(
  async ({
    query = "",
    cuisine = "All Cuisines",
    method = "All Methods",
    location = "All Locations",
    page = 1,
    limit = 12,
  }: {
    query?: string;
    cuisine?: string;
    method?: string;
    location?: string;
    page?: number;
    limit?: number;
  } = {}) => {
    const payload = await getPayloadInstance();

  // Build where conditions for filtering
  const whereConditions: any[] = [];

  // Text search - use prefix search for better performance
  if (query) {
    whereConditions.push({
      or: [
        { name: { like: `${query}%` } }, // Prefix search is faster
        { shortDescription: { like: `${query}%` } }, // Prefix search is faster
      ],
    });
  }

  // Cuisine filter - map display names to database values
  if (cuisine && cuisine !== "All Cuisines") {
    const cuisineMapping: { [key: string]: string } = {
      "Chinese": "chinese",
      "Persian": "persian",
      "Shawarma": "shawarma",
      "Burgers": "burgers",
      "Bangladeshi": "bangladeshi",
      "Chinese Indo Fusion": "chinese-indo-fusion",
      "Pakistani Food": "pakistani-food",
      "Chicken and Waffles": "chicken-and-waffles",
      "Kabob": "kabob",
      "Uyghur": "uyghur",
      "Chicken": "chicken",
      "Indian Fusion Food": "indian-fusion-food",
      "Pizza": "pizza",
    };
    const dbValue = cuisineMapping[cuisine] || cuisine.toLowerCase();
    whereConditions.push({ category: { equals: dbValue } });
  }

  // Slaughter method filter - map display names to database values
  if (method && method !== "All Methods") {
    const methodMapping: { [key: string]: string } = {
      "Hand": "hand",
      "Machine": "machine",
      "Both": "both",
      "N/A": "n/a",
    };
    const dbValue = methodMapping[method] || method.toLowerCase();
    whereConditions.push({ slaughtered: { equals: dbValue } });
  }

  // Location filter
  if (location && location !== "All Locations") {
    if (location === "On Campus") {
      whereConditions.push({ is_on_campus: { equals: true } });
    } else if (location === "Off Campus") {
      whereConditions.push({ is_on_campus: { equals: false } });
    }
  }

  // Calculate pagination
  const offset = (page - 1) * limit;

  // Fetch filtered results with pagination
  const whereClause = whereConditions.length > 0 ? { and: whereConditions } : {};
  const foodSpots = await payload.find({
    collection: "halal-directory",
    where: whereClause,
    limit: limit,
    page: page,
    sort: "name", // Sort by name for consistent pagination
  });

  // Get total count for pagination info (only if we have conditions)
  let totalCount = { totalDocs: 0 };
  if (whereConditions.length > 0) {
    try {
      totalCount = await payload.count({
        collection: "halal-directory",
        where: whereClause,
      });
    } catch (error) {
      console.error("Count query failed, using docs length:", error);
      totalCount = { totalDocs: foodSpots.docs.length };
    }
  } else {
    // For no filters, we can estimate based on docs returned
    totalCount = { totalDocs: foodSpots.docs.length };
  }

    return {
      items: foodSpots.docs,
      pagination: {
        page,
        limit,
        total: totalCount.totalDocs,
        totalPages: Math.ceil(totalCount.totalDocs / limit),
        hasNextPage: page < Math.ceil(totalCount.totalDocs / limit),
        hasPrevPage: page > 1,
      },
    };
  },
  // Use a simple cache key - Next.js will handle parameter-based caching automatically
  ['halal-directory'],
  {
    revalidate: 120, // Cache for 2 minutes - balance between performance and freshness
    tags: ['halal-directory'],
  }
);
// Function to fetch Halal Directory data
// export async function fetchHalalDirectory() {
//   const { data, error } = await supabase
//     .from("halal-directory")
//     .select("id, name, category, price_range, slaughtered, shortDescription, location, googleMapsLink, website")
//     .limit(50);

//   if (error) {
//     console.error('Error fetching Halal Directory from Supabase:', error);
//     return [];
//   }

//   console.log('Halal Directory Data from Supabase:', data);
//   return data || [];
// }

export async function fetchIIAServices() {
  const payload = await getPayloadInstance();
  const services = await payload.find({
    collection: "iia-services",
  });
  return services.docs;
}
export async function fetchFAQ() {
  const payload = await getPayloadInstance();
  const faq = await payload.find({
    collection: "faq",
  });
  return faq.docs;
}

export async function fetchRecordingsbyCategory(category: string) {
  const payload = await getPayloadInstance();
  const recordings = await payload.find({
    collection: "recording",
    where: {
      "category": {
        equals: category,
      },
    },
    limit: 50,
  });
  return recordings.docs;
}

export async function fetchRoommatePostById(id: string) {
  const payload = await getPayloadInstance();
  const post = await payload.find({
    collection: "RoommatePosts",
    where: {
      "id": {
        equals: id,
      },
    },
    limit: 1,
  });
  return post.docs;
}
// export async function fetchRoommatePosts() {
//   const posts = await payload.find({
//     collection: "RoommatePosts",
//     sort: "-createdAt",
//     limit: 10,
//   });
//   return posts.docs;
// }

export async function fetchRoommatePosts({
  query = "",
  gender,
  rent,
  propertyType,
  utilities,
}: {
  query?: string;
  gender?: string;
  rent?: string;
  propertyType?: string;
  utilities?: string;
}) {
  let minPrice = 0;
  let maxPrice = 0;

  switch (rent) {
    case "1":
      maxPrice = 800;
      break;
    case "2":
      minPrice = 800;
      maxPrice = 900;
      break;
    case "3":
      minPrice = 900;
      maxPrice = 1000;
      break;
    case "4":
      minPrice = 1000;
      maxPrice = 1100;
      break;
    case "5":
      minPrice = 1100;
      maxPrice = 1200;
      break;
    case "6":
      minPrice = 1200;
      maxPrice = 1300;
      break;
    case "7":
      minPrice = 1300;
      break;
  }

  const filters: any[] = [];

  if (query) {
    filters.push({
      or: [
        { "title": { like: `${query}` } },
        { "description": { like: `${query}` } },
      ],
    });
  }

  if (gender) {
    filters.push({ gender: { equals: gender } });
  }

  if (minPrice) {
    filters.push({ rent: { greater_than_equal: minPrice } });
  }

  if (maxPrice) {
    filters.push({ rent: { less_than_equal: maxPrice } });
  }

  if (propertyType) {
    filters.push({ propertyType: { equals: propertyType } });
  }

  if (utilities) {
    filters.push({ utilities: { contains: utilities } });
  }
  console.log("filters:", filters);

  const payload = await getPayloadInstance();
  const posts = await payload.find({
    collection: "RoommatePosts",
    sort: "-createdAt",
    limit: 10,
  });

  return posts.docs;
}

export async function deleteRoommatePostById(postId: number) {
  const payload = await getPayloadInstance();
  const res = await payload.delete({
    collection: "RoommatePosts",
    id: postId,
  });
  return res;
}

//update a post
export async function updateRoommatePostById(postId: number, postData: any) {
  const payload = await getPayloadInstance();
  const post = await payload.update({
    collection: "RoommatePosts",
    where: {
      id: {
        equals: postId,
      },
    },
    data: {
      title: postData.title,
      description: postData.description,
      rent: parseInt(postData.rent),
      deposit: postData.deposit,
      address: postData.address,
      contactEmail: postData.contactEmail,
      availableDate: postData.availableDate,
      propertyType: postData.propertyType,
      utilities: postData.selectedUtilities,
      amenities: postData.selectedAmenities,
      images: postData.images,
      furnishingType: postData.furnishingType,
      gender: postData.gender,
      phoneNumber: postData.phone,
      facebook: postData.facebook,
      instagram: postData.instagram,
      whatsapp: postData.whatsapp,
      userId: postData.userId,
    },
  });
  return post;
}

//delete a post
export async function deletePost(id: number) {
  const payload = await getPayloadInstance();
  const post = await payload.delete({
    collection: "RoommatePosts",
    where: {
      id: {
        equals: id,
      },
    },
  });
  return post;
}

export async function createUser(
  clerkId: string,
  email: string,
  firstName: string,
  lastName: string,
) {
  const payload = await getPayloadInstance();
  const newUser = await payload.create({
    collection: "GeneralUser",
    data: {
      clerkId: clerkId,
      email: email,
      firstName: firstName,
      lastName: lastName,
    },
  });
  return newUser;
}
export async function findUser(id: string) {
  const payload = await getPayloadInstance();
  const user = await payload.find({
    collection: "GeneralUser",
    where: {
      clerkId: {
        equals: id,
      },
    },
  });
  return user;
}

//USER COMMENT FEATURE FUNCTIONS

export async function fetchCommentsByPostId(id: string) {
  const payload = await getPayloadInstance();
  const comments = await payload.find({
    collection: "comments",

    where: {
      "postId": {
        equals: id,
      },
    },
  });
  return comments.docs;
}

export async function createComment(comment: string, postId: number,) {
  const payload = await getPayloadInstance();
  const commentdata = await payload.create({
    collection: "comments",
    data: {
      comment: comment,
      postId: postId,
    },
    overrideAccess: false,
  });
  return commentdata;
}

export async function deleteCommentById(commentId: string) {
  const payload = await getPayloadInstance();
  const res = await payload.delete({
    collection: "comments",
    id: commentId,
  });
  return res;
}

export async function createRoommatePost(postData: RoommatePost) {
  const payload = await getPayloadInstance();
  const post = await payload.create({
  collection: "RoommatePosts",
    data: {
      title: postData.title,
      description: postData.description,
      rent: postData.rent,
      deposit: postData.deposit,
      address: postData.address,
      contactEmail: postData.contactEmail,
      availableDate: postData.availableDate,
      propertyType: postData.propertyType,
      utilities: postData.utilities, // Use the existing 'utilities' property
      amenities: postData.amenities,
      images: postData.images,
      furnishingType: postData.furnishingType,
      gender: postData.gender,
      phoneNumber: postData.phoneNumber,
      facebook: postData.facebook,
      instagram: postData.instagram,
      whatsapp: postData.whatsapp,
      userId: postData.userId,
    },
  });
  return post;
}

export async function updateUserInfo(clerkId: string, data: any) {
  const payload = await getPayloadInstance();
  const user = await payload.update({
    collection: "GeneralUser",
    where: {
      clerkId: {
        equals: clerkId,
      },
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      laurierEmail: data.laurier_email,
      studentId: data.studentId,
      category: data.category,
      program: data.program,
      year: data.year,
      newsletter: data.newsletter,
    },
  });
  return user;
}

export async function fetchRoommatePostsByUser(clerkId: number) {
  const payload = await getPayloadInstance();
  const posts = await payload.find({
    collection: "RoommatePosts",
    where: {
      "userId": {
        equals: clerkId,
      },
    },
  });
  return posts.docs;
}

// export async function updateFormLimit(id: string, currentLimit: number) {
//   const { data, error } = await supabase
//     .from("forms")
//     .update({ "submission_limit": currentLimit-1 })
//     .eq("id", id)
//     .gt("submission_limit", 0)
//     .select();

//   return;
// }

export async function getHalalGroceryStores() {
  const payload = await getPayloadInstance();
  const groceryStores = await payload.find({
    collection: "halal-grocery-stores",
  });
  return groceryStores.docs;
}
