"use client";

import { Link, useAuth } from "@payloadcms/ui";

export function PlanningNav() {
  const { user } = useAuth();
  const isCharityEditor = user?.roles === "charity_editor";

  if (isCharityEditor) {
    return (
      <div className="planning-nav">
        <Link className="planning-nav__link" href="/admin">
          Dashboard
        </Link>
        <Link className="planning-nav__link" href="/admin/collections/events">
          Charity events
        </Link>
      </div>
    );
  }

  return (
    <div className="planning-nav">
      <Link className="planning-nav__link" href="/admin">
        Dashboard
      </Link>
      <Link className="planning-nav__link" href="/admin/events">
        Events
      </Link>
      <Link className="planning-nav__link" href="/admin/calendar">
        Calendar
      </Link>
    </div>
  );
}
