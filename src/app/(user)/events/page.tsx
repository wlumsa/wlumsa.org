import Link from "next/link";
import React from "react";
import MemberSignup from "@/components/UI/MemberSignup";

/**
 * Renders the Events page component.
 * @returns The rendered Events page component.
 */
export default async function EventsPage() {
  return (
    <main className="flex-grow px-4 pt-20 pb-12 sm:px-8">
      <div className="flex flex-col max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-primary">
          Upcoming Events
        </h1>

        <p className="text-lg text-center text-muted-foreground leading-relaxed">
          Follow our{" "}
          <Link
            href="https://www.instagram.com/wlumsa"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Instagram
          </Link>{" "}
          to see what’s happening, or subscribe to our newsletter to get notified
          about upcoming events.
        </p>

        <div className="pt-4">
          <MemberSignup />
        </div>
      </div>
    </main>
  );
}
