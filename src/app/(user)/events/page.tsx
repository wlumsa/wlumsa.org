import Link from "next/link";
import React from "react";
import MemberSignup from "@/components/UI/MemberSignup";

/**
 * Renders the Events page component.
 * @returns The rendered Events page component.
 */
export default async function EventsPage() {
  return (
    <div className="flex-grow m-16 ">
      <div className="flex flex-col max-w-4xl mx-auto">
        <h1 className="text-4xl text-center font-bold text-primary py-8 ">Check out our <Link href="https://www.instagram.com/wlumsa" target="_blank" className="underline">Instagram</Link> to see what's happening or subscribe to our newsletter to get notified of upcoming events</h1>
        <MemberSignup />
      </div>
    </div>
  );
}
