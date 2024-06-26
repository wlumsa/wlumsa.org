import "server-only";
import { createClient } from "./client";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
const payload = await getPayloadHMR({ config: configPromise });
const supabase = createClient();

export async function getHeroUrl() {
  const url = supabase
    .storage
    .from(process.env.s3_bucket ?? "default_bucket")
    .getPublicUrl("media/hero.jpg")
    .data.publicUrl;
  return url;
 
}

export async function fetchSocialLinks() {
  const socials = await payload.find({
    collection: "Socials",
    limit: 10,
   })
  
   return socials.docs;
}

export async function fetchNavLinks() {
  const nav = await payload.findGlobal({
    slug: "nav",
   })
   return nav;
}

export async function fetchFooterLinks(){
  const footer = await payload.findGlobal({
    slug: "footer",
   })
   return footer;
}
