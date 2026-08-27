import Link from "next/link";
import { redirect } from "next/navigation";
import type { AdminViewServerProps } from "payload";

import { PlanningViewShell } from "./PlanningViewShell";
import { getDateKey, type PlanningCalendarItem } from "./planning-utils";

const monthFormatter = new Intl.DateTimeFormat("en-CA", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function parseMonth(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && /^\d{4}-(0[1-9]|1[0-2])$/.test(raw)) {
    const [year, month] = raw.split("-").map(Number);
    return { month: month!, year: year! };
  }

  const today = new Date();
  return { month: today.getMonth() + 1, year: today.getFullYear() };
}

function monthParam(year: number, month: number, offset: number) {
  const date = new Date(Date.UTC(year, month - 1 + offset, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    "0"
  )}`;
}

export async function PlanningCalendarView(props: AdminViewServerProps) {
  const { req } = props.initPageResult;
  if (!req.user) redirect("/admin/login");

  const { month, year } = parseMonth(props.searchParams?.month);
  const queryStart = new Date(Date.UTC(year, month - 1, 1));
  queryStart.setUTCDate(queryStart.getUTCDate() - 1);
  const queryEnd = new Date(Date.UTC(year, month, 1));
  queryEnd.setUTCDate(queryEnd.getUTCDate() + 1);

  const [eventsResult, tasksResult, contentResult] = await Promise.all([
    req.payload.find({
      collection: "events",
      depth: 0,
      limit: 200,
      overrideAccess: false,
      req,
      where: {
        date: {
          greater_than_equal: queryStart.toISOString(),
          less_than: queryEnd.toISOString(),
        },
      },
    }),
    req.payload.find({
      collection: "event-tasks",
      depth: 0,
      limit: 300,
      overrideAccess: false,
      req,
      where: {
        dueDate: {
          greater_than_equal: queryStart.toISOString(),
          less_than: queryEnd.toISOString(),
        },
      },
    }),
    req.payload.find({
      collection: "content-schedule",
      depth: 0,
      limit: 300,
      overrideAccess: false,
      req,
      where: {
        scheduledFor: {
          greater_than_equal: queryStart.toISOString(),
          less_than: queryEnd.toISOString(),
        },
      },
    }),
  ]);

  const items: PlanningCalendarItem[] = [
    ...eventsResult.docs.map((event) => ({
      date: event.date,
      href: `/admin/collections/events/${event.id}`,
      id: `event-${event.id}`,
      kind: "event" as const,
      title: event.name,
    })),
    ...tasksResult.docs.map((task) => ({
      date: task.dueDate,
      href: `/admin/collections/event-tasks/${task.id}`,
      id: `task-${task.id}`,
      kind: "task" as const,
      title: task.title,
    })),
    ...contentResult.docs.map((item) => ({
      date: item.scheduledFor,
      href: `/admin/collections/content-schedule/${item.id}`,
      id: `content-${item.id}`,
      kind: "content" as const,
      title: item.title,
    })),
  ];

  const itemsByDate = new Map<string, PlanningCalendarItem[]>();
  for (const item of items) {
    const key = getDateKey(item.date);
    itemsByDate.set(key, [...(itemsByDate.get(key) ?? []), item]);
  }

  const firstDay = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, index) =>
    index < firstDay ? null : index - firstDay + 1
  );
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <PlanningViewShell props={props}>
      <main className="planning-page planning-page--calendar">
        <header className="planning-page__header">
          <div>
            <p className="planning-page__eyebrow">Event planning</p>
            <h1>Calendar</h1>
            <p>Events, internal tasks, and scheduled posts in one place.</p>
          </div>
          <Link
            className="planning-button"
            href="/admin/collections/events/create"
          >
            Create event
          </Link>
        </header>

        <div className="planning-calendar__toolbar">
          <Link
            aria-label="Previous month"
            className="planning-calendar__arrow"
            href={`/admin/calendar?month=${monthParam(year, month, -1)}`}
          >
            ←
          </Link>
          <h2>
            {monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)))}
          </h2>
          <Link
            aria-label="Next month"
            className="planning-calendar__arrow"
            href={`/admin/calendar?month=${monthParam(year, month, 1)}`}
          >
            →
          </Link>
        </div>

        <div className="planning-legend" aria-label="Calendar legend">
          <span>
            <i className="planning-dot planning-dot--event" />
            Event
          </span>
          <span>
            <i className="planning-dot planning-dot--task" />
            Task
          </span>
          <span>
            <i className="planning-dot planning-dot--content" />
            Scheduled post
          </span>
        </div>

        <div className="planning-calendar__scroll">
          <div className="planning-calendar">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div className="planning-calendar__weekday" key={day}>
                {day}
              </div>
            ))}
            {cells.map((day, index) => {
              const key = day
                ? `${year}-${String(month).padStart(2, "0")}-${String(
                    day
                  ).padStart(2, "0")}`
                : null;
              const dayItems = key ? itemsByDate.get(key) ?? [] : [];

              return (
                <div
                  className={
                    day
                      ? "planning-calendar__day"
                      : "planning-calendar__day planning-calendar__day--empty"
                  }
                  key={`${index}-${day ?? "empty"}`}
                >
                  {day ? (
                    <span className="planning-calendar__number">{day}</span>
                  ) : null}
                  <div className="planning-calendar__items">
                    {dayItems.map((item) => (
                      <Link
                        className={`planning-calendar__item planning-calendar__item--${item.kind}`}
                        href={item.href}
                        key={item.id}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </PlanningViewShell>
  );
}
