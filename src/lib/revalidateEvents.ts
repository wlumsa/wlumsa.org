const EVENTS_REVALIDATION_PATHS = ["/events"] as const;

function getServerUrl() {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function revalidateEventsPage() {
  const secret = process.env.PAYLOAD_SECRET;

  if (!secret) {
    console.error("Missing PAYLOAD_SECRET; cannot revalidate /events.");
    return;
  }

  try {
    const response = await fetch(`${getServerUrl()}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-secret": secret,
      },
      body: JSON.stringify({ paths: EVENTS_REVALIDATION_PATHS }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to revalidate /events.", await response.text());
    }
  } catch (error) {
    console.error("Failed to trigger /events revalidation.", error);
  }
}
