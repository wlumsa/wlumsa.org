import { Markdown } from "@react-email/markdown";
import "server-only";
import { createClient } from "./client";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
const supabase = createClient();
import { unstable_cache } from "next/cache";

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





const payload = await getPayloadHMR({ config: configPromise });

export async function getMedia(alt: string) {
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
  const socials = await payload.find({
    collection: "Socials",
    limit: 10,
  });

  return socials.docs;
}

export async function fetchNavData() {
  const nav = await payload.findGlobal({
    slug: "nav",
  });
  return nav;
}

export async function fetchFooterData() {
  const footer = await payload.findGlobal({
    slug: "footer",
  });
  return footer;
}

export async function fetchWeeklyEventsData() {
  const events = await payload.find({
    collection: "WeeklyEvents",
    limit: 10,
  });
  return events.docs;
}

export async function fetchBlogPosts() {
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

export async function fetchBlogPostsByCategory(category: string, postId: string) {
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
      }
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
  const categories = await payload.find({
    collection: "categories",
    limit: 10,
  });
  return categories.docs;
}
export async function fetchBlogPostsByQueryAndCategory(query: string, categoryId: string) {
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
  const posts = await payload.find({
    collection: "Instagram",
    limit: 10,
    sort: "-CreatedAt",
  });

  return posts.docs;
}

export async function getPrayerTimings() {
  const timings = await payload.findGlobal({
    slug: "prayer-timings",
  });
  return timings;
}

export async function getPrayerRooms() {
  const rooms = await payload.find({
    collection: "prayer-rooms",
    limit: 10,
  });
  return rooms.docs;
}
export async function getJummahTimings() {
  const timings = await payload.find({
    collection: "jummah-timings",
    limit: 10,
  });
  return timings.docs;
}
export async function getResources() {
  const resources = await payload.find({
    collection: "resources",
    limit: 10,
  });
  return resources.docs;
}

export async function getDistributionList(id: string) {
  const distributionList = await payload.findByID({
    collection: "distribution-list",
    id: id,
  });
  return distributionList.emails;
}

export async function getImageByID(id: string) {
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

export async function addIndividualToList(
  listName: string,
  individualData: individualSchema,
) {
  try {
    // Step 1: Check if the individual already exists
    console.log("EMAIL",individualData.email);
    const { data: existingIndividual, error: existingIndividualError } = await supabase
      .from("individuals")
      .select("*")
      .eq("email",individualData.email) // Assuming email is a unique identifier
      .single();
    console.log("EXISITING INDIVIDUAL:",existingIndividual);
    if (existingIndividualError && existingIndividualError.code !== 'PGRST116') {
      // PGRST116 is the error code for "Results contain 0 rows"
      throw new Error(`Error checking individual: ${existingIndividualError.message}`);
    }

    let individual;
    if (existingIndividual?.length===0 || !existingIndividual) {
      // Step 2: Insert the new individual into the individuals table
      const { data: newIndividual, error: individualError } = await supabase
        .from("individuals")
        .insert([individualData])
        .select();

      if (individualError) {
        throw new Error(`Error inserting individual: ${individualError.message}`);
      }

      individual = newIndividual[0];
    } else {
      individual = existingIndividual;
    }

    console.log("INDIVIDUAL:",individual);
    // Step 3: Get the id of the specified list or create a new one
    let newsletterList;
    const { data: existingList, error: listError } = await supabase
      .from("distribution_list")
      .select("id")
      .eq("list_name", listName)
      .single();
    console.log("EXISTING LIST:",existingList);
    if (listError && listError.code !== 'PGRST116') {
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
        console.log("NEW LIST:",newList);
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

    console.log("SUCCESS")

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
  const resource = await payload.findByID({
    collection: "resources",
    id: id,
  });
  return resource;
}

export async function fetchServices() {
  const services = await payload.find({
    collection: "services",
  });
  return services.docs;
}

export async function fetchFoodSpots() {
  const services = await payload.find({
    collection: "halal-directory",
  });
  return services.docs;
}
// Function to fetch Halal Directory data
export async function fetchHalalDirectory() {
  const { data, error } = await supabase
    .from("halal-directory")
    .select("id, name, category, price_range, slaughtered, shortDescription, location, googleMapsLink, website")
    .limit(50);

  if (error) {
    console.error('Error fetching Halal Directory from Supabase:', error);
    return [];
  }

  console.log('Halal Directory Data from Supabase:', data);
  return data || [];
}

export async function fetchIIAServices() {
  const services = await payload.find({
    collection: "iia-services",
  });
  return services.docs;
}
export async function fetchFAQ() {
  const faq = await payload.find({
    collection: "faq",
  });
  return faq.docs;
}