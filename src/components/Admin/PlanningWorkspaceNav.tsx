"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [
  { href: "/admin", label: "My Tasks", section: "tasks" },
  { href: "/admin/events", label: "Events", section: "events" },
  { href: "/admin/calendar", label: "Calendar", section: "calendar" },
] as const;

function isCurrent(
  pathname: string,
  section: (typeof destinations)[number]["section"]
) {
  if (section === "tasks") return pathname === "/admin";
  return pathname.startsWith(`/admin/${section}`);
}

export function PlanningWorkspaceNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Planning workspace" className="planning-workspace-nav">
      <span aria-hidden="true" className="planning-workspace-nav__label">
        Plan
      </span>
      <div className="planning-workspace-nav__links">
        {destinations.map((destination) => {
          const current = isCurrent(pathname, destination.section);

          return (
            <Link
              aria-current={current ? "page" : undefined}
              className={current ? "is-current" : undefined}
              href={destination.href}
              key={destination.href}
            >
              {destination.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
