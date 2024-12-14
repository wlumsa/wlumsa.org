import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// The `useSession()` hook will be used to get the Clerk `session` object

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function createClerkSupabaseClient() {
  const { session } = useSession();
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await session?.getToken({
            template: "supabase",
          });

          // Insert the Clerk Supabase token into the headers
          const headers = new Headers(options?.headers);
          if (clerkToken) headers.set("Authorization", `Bearer ${clerkToken}`);

          // Call the default fetch
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    },
  );
}