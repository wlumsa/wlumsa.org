import Link from "next/link";
import { redirect } from "next/navigation";
import type { AdminViewServerProps, Where } from "payload";

import { planningStatusOptions } from "@/collections/EventPlanning/options";
import { hasPlanningManagementRole } from "@/collections/EventPlanning/access";
import type { ContentSchedule, EventTask } from "@/payload-types";
import {
  CalendarQuickView,
  type CalendarQuickViewData,
} from "./CalendarQuickView";
import { getDateKey, getRelatedEventName } from "./planning-utils";
import { PlanningWorkspaceNav } from "./PlanningWorkspaceNav";

type WorkItem = {
  date: string;
  id: string;
  quickView: CalendarQuickViewData;
};

function humanize(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildAssignmentQuery(userID: number | string): Where {
  return {
    and: [
      { assignees: { contains: userID } },
      { status: { not_equals: "done" } },
    ],
  };
}

function normalizeTasks(tasks: EventTask[]): WorkItem[] {
  return tasks.map((task) => {
    const eventName = getRelatedEventName(task.event);

    return {
      date: task.dueDate,
      id: `task-${task.id}`,
      quickView: {
        canUpdateStatus: true,
        collection: "event-tasks",
        date: task.dueDate,
        details: { label: "Notes", value: task.notes ?? null },
        facts: [
          { label: "Event", value: eventName ?? "No event name" },
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
        subtitle: eventName ?? undefined,
        title: task.title,
      },
    };
  });
}

function normalizeContent(items: ContentSchedule[]): WorkItem[] {
  return items.map((item) => {
    const eventName = getRelatedEventName(item.event);

    return {
      date: item.scheduledFor,
      id: `content-${item.id}`,
      quickView: {
        canUpdateStatus: true,
        collection: "content-schedule",
        date: item.scheduledFor,
        facts: [
          { label: "Event", value: eventName ?? "No event name" },
          { label: "Format", value: humanize(item.format) },
          {
            label: "Department",
            value: item.department
              ? humanize(item.department)
              : "Not specified",
          },
        ],
        fullLabel: "Open full scheduled post",
        id: item.id,
        kind: "content",
        label: "Scheduled post",
        status: item.status,
        statusOptions: planningStatusOptions,
        subtitle: eventName ?? undefined,
        title: item.title,
      },
    };
  });
}

export async function MyTasksView(props: AdminViewServerProps) {
  const { req } = props.initPageResult;
  if (!req.user) redirect("/admin/login");

  const firstName = req.user.name?.trim().split(/\s+/)[0];
  const canManagePlanning = hasPlanningManagementRole(req.user);

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

  const todayKey = getDateKey(new Date().toISOString());
  const overdue = items.filter((item) => getDateKey(item.date) < todayKey);
  const dueToday = items.filter((item) => getDateKey(item.date) === todayKey);
  const comingUp = items.filter((item) => getDateKey(item.date) > todayKey);

  return (
    <main className="planning-page">
      <PlanningWorkspaceNav />
      <header className="planning-page__header">
        <div>
          <p className="planning-page__eyebrow">
            Assalamu alaikum{firstName ? `, ${firstName}` : ""}
          </p>
          <h1>My Tasks</h1>
          <p>Your MSA tasks and scheduled posts, ordered by deadline.</p>
        </div>
        <div className="planning-page__actions">
          <Link
            className="planning-button planning-button--secondary"
            href="/admin/calendar"
          >
            View calendar
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

      <section className="planning-summary" aria-label="Task summary">
        <div
          className={overdue.length ? "planning-summary__overdue" : undefined}
        >
          <strong>{overdue.length}</strong>
          <span>Overdue</span>
        </div>
        <div>
          <strong>{dueToday.length}</strong>
          <span>Due today</span>
        </div>
        <div>
          <strong>{comingUp.length}</strong>
          <span>Coming up</span>
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
          {dueToday.length > 0 ? <h2>Due today</h2> : null}
          {dueToday.map((item) => (
            <WorkItemRow item={item} key={item.id} />
          ))}
          {comingUp.length > 0 ? <h2>Coming up</h2> : null}
          {comingUp.map((item) => (
            <WorkItemRow item={item} key={item.id} />
          ))}
        </section>
      )}
    </main>
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
    <CalendarQuickView
      item={item.quickView}
      overdue={overdue}
      variant="dashboard"
    />
  );
}
