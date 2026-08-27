import Link from "next/link";
import { redirect } from "next/navigation";
import type { AdminViewServerProps, Where } from "payload";

import type { ContentSchedule, EventTask } from "@/payload-types";
import { PlanningViewShell } from "./PlanningViewShell";
import { formatPlanningDate, getRelatedEventName } from "./planning-utils";

type WorkItem = {
  date: string;
  eventName: null | string;
  href: string;
  id: string;
  kind: "Post" | "Task";
  status: string;
  title: string;
};

const statusLabels: Record<string, string> = {
  in_progress: "In progress",
  not_started: "Not started",
  ready_for_review: "Ready for review",
};

function buildAssignmentQuery(userID: number | string): Where {
  return {
    and: [
      { assignees: { contains: userID } },
      { status: { not_equals: "done" } },
    ],
  };
}

function normalizeTasks(tasks: EventTask[]): WorkItem[] {
  return tasks.map((task) => ({
    date: task.dueDate,
    eventName: getRelatedEventName(task.event),
    href: `/admin/collections/event-tasks/${task.id}`,
    id: `task-${task.id}`,
    kind: "Task",
    status: task.status,
    title: task.title,
  }));
}

function normalizeContent(items: ContentSchedule[]): WorkItem[] {
  return items.map((item) => ({
    date: item.scheduledFor,
    eventName: getRelatedEventName(item.event),
    href: `/admin/collections/content-schedule/${item.id}`,
    id: `content-${item.id}`,
    kind: "Post",
    status: item.status,
    title: item.title,
  }));
}

export async function MyTasksView(props: AdminViewServerProps) {
  const { req } = props.initPageResult;
  if (!req.user) redirect("/admin/login");

  const where = buildAssignmentQuery(req.user.id);
  const [tasksResult, contentResult] = await Promise.all([
    req.payload.find({
      collection: "event-tasks",
      depth: 1,
      limit: 100,
      overrideAccess: false,
      req,
      sort: "dueDate",
      where,
    }),
    req.payload.find({
      collection: "content-schedule",
      depth: 1,
      limit: 100,
      overrideAccess: false,
      req,
      sort: "scheduledFor",
      where,
    }),
  ]);

  const items = [
    ...normalizeTasks(tasksResult.docs),
    ...normalizeContent(contentResult.docs),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const now = new Date();
  const overdue = items.filter((item) => new Date(item.date) < now);
  const upcoming = items.filter((item) => new Date(item.date) >= now);

  return (
    <PlanningViewShell props={props}>
      <main className="planning-page">
        <header className="planning-page__header">
          <div>
            <p className="planning-page__eyebrow">Event planning</p>
            <h1>My tasks</h1>
            <p>Only the work assigned to you, ordered by deadline.</p>
          </div>
          <div className="planning-page__actions">
            <Link
              className="planning-button planning-button--secondary"
              href="/admin/calendar"
            >
              View calendar
            </Link>
            <Link
              className="planning-button"
              href="/admin/collections/events/create"
            >
              Create event
            </Link>
          </div>
        </header>

        <section className="planning-summary" aria-label="Task summary">
          <div>
            <strong>{upcoming.length}</strong>
            <span>Upcoming</span>
          </div>
          <div
            className={overdue.length ? "planning-summary__overdue" : undefined}
          >
            <strong>{overdue.length}</strong>
            <span>Overdue</span>
          </div>
        </section>

        {items.length === 0 ? (
          <section className="planning-empty">
            <h2>You’re all caught up</h2>
            <p>No unfinished tasks or posts are assigned to you.</p>
          </section>
        ) : (
          <section className="planning-work-list" aria-label="Assigned work">
            {overdue.length > 0 ? <h2>Overdue</h2> : null}
            {overdue.map((item) => (
              <WorkItemRow item={item} key={item.id} overdue />
            ))}
            {upcoming.length > 0 ? <h2>Coming up</h2> : null}
            {upcoming.map((item) => (
              <WorkItemRow item={item} key={item.id} />
            ))}
          </section>
        )}
      </main>
    </PlanningViewShell>
  );
}

function WorkItemRow({
  item,
  overdue = false,
}: {
  item: WorkItem;
  overdue?: boolean;
}) {
  return (
    <Link className="planning-work-item" href={item.href}>
      <span
        className={`planning-kind planning-kind--${item.kind.toLowerCase()}`}
      >
        {item.kind}
      </span>
      <span className="planning-work-item__main">
        <strong>{item.title}</strong>
        {item.eventName ? <small>{item.eventName}</small> : null}
      </span>
      <span
        className={
          overdue ? "planning-date planning-date--overdue" : "planning-date"
        }
      >
        {formatPlanningDate(item.date)}
      </span>
      <span className="planning-status">
        {statusLabels[item.status] ?? item.status}
      </span>
    </Link>
  );
}
