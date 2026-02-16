import React from "react";

type ExportButtonsProps = {
  googleCalendarHref: string;
  icsDownloadHref: string;
};

export function ExportButtons({ googleCalendarHref, icsDownloadHref }: ExportButtonsProps) {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-4">
      <h2 className="text-lg font-heading font-bold text-primary">Calendar Export</h2>
      <p className="mt-1 text-sm font-body text-base-content/70">
        Includes daily fast entries, last 10 nights, odd nights, and Eid marker.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <a className="btn btn-primary" href={googleCalendarHref} target="_blank" rel="noreferrer">
          Add to Google Calendar
        </a>
        <a className="btn btn-secondary" href={icsDownloadHref}>
          Download .ics
        </a>
      </div>
    </section>
  );
}
