

import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL 
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase = createClient<Database>(
    supabaseUrl!,
    supabaseAnonKey!,
)

export const heroUrl = 
    await supabase
    .storage
    .from(process.env.s3_bucket ?? 'default_bucket')
    .getPublicUrl('ui/hero.jpg')
    .data.publicUrl;



export const fetchSocialLinks = async () => {
    const { data, error } = await supabase
    .from('socials')
    .select(`
      title,
      updated_at,
      icon,
      link_id,
      link:link_id (
        url
      )
    `)
    .order('updated_at', { ascending: false })
    if (error) {
        console.error(error)
    }
    console.log(data)
    return data
}


export const fetchNavLinks = async () => {
  try {
      const { data: navItems, error: navItemsError } = await supabase
          .from('nav_items')
          .select('id, label, _parent_id');

      if (navItemsError) {
          throw navItemsError;
      }

      const { data: navItemLinks, error: navItemLinksError } = await supabase
          .from('nav_items_links')
          .select('title, url, _parent_id');

      if (navItemLinksError) {
          throw navItemLinksError;
      }

      const result = navItems.map(item => ({
          label: item.label,
          links: navItemLinks
              .filter(link => link._parent_id === item.id)
              .map(link => ({ title: link.title, url: link.url }))
      }));

      console.log('Nav Items Details:', result);
  } catch (error) {
      console.error('Error fetching nav items:', error);
  }
}

  