
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase'
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

export const heroUrl = await supabase
    .storage
    .from(process.env.s3_bucket ?? 'default_bucket')
    .getPublicUrl('ui/hero.jpg')
    .data.publicUrl;



export const fetchSocialLinks = async () => {
    const { data, error } = await supabase
    .from('socials') 
    .select(
        `title,link_id,updated_at,icon,link:link_id("url")`
    ) 
    .order('updated_at', { ascending: false })
    if (error) {
        console.error(error)
    }
    return data
}
