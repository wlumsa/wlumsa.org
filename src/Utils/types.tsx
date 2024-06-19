import { Database } from "./supabase/supabase";

declare global  {
  type Social = Database['public']['Tables']['socials']
  type NavbarData = {
    label: Database['public']['Tables']['nav_items']
    links: Database['public']['Tables']['nav_items_links'];
};

}