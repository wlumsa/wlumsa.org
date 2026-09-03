import Link from "next/link";
import { redirect } from "next/navigation";
import type { AdminViewServerProps, Where } from "payload";

import { hasPlanningManagementRole } from "@/collections/EventPlanning/access";
import { eventPlanningStatusOptions } from "@/collections/EventPlanning/options";
import type { ContentSchedule, Event, EventTask } from "@/payload-types";
import {
  CalendarQuickView,
  type CalendarQuickViewData,
} from "./CalendarQuickView";
import { EventPlanningPanel } from "./EventPlanningPanel";
import { PlanningWorkspaceNav } from "./PlanningWorkspaceNav";

const eventDateFormatter = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "America/Toronto",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-CA", {
  day: "numeric",
  month: "short",
  timeZone: "America/Toronto",
  weekday: "short",
});

const planningStatusOptions = [
  { label: "Not started", value: "not_started" },
  { label: "In progress", value: "in_progress" },
  { label: "Ready for review", value: "ready_for_review" },
  { label: "Done", value: "done" },
];

type PlanningStatus = NonNullable<Event["planningStatus"]>;
type EventView = "past" | "upcoming";

function selectedEventID(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !/^\d+$/.test(raw)) return null;
  return Number(raw);
}

function selectedEventView(value: string | string[] | undefined): EventView {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "past" ? "past" : "upcoming";
}

function relationshipID(value: EventTask["event"] | ContentSchedule["event"]) {
  return typeof value === "object" ? value.id : value;
}

