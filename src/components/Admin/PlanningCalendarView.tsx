import Link from "next/link";
import { redirect } from "next/navigation";
import type { AdminViewServerProps } from "payload";

import { hasPlanningManagementRole } from "@/collections/EventPlanning/access";
import {
  CalendarQuickView,
  type CalendarQuickViewData,
} from "./CalendarQuickView";
import { getDateKey, type PlanningCalendarItem } from "./planning-utils";

const planningStatusOptions = [
  { label: "Not started", value: "not_started" },
  { label: "In progress", value: "in_progress" },
  { label: "Ready for review", value: "ready_for_review" },
  { label: "Done", value: "done" },
];

const eventStatusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
];

const monthFormatter = new Intl.DateTimeFormat("en-CA", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

const mobileDayFormatter = new Intl.DateTimeFormat("en-CA", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  weekday: "short",
});

function parseMonth(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && /^\d{4}-(0[1-9]|1[0-2])$/.test(raw)) {
    const [year, month] = raw.split("-").map(Number);
    return { month: month!, year: year! };
  }

  const [year, month] = getDateKey(new Date().toISOString())
    .split("-")
    .map(Number);
  return { month: month!, year: year! };
}

function monthParam(year: number, month: number, offset: number) {
  const date = new Date(Date.UTC(year, month - 1 + offset, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    "0"
  )}`;
}

function humanize(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function assigneeNames(
  assignees:
    | null
    | undefined
    | (number | { email?: string; id: number | string; name?: null | string })[]
) {
  const names = (assignees ?? [])
    .filter((assignee) => typeof assignee === "object")
    .map((assignee) => assignee.name || assignee.email || "Assigned");
  return names.length ? names.join(", ") : "Unassigned";
}

function isAssignedTo(
  assignees: null | undefined | (number | { id: number | string })[],
  userID: number | string
) {
  return (assignees ?? []).some(
    (assignee) =>
      String(typeof assignee === "object" ? assignee.id : assignee) ===
      String(userID)
  );
}

export async function PlanningCalendarView(props: AdminViewServerProps) {
  const { req } = props.initPageResult;
  if (!req.user) redirect("/admin/login");
  const userID = req.user.id;
  const canManagePlanning = hasPlanningManagementRole(req.user);

  const { month, year } = parseMonth(props.searchParams?.month);
  const todayKey = getDateKey(new Date().toISOString());
  const todayMonth = todayKey.slice(0, 7);
  const queryStart = new Date(Date.UTC(year, month - 1, 1));
  queryStart.setUTCDate(queryStart.getUTCDate() - 1);
  const queryEnd = new Date(Date.UTC(year, month, 1));
  queryEnd.setUTCDate(queryEnd.getUTCDate() + 1);

  const [eventsResult, tasksResult, contentResult] = await Promise.all([
    req.payload.find({
      collection: "events",
      depth: 1,
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
      depth: 1,
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
      depth: 1,
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

  const quickViews = new Map<string, CalendarQuickViewData>([
    ...eventsResult.docs.map((event): [string, CalendarQuickViewData] => [
      `event-${event.id}`,
      {
        canUpdateStatus: canManagePlanning,
        collection: "events",
        date: event.date,
        details: { label: "Description", value: event.description },
        facts: [
          { label: "Location", value: event.location || "Not specified" },
          {
            label: "Event lead",
            value:
              event.planningLead && typeof event.planningLead === "object"
                ? event.planningLead.name ||
                  event.planningLead.email ||
                  "Assigned"
                : "Unassigned",
          },
          {
            label: "Departments",
            value: event.departments?.length
              ? event.departments.map(humanize).join(", ")
              : "Not specified",
          },
        ],
        fullLabel: "Open full event",
        id: event.id,
        kind: "event",
        label: "Event",
        status: event.status ?? "draft",
        statusOptions: eventStatusOptions,
        title: event.name,
      },
    ]),
    ...tasksResult.docs.map((task): [string, CalendarQuickViewData] => [
      `task-${task.id}`,
      {
        canUpdateStatus:
          canManagePlanning || isAssignedTo(task.assignees, userID),
        collection: "event-tasks",
        date: task.dueDate,
        details: { label: "Notes", value: task.notes ?? null },
        facts: [
          {
            label: "Event",
            value:
              typeof task.event === "object"
                ? task.event.name
                : "No event name",
          },
          {
            label: "Assigned to",
            value: assigneeNames(task.assignees),
          },
          {
            label: "Department",
            value: task.department
              ? humanize(task.department)
              : "Not specified",
          },
        ],
        fullLabel: "Open full task",
        id: task.id,
        kind: "task",
        label: "Task",
        status: task.status,
        statusOptions: planningStatusOptions,
        title: task.title,
      },
    ]),
    ...contentResult.docs.map((post): [string, CalendarQuickViewData] => [
      `content-${post.id}`,
      {
        canUpdateStatus:
          canManagePlanning || isAssignedTo(post.assignees, userID),
        collection: "content-schedule",
        date: post.scheduledFor,
        facts: [
          {
            label: "Event",
            value:
              typeof post.event === "object"
                ? post.event.name
                : "No event name",
          },
          { label: "Format", value: humanize(post.format) },
          {
            label: "Assigned to",
            value: assigneeNames(post.assignees),
          },
          {
            label: "Department",
            value: post.department
              ? humanize(post.department)
              : "Not specified",
          },
        ],
        fullLabel: "Open full scheduled post",
        id: post.id,
        kind: "content",
        label: "Scheduled post",
        status: post.status,
        statusOptions: planningStatusOptions,
        title: post.title,
      },
    ]),
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
  ].sort(
    (first, second) =>
      new Date(first.date).getTime() - new Date(second.date).getTime()
  );

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
    <main className="planning-page planning-page--calendar">
      <header className="planning-page__header">
        <div>
          <p className="planning-page__eyebrow">Event planning</p>
          <h1>Calendar</h1>
          <p>Events, internal tasks, and scheduled posts in one place.</p>
        </div>
        <div className="planning-page__actions">
          <Link
            className="planning-button planning-button--secondary"
            href="/admin"
          >
            My tasks
          </Link>
          {canManagePlanning ? (
            <Link
              className="planning-button"
              href="/admin/collections/events/create"
            >
              Create event
            </Link>
          ) : null}
        </div>
      </header>

      <div className="planning-calendar__toolbar">
        <Link
          aria-label="Previous month"
          className="planning-calendar__arrow"
          href={`/admin/calendar?month=${monthParam(year, month, -1)}`}
        >
          ←
        </Link>
        <div className="planning-calendar__month">
          <h2>
            {monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)))}
          </h2>
          <Link
            aria-current={
              `${year}-${String(month).padStart(2, "0")}` === todayMonth
                ? "date"
                : undefined
            }
            className="planning-calendar__today"
            href={`/admin/calendar?month=${todayMonth}`}
          >
            Today
          </Link>
        </div>
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
            const isToday = key === todayKey;
            const dayClassName = [
              "planning-calendar__day",
              !day && "planning-calendar__day--empty",
              day &&
                dayItems.length === 0 &&
                "planning-calendar__day--no-items",
              isToday && "planning-calendar__day--today",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                aria-current={isToday ? "date" : undefined}
                className={dayClassName}
                key={`${index}-${day ?? "empty"}`}
              >
                {day ? (
                  <>
                    <span className="planning-calendar__number">{day}</span>
                    <span className="planning-calendar__mobile-date">
                      {mobileDayFormatter.format(
                        new Date(Date.UTC(year, month - 1, day))
                      )}
                    </span>
                  </>
                ) : null}
                <div className="planning-calendar__items">
                  {dayItems.map((item) => {
                    const quickView = quickViews.get(item.id);

                    return quickView ? (
                      <CalendarQuickView item={quickView} key={item.id} />
                    ) : (
                      <Link
                        className={`planning-calendar__item planning-calendar__item--${item.kind}`}
                        href={item.href}
                        key={item.id}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {items.length === 0 ? (
          <p className="planning-calendar__mobile-empty">
            Nothing is scheduled this month.
          </p>
        ) : null}
      </div>
    </main>
  );
}
