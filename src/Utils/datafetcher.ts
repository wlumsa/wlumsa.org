import "server-only";
import { createClient } from "./client";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
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

export async function fetchBlogPostsByCategory(category: string) {
  const posts = await payload.find({
    collection: "Posts",
    where: {
      "status": {
        equals: "published",
      },
      "category": {
        equals: category,
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
          "plaintext": {
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
    //sort: "-publishedAt", // Sort by 'publishedAt' in descending order
    limit: 10,
  });
  return posts.docs;
}
export async function fetchEmailData(id: string) {
  const email = await payload.find({
    collection: "Emails",
    where: {
      "id": {
        equals: id,
      },
    },
  });
  return email.docs;
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
    limit:10,
  });
  return resources.docs
 }

export async function uploadFile(file: File) {
  const client = createClient();
    const { data, error } = await client.storage.from('wlumsa_storage_bucket_testbucket_name').upload('photos', file)
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}