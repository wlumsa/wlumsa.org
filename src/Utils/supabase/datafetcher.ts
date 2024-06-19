import "server-only";
import { cache } from "react";
import { QueryData, QueryError, QueryResult } from "@supabase/supabase-js";

import { createClient } from "./server";

const supabase = createClient();

export async function getHeroUrl() {
  supabase
    .storage
    .from(process.env.s3_bucket ?? "default_bucket")
    .getPublicUrl("ui/hero.jpg")
    .data.publicUrl;
}

export const fetchSocialLinks = cache(async (): Promise<Social> => {
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
  type Socials = QueryData<typeof data>;
  if (error) {
    console.error(error);
  }
  console.log(data);
  return data;
});
export const fetchNavLinks = cache(async () => {
  try {
    const { data: navItems, error: navItemsError } = await supabase
      .from("nav_items")
      .select("label, id");

    if (navItemsError) {
      throw navItemsError;
    }

    const { data: navItemLinks, error: navItemLinksError } = await supabase
      .from("nav_items_links")
      .select("title, url, _parent_id");

    if (navItemLinksError) {
      throw navItemLinksError;
    }

    const result: NavbarData = navItems.map((
      item: { label: string; id: number },
    ) => ({
      label: item.label,
      links: navItemLinks
        .filter((link: { _parent_id: number; title: string; url: string }) =>
          link._parent_id === item.id
        )
        .map((link: { title: string; url: string }) => ({
          title: link.title,
          url: link.url,
        })),
    }));

    return result;
  } catch (error) {
    throw error;
  }
});

export const fetchFooterLinks = cache(async () => {
  try {
    const { data: footerItems, error: footerItemsError } = await supabase
      .from("nav_items")
      .select("label, id");

    if (footerItemsError) {
      throw footerItemsError;
    }

    const { data: footerItemLinks, error: footerItemLinksError } =
      await supabase
        .from("nav_items_links")
        .select("title, url, _parent_id");

    if (footerItemLinksError) {
      throw footerItemLinksError;
    }

    const result: FooterData = footerItems.map((
      item: { label: string; id: number },
    ) => ({
      label: item.label,
      links: footerItemLinks
        .filter((link: { _parent_id: number; title: string; url: string }) =>
          link._parent_id === item.id
        )
        .map((link: { title: string; url: string }) => ({
          title: link.title,
          url: link.url,
        })),
    }));

    console.log("Nav Items Details:", result);
    return result;
  } catch (error) {
    console.error("Error fetching nav items:", error);
    throw error;
  }
});