function humanize(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function personName(value: Event["planningLead"]) {
  if (!value || typeof value !== "object") return "Unassigned";
  return value.name || value.email || "Assigned";
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

function statusLabel(status: PlanningStatus) {
  const match = eventPlanningStatusOptions.find(
    (option) => option.value === status
  );
  return match && "label" in match ? String(match.label) : humanize(status);
}

function taskQuickView(
  task: EventTask,
  canManage: boolean,
  userID: number | string
): CalendarQuickViewData {
  return {
    canUpdateStatus: canManage || isAssignedTo(task.assignees, userID),
    collection: "event-tasks",
    date: task.dueDate,
    details: { label: "Notes", value: task.notes ?? null },
    facts: [
      { label: "Assigned to", value: assigneeNames(task.assignees) },
      {
        label: "Department",
        value: task.department ? humanize(task.department) : "Not specified",
      },
    ],
    fullLabel: "Open full task",
    id: task.id,
    kind: "task",
    label: "Task",
    status: task.status,
    statusOptions: planningStatusOptions,
    title: task.title,
  };
}

function contentQuickView(
  item: ContentSchedule,
  canManage: boolean,
  userID: number | string
): CalendarQuickViewData {
  return {
    canUpdateStatus: canManage || isAssignedTo(item.assignees, userID),
    collection: "content-schedule",
    date: item.scheduledFor,
    facts: [
      { label: "Format", value: humanize(item.format) },
      { label: "Assigned to", value: assigneeNames(item.assignees) },
    ],
    fullLabel: "Open full scheduled post",
    id: item.id,
    kind: "content",
    label: "Scheduled post",
    status: item.status,
    statusOptions: planningStatusOptions,
    title: item.title,
  };
}

export async function EventWorkspaceView(props: AdminViewServerProps) {
  const { req } = props.initPageResult;
  if (!req.user) redirect("/admin/login");

  const eventID = selectedEventID(props.searchParams?.event);
  const eventView = selectedEventView(props.searchParams?.view);
  const canManage = hasPlanningManagementRole(req.user);

  if (eventID) {
    const event = await req.payload.findByID({
      collection: "events",
      depth: 1,
      id: eventID,
      overrideAccess: false,
      req,
    });
    const [tasksResult, contentResult] = await Promise.all([
      req.payload.find({
        collection: "event-tasks",
        depth: 1,
        limit: 300,
        overrideAccess: false,
        req,
        sort: "dueDate",
        where: { event: { equals: event.id } },
      }),
      req.payload.find({
        collection: "content-schedule",
        depth: 1,
        limit: 300,
        overrideAccess: false,
        req,
        sort: "scheduledFor",
        where: { event: { equals: event.id } },
      }),
    ]);

    return (
      <EventWorkspaceDetail
        canManage={canManage}
        content={contentResult.docs}
        event={event}
        eventView={eventView}
        tasks={tasksResult.docs}
        userID={req.user.id}
      />
    );
  }

  const now = new Date().toISOString();
  const eventWhere: Where =
    eventView === "past"
      ? {
          and: [
            { recurringParent: { exists: false } },
            { date: { less_than: now } },
            {
              or: [
                { recurrenceEnd: { exists: false } },
                { recurrenceEnd: { less_than: now } },
              ],
            },
          ],
        }
      : {
          and: [
            { recurringParent: { exists: false } },
            {
              or: [
                { date: { greater_than_equal: now } },
                { recurrenceEnd: { greater_than_equal: now } },
              ],
            },
          ],
        };
  const eventsResult = await req.payload.find({
    collection: "events",
    depth: 1,
    limit: 60,
    overrideAccess: false,
    req,
    sort: eventView === "past" ? "-date" : "date",
    where: eventWhere,
  });
  const eventIDs = eventsResult.docs.map((event) => event.id);
  const tasksResult = eventIDs.length
    ? await req.payload.find({
        collection: "event-tasks",
        depth: 0,
        limit: 500,
        overrideAccess: false,
        req,
        where: { event: { in: eventIDs } },
      })
    : { docs: [] as EventTask[] };

  const tasksByEvent = new Map<number, EventTask[]>();
  for (const task of tasksResult.docs) {
    const id = Number(relationshipID(task.event));
    tasksByEvent.set(id, [...(tasksByEvent.get(id) ?? []), task]);
  }

  return (
    <main className="planning-page event-workspace">
      <PlanningWorkspaceNav />
      <header className="planning-page__header">
        <div>
          <p className="planning-page__eyebrow">Event planning</p>
          <h1>Events</h1>
          <p>Open an event to see its venue, latest update, and work.</p>
        </div>
        <div className="planning-page__actions">
          <Link
            className="planning-button planning-button--secondary"
            href="/admin/calendar"
          >
            Calendar
          </Link>
          {canManage ? (
            <Link
              className="planning-button"
              href="/admin/collections/events/create"
            >
              Create event
            </Link>
          ) : null}
        </div>
      </header>

      <nav className="event-workspace__views" aria-label="Event views">
        <Link
          aria-current={eventView === "upcoming" ? "page" : undefined}
          href="/admin/events"
        >
          Upcoming
        </Link>
        <Link
          aria-current={eventView === "past" ? "page" : undefined}
          href="/admin/events?view=past"
        >
          Past
        </Link>
      </nav>

      {eventsResult.docs.length ? (
        <section
          className="event-workspace__grid"
          aria-label={eventView === "past" ? "Past events" : "Upcoming events"}
        >
          {eventsResult.docs.map((event) => {
            const tasks = tasksByEvent.get(Number(event.id)) ?? [];
            const completed = tasks.filter(
              (task) => task.status === "done"
            ).length;
            const status = event.planningStatus ?? "planning";
            const progress = tasks.length
              ? Math.round((completed / tasks.length) * 100)
              : 0;

            return (
              <article className="event-workspace__card" key={event.id}>
                <div className="event-workspace__card-topline">
                  <time dateTime={event.date}>
                    {shortDateFormatter.format(new Date(event.date))}
                  </time>
                  <span className={`event-workspace__status is-${status}`}>
                    {statusLabel(status)}
                  </span>
                </div>
                <h2>{event.name}</h2>
                <dl className="event-workspace__card-facts">
                  <div>
                    <dt>Venue</dt>
                    <dd>
                      {event.location ||
                        event.potentialVenue ||
                        "Not added yet"}
                    </dd>
                  </div>
                  <div>
                    <dt>Lead</dt>
                    <dd>{personName(event.planningLead)}</dd>
                  </div>
                </dl>
                <p className="event-workspace__card-update">
                  {event.planningUpdate || "No team update added yet."}
                </p>
                <div className="event-workspace__progress">
                  <div>
                    <span>Tasks</span>
                    <strong>
                      {completed}/{tasks.length} done
                    </strong>
                  </div>
                  <span
                    aria-hidden="true"
                    className="event-workspace__progress-track"
                  >
                    <i style={{ width: `${progress}%` }} />
                  </span>
                </div>
                <Link
                  className="event-workspace__open"
                  href={`/admin/events?event=${event.id}${
                    eventView === "past" ? "&view=past" : ""
                  }`}
                >
                  Open workspace <span aria-hidden="true">→</span>
                </Link>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="planning-empty">
          <h2>
            {eventView === "past" ? "No past events" : "No upcoming events"}
          </h2>
          <p>
            {eventView === "past"
              ? "Completed events will appear here."
              : "Create an event when the next program is ready to plan."}
          </p>
        </section>
      )}
    </main>
  );
}

function EventWorkspaceDetail({
  canManage,
  content,
  event,
  eventView,
  tasks,
  userID,
}: {
  canManage: boolean;
  content: ContentSchedule[];
  event: Event;
  eventView: EventView;
  tasks: EventTask[];
  userID: number | string;
}) {
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const progress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <main className="planning-page event-workspace event-workspace--detail">
      <PlanningWorkspaceNav />
      <Link
        className="event-workspace__back"
        href={
          eventView === "past" ? "/admin/events?view=past" : "/admin/events"
        }
      >
        ← All events
      </Link>
      <header className="event-workspace__hero">
        <div>
          <div className="event-workspace__hero-kicker">
            <span
              className={`event-workspace__status is-${
                event.planningStatus ?? "planning"
              }`}
            >
              {statusLabel(event.planningStatus ?? "planning")}
            </span>
            <span>{event.status === "published" ? "Published" : "Draft"}</span>
          </div>
          <h1>{event.name}</h1>
          <p>{eventDateFormatter.format(new Date(event.date))}</p>
        </div>
        <div className="planning-page__actions">
          <Link
            className="planning-button planning-button--secondary"
            href={`/admin/collections/events/${event.id}`}
          >
            Edit event
          </Link>
          <Link className="planning-button" href="/admin/calendar">
            View calendar
          </Link>
        </div>
      </header>

      <section className="event-workspace__facts" aria-label="Event details">
        <div>
          <span>Confirmed venue</span>
          <strong>{event.location || "Not confirmed"}</strong>
        </div>
        <div>
          <span>Event lead</span>
          <strong>{personName(event.planningLead)}</strong>
        </div>
        <div>
          <span>Departments</span>
          <strong>
            {event.departments?.length
              ? event.departments.map(humanize).join(", ")
              : "Not assigned"}
          </strong>
        </div>
      </section>

      <EventPlanningPanel
        canManage={canManage}
        eventID={event.id}
        initialStatus={event.planningStatus ?? "planning"}
        initialUpdate={event.planningUpdate ?? null}
        initialVenue={event.potentialVenue ?? null}
      />

      <section className="event-workspace__work-section">
        <div className="event-workspace__section-heading">
          <div>
            <p className="planning-page__eyebrow">Checklist</p>
            <h2>Tasks</h2>
          </div>
          <div className="event-workspace__section-actions">
            <span>
              {completedTasks} of {tasks.length} complete
            </span>
            {canManage ? (
              <Link
                href={`/admin/collections/event-tasks/create?event=${event.id}`}
              >
                Add task
              </Link>
            ) : null}
          </div>
        </div>
        <span
          aria-label={`${progress}% of tasks complete`}
          className="event-workspace__progress-track is-large"
        >
          <i style={{ width: `${progress}%` }} />
        </span>
        {tasks.length ? (
          <div className="planning-work-list event-workspace__work-list">
            {tasks.map((task) => (
              <CalendarQuickView
                item={taskQuickView(task, canManage, userID)}
                key={task.id}
                variant="dashboard"
              />
            ))}
          </div>
        ) : (
          <div className="event-workspace__inline-empty">
            <p>No tasks have been added yet.</p>
          </div>
        )}
      </section>

      <section className="event-workspace__work-section">
        <div className="event-workspace__section-heading">
          <div>
            <p className="planning-page__eyebrow">Promotion</p>
            <h2>Scheduled posts</h2>
          </div>
          {canManage ? (
            <Link
              href={`/admin/collections/content-schedule/create?event=${event.id}`}
            >
              Add post
            </Link>
          ) : null}
        </div>
        {content.length ? (
          <div className="planning-work-list event-workspace__work-list">
            {content.map((item) => (
              <CalendarQuickView
                item={contentQuickView(item, canManage, userID)}
                key={item.id}
                variant="dashboard"
              />
            ))}
          </div>
        ) : (
          <div className="event-workspace__inline-empty">
            <p>No promotion has been scheduled yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
