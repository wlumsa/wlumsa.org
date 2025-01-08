import { Markdown } from "@react-email/markdown";
import "server-only";
import { createClient } from "./client";
import { getPayload } from "payload";
import configPromise from "@payload-config";
const supabase = createClient();
import { unstable_cache } from "next/cache";
export const revalidate = 3600;






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





const payload = await getPayload({ config: configPromise });

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

export async function fetchHalalDirectory() {
  const foodSpots = await payload.find({
    collection: "halal-directory",
    limit: 50,
  })
  return foodSpots.docs;
}
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

export async function fetchRecordingsbyCategory(category:string) {

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
  query = '',
  gender,
  price,
  propertyType,
  utilities,
}: {
  query?: string;
  gender?: string;
  price?: string;
  propertyType?: string;
  utilities?: string;
}) {
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

  if (price) {
    filters.push({ price: { less_than_equal: parseFloat(price) } });
  }

  if (propertyType) {
    filters.push({ propertyType: { equals: propertyType } });
  }

  if (utilities) {
    filters.push({ utilities: { contains: utilities } });
  }

  const posts = await payload.find({
    collection: "RoommatePosts",
    where: {
      and: filters,
    },
    limit: 10,
  });

  return posts.docs;
}


export async function deleteRoommatePostById(postId:number) {

  const res = await payload.delete({
    collection: "RoommatePosts",
    id: postId,
  }); 
  return res;
  }

//update a post 
export async function updateRoommatePostById(postId: number, postData: any) {
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
        rent: postData.rent,
        deposit: postData.deposit,
        address: postData.address,
        contactEmail: postData.contactEmail,
        availableDate: postData.availableDate,
        propertyType: postData.propertyType,
        utilities: postData.selectedUtilities,
        amenities: postData.selectedAmenities,
        images: postData.images,
        furnishingType: postData.furnishingType,
        gender:  postData.gender,
        phoneNumber: postData.phone,
        facebook: postData.facebook,
        instagram: postData.instagram,
        whatsapp: postData.whatsapp,
}
  });
  return post;
}

//delete a post
export async function deletePost(id: number) {
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

export async function createUser( clerkId: string, email: string, firstName: string, lastName: string) {
  const newUser = await payload.create({
    collection: "general-user",
    data: {
      clerkId:clerkId,
      email: email,
      firstName: firstName,
      lastName: lastName,
    },
  });
  return newUser;
}
export async function findUser(id:string) {
  const user = await payload.find({
    collection: "general-user",
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


export async function createComment( comment: string, postId: number,) {

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


export async function deleteCommentById(commentId:string) {

  const res = await payload.delete({
    collection: "comments",
    id: commentId,
  }); 
  return res;
  }
  

  //roommmate post feature functions
  export async function createRoommatePost( postData: any) {
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
        utilities: postData.selectedUtilities,
        amenities: postData.selectedAmenities,
        images: postData.images,
        furnishingType: postData.furnishingType,
        gender:  postData.gender,
        phoneNumber: postData.phone,
        facebook: postData.facebook,
        instagram: postData.instagram,
        whatsapp: postData.whatsapp,

  
      },
      
    })
    return post;
  }
export async function updateUserInfo(clerkId:string, data: any) {
  const user = await payload.update({
    collection: "general-user",
   where:
    {
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


//get roommate posts by user
export async function fetchRoommatePostsByUser(clerkId: number) {
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
