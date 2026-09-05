"use client";

import { toast } from "@payloadcms/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PlanningStatus =
  | "complete"
  | "in_progress"
  | "planning"
  | "ready"
  | "waiting";

type EventPlanningPanelProps = {
  canManage: boolean;
  eventID: number | string;
  initialStatus: PlanningStatus;
  initialUpdate: null | string;
  initialVenue: null | string;
};

const statuses: { label: string; value: PlanningStatus }[] = [
  { label: "Planning", value: "planning" },
  { label: "In progress", value: "in_progress" },
  { label: "Waiting", value: "waiting" },
  { label: "Ready", value: "ready" },
  { label: "Complete", value: "complete" },
];

export function EventPlanningPanel({
  canManage,
  eventID,
  initialStatus,
  initialUpdate,
  initialVenue,
}: EventPlanningPanelProps) {
  const router = useRouter();
  const [planningStatus, setPlanningStatus] = useState(initialStatus);
  const [planningUpdate, setPlanningUpdate] = useState(initialUpdate ?? "");
  const [potentialVenue, setPotentialVenue] = useState(initialVenue ?? "");
  const [message, setMessage] = useState<null | string>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function savePlanningDetails() {
    if (!canManage || isSaving) return;
    setIsSaving(true);
    setMessage("Saving…");

    try {
      const response = await fetch(`/api/events/${eventID}`, {
        body: JSON.stringify({
          planningStatus,
          planningUpdate: planningUpdate.trim() || null,
          potentialVenue: potentialVenue.trim() || null,
        }),
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Update failed");
      setMessage(null);
      toast.success("Planning update saved");
      router.refresh();
    } catch {
      setMessage("Couldn’t save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!canManage) {
    return (
      <section className="event-workspace__planning-panel">
        <div className="event-workspace__section-heading">
          <div>
            <p className="planning-page__eyebrow">Team brief</p>
            <h2>Planning update</h2>
          </div>
          <span className={`event-workspace__status is-${planningStatus}`}>
            {statuses.find((status) => status.value === planningStatus)?.label}
          </span>
        </div>
        <dl className="event-workspace__brief">
          <div>
            <dt>Potential venue</dt>
            <dd>{potentialVenue || "Not added yet"}</dd>
          </div>
          <div>
            <dt>Latest update</dt>
            <dd>{planningUpdate || "No update added yet."}</dd>
          </div>
        </dl>
      </section>
    );
  }

  return (
    <section className="event-workspace__planning-panel">
      <div className="event-workspace__section-heading">
        <div>
          <p className="planning-page__eyebrow">Team brief</p>
          <h2>Planning update</h2>
        </div>
        <span aria-live="polite" className="event-workspace__save-message">
          {message}
        </span>
      </div>

      <div className="event-workspace__planning-form">
        <label>
          <span>Status</span>
          <select
            onChange={(event) =>
              setPlanningStatus(event.target.value as PlanningStatus)
            }
            value={planningStatus}
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Potential venue</span>
          <input
            maxLength={200}
            onChange={(event) => setPotentialVenue(event.target.value)}
            placeholder="For example, Lazaridis Hall"
            type="text"
            value={potentialVenue}
          />
        </label>
        <label className="event-workspace__update-field">
          <span>Latest update</span>
          <textarea
            maxLength={600}
            onChange={(event) => setPlanningUpdate(event.target.value)}
            placeholder="For example, venue office contacted; waiting for a quote."
            rows={3}
            value={planningUpdate}
          />
        </label>
      </div>

      <div className="event-workspace__planning-actions">
        <small>Keep this short—the task list holds the detailed work.</small>
        <button
          className="planning-button"
          disabled={isSaving}
          onClick={savePlanningDetails}
          type="button"
        >
          {isSaving ? "Saving…" : "Save update"}
        </button>
      </div>
    </section>
  );
}
