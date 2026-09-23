"use client";

import { useLinkStatus } from "next/link";

export default function NavPendingIndicator() {
  const { pending } = useLinkStatus();

  return (
    <span
      className={`nav-pending-indicator ${pending ? "is-pending" : ""}`}
      aria-hidden="true"
    />
  );
}
