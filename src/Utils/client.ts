import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key is missing');
    // Return a mock client to prevent crashes in development
    return {
      from: () => ({
        select: () => ({ data: null, error: new Error('Supabase client not initialized') })
      }),
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
};
