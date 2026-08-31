"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type CalendarQuickViewData = {
  collection: "content-schedule" | "event-tasks" | "events";
  date: string;
  details?: { label: string; value: null | string };
  facts: { label: string; value: string }[];
  fullLabel: string;
  id: number | string;
  kind: "content" | "event" | "task";
  label: string;
  status: string;
  statusOptions: { label: string; value: string }[];
  title: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "America/Toronto",
});

export function CalendarQuickView({ item }: { item: CalendarQuickViewData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(item.status);
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

  async function updateStatus(nextStatus: string) {
    if (nextStatus === status || pendingStatus) return;

    const previousStatus = status;
    setError(null);
    setPendingStatus(nextStatus);
    setStatus(nextStatus);

    try {
      const response = await fetch(`/api/${item.collection}/${item.id}`, {
        body: JSON.stringify({ status: nextStatus }),
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Update failed");
    } catch {
      setStatus(previousStatus);
      setError("Couldn’t save that status. Please try again.");
    } finally {
      setPendingStatus(null);
    }
  }

  const titleID = `calendar-quick-view-${item.kind}-${item.id}`;

  return (
    <>
      <button
        aria-haspopup="dialog"
        className={`planning-calendar__item planning-calendar__item--${item.kind} planning-calendar__item--button`}
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        {item.title}
      </button>

      {isOpen ? (
        <div
          className="planning-task-drawer__backdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setIsOpen(false);
          }}
        >
          <aside
            aria-labelledby={titleID}
            aria-modal="true"
            className={`planning-task-drawer is-${item.kind}`}
            role="dialog"
          >
            <div className="planning-task-drawer__accent" />
            <header className="planning-task-drawer__header">
              <div>
                <p>{item.label} brief</p>
                <span>{dateFormatter.format(new Date(item.date))}</span>
              </div>
              <button
                aria-label={`Close ${item.label.toLowerCase()} details`}
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
                <h2 id={titleID}>{item.title}</h2>
              </div>

              <dl className="planning-task-drawer__facts">
                {item.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <section className="planning-task-drawer__section">
                <div className="planning-task-drawer__section-heading">
                  <h3>Status</h3>
                  <span>{pendingStatus ? "Saving…" : "Saved"}</span>
                </div>
                <div
                  aria-label={`${item.label} status`}
                  className="planning-task-status-options"
                  role="group"
                >
                  {item.statusOptions.map((option) => (
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

              {item.details ? (
                <section className="planning-task-drawer__section">
                  <h3>{item.details.label}</h3>
                  <p className={item.details.value ? undefined : "is-muted"}>
                    {item.details.value ||
                      `No ${item.details.label.toLowerCase()} added.`}
                  </p>
                </section>
              ) : null}
            </div>

            <footer className="planning-task-drawer__footer">
              <Link href={`/admin/collections/${item.collection}/${item.id}`}>
                {item.fullLabel} <span aria-hidden="true">↗</span>
              </Link>
              <small>Calendar stays right where you left it.</small>
            </footer>
          </aside>
        </div>
      ) : null}
    </>
  );
}
