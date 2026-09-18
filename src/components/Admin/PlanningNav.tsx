import { Link } from "@payloadcms/ui";

export function PlanningNav() {
  return (
    <div className="planning-nav">
      <Link className="planning-nav__link" href="/admin">
        My tasks
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
