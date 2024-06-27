import "server-only";
import { createClient } from "./client";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
const payload = await getPayloadHMR({ config: configPromise });
const supabase = createClient();

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
  return Media.docs
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

export async function fetchWeeklyEventsData(){
  const events = await payload.find({
    collection: "WeeklyEvents",
    limit: 10,
  });
  return events.docs;
}

export async function fetchBlogPostsData(){
  const posts = await payload.find({
    collection: "Posts",
    where: {
      "status": {
        equals: "published",
      },
    },
    sort: '-publishedAt', // Sort by 'publishedAt' in descending order
    limit: 10,
  });
  return posts;
}