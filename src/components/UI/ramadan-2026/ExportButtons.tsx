type ExportButtonsProps = {
  googleCalendarHref: string;
  icsDownloadHref: string;
  className?: string;
};

export function ExportButtons({ googleCalendarHref, icsDownloadHref, className }: ExportButtonsProps) {
  return (
    <section className={`flex flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-4 text-center ${className || ""}`}>
      <h2 className="text-lg font-heading font-bold text-primary">Calendar Export</h2>
      <p className="mt-1 text-sm font-body text-base-content/70">
        Add Ramadan dates to your calendar.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
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
