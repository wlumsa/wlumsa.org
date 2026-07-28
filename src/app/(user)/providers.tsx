"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const postHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  useEffect(() => {
    if (!postHogKey) return;

    posthog.init(postHogKey, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "identified_only",
      defaults: "2025-11-30",
    });
  }, [postHogKey]);

  return postHogKey ? (
    <PHProvider client={posthog}>{children}</PHProvider>
  ) : (
    children
  );
}
