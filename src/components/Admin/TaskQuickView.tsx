"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type TaskQuickViewData = {
  assignees: string[];
  department: null | string;
  dueDate: string;
  eventName: null | string;
  id: number | string;
  notes: null | string;
  status: "done" | "in_progress" | "not_started" | "ready_for_review";
  title: string;
};

const statusOptions = [
  { label: "Not started", value: "not_started" },
  { label: "In progress", value: "in_progress" },
  { label: "Ready for review", value: "ready_for_review" },
  { label: "Done", value: "done" },
] as const;

const departmentLabels: Record<string, string> = {
  community_engagement: "Community Engagement",
  events_brothers: "Events Brothers",
  events_sisters: "Events Sisters",
  finance: "Finance",
  marketing: "Marketing",
  operations: "Operations",
  religious_affairs_brothers: "Religious Affairs Brothers",
  religious_affairs_sisters: "Religious Affairs Sisters",
  technology: "Technology",
};

const dueDateFormatter = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "America/Toronto",
});

export function TaskQuickView({ task }: { task: TaskQuickViewData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [pendingStatus, setPendingStatus] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = closeButtonRef.current?.closest<HTMLElement>(
        ".planning-task-drawer"
      );
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  async function updateStatus(nextStatus: TaskQuickViewData["status"]) {
    if (nextStatus === status || pendingStatus) return;

    const previousStatus = status;
    setError(null);
    setPendingStatus(nextStatus);
    setStatus(nextStatus);

    try {
      const response = await fetch(`/api/event-tasks/${task.id}`, {
        body: JSON.stringify({ status: nextStatus }),
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });

      if (!response.ok) throw new Error("The task could not be updated.");
    } catch {
      setStatus(previousStatus);
      setError("Couldn’t save that status. Please try again.");
    } finally {
      setPendingStatus(null);
    }
  }

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="planning-calendar__item planning-calendar__item--task planning-calendar__item--button"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        {task.title}
      </button>

      {isOpen ? (
        <div
          className="planning-task-drawer__backdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setIsOpen(false);
          }}
        >
          <aside
            aria-labelledby={`task-drawer-title-${task.id}`}
            aria-modal="true"
            className="planning-task-drawer"
            role="dialog"
          >
            <div className="planning-task-drawer__accent" />
            <header className="planning-task-drawer__header">
              <div>
                <p>Task brief</p>
                <span>{dueDateFormatter.format(new Date(task.dueDate))}</span>
              </div>
              <button
                aria-label="Close task details"
                className="planning-task-drawer__close"
                onClick={() => setIsOpen(false)}
                ref={closeButtonRef}
                type="button"
              >
                ×
              </button>
            </header>

            <div className="planning-task-drawer__body">
              <div className="planning-task-drawer__title">
                <span className={`planning-task-status-dot is-${status}`} />
                <h2 id={`task-drawer-title-${task.id}`}>{task.title}</h2>
              </div>

              <dl className="planning-task-drawer__facts">
                <div>
                  <dt>Event</dt>
                  <dd>{task.eventName || "No event name"}</dd>
                </div>
                <div>
                  <dt>Assigned to</dt>
                  <dd>
                    {task.assignees.length
                      ? task.assignees.join(", ")
                      : "Unassigned"}
                  </dd>
                </div>
                <div>
                  <dt>Department</dt>
                  <dd>
                    {task.department
                      ? departmentLabels[task.department] ?? task.department
                      : "Not specified"}
                  </dd>
                </div>
              </dl>

              <section className="planning-task-drawer__section">
                <div className="planning-task-drawer__section-heading">
                  <h3>Status</h3>
                  {pendingStatus ? <span>Saving…</span> : <span>Saved</span>}
                </div>
                <div
                  aria-label="Task status"
                  className="planning-task-status-options"
                  role="group"
                >
                  {statusOptions.map((option) => (
                    <button
                      aria-pressed={status === option.value}
                      className={status === option.value ? "is-active" : ""}
                      disabled={Boolean(pendingStatus)}
                      key={option.value}
                      onClick={() => updateStatus(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {error ? (
                  <p className="planning-task-drawer__error" role="alert">
                    {error}
                  </p>
                ) : null}
              </section>

              <section className="planning-task-drawer__section">
                <h3>Notes</h3>
                <p className={task.notes ? undefined : "is-muted"}>
                  {task.notes || "No notes have been added to this task."}
                </p>
              </section>
            </div>

            <footer className="planning-task-drawer__footer">
              <Link href={`/admin/collections/event-tasks/${task.id}`}>
                Open full task <span aria-hidden="true">↗</span>
              </Link>
              <small>Calendar stays right where you left it.</small>
            </footer>
          </aside>
        </div>
      ) : null}
    </>
  );
}
