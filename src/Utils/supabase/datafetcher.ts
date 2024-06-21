import "server-only";
import { cache } from "react";
import { QueryData, QueryError, QueryResult } from "@supabase/supabase-js";
import { createClient } from "./client";
import { Database } from "./supabase";
import { types } from "util";

const supabase = createClient();

export async function getHeroUrl() {
  supabase
    .storage
    .from(process.env.s3_bucket ?? "default_bucket")
    .getPublicUrl("ui/hero.jpg")
    .data.publicUrl;
}

export const fetchSocialLinks = cache(async ()=> {
  const { data, error } = await supabase
    .from("socials")
    .select(`
      title,
      updated_at,
      created_at,
      icon,
      link_id,
      link:link_id (
        url
      )
    `)
    .order("updated_at", { ascending: false });
    return data;
});
export const fetchNavLinks = cache(async (): Promise<NavbarData> => {
  const { data, error } = await supabase
    .from('nav_items')
    .select(`
      id,
      label:label,
      nav_items_links (
        title:title,
        url:url
      )
    `)
  console.log(data)
  if (error) {
    console.error('Error fetching navigation items:', error)
    return null
  }

  return data
});



export const fetchFooterLinks = cache(async () => {
  const { data, error } = await supabase
    .from('footer_items')
    .select(`
      label:footer_item_label,
      footer_items_links (
        title:footer_item_link_title,
        url:footer_item_link_url
      )
    `)

  if (error) {
    //  console.error('Error fetching footer items:', error)
    return null
  }

  return data
});
