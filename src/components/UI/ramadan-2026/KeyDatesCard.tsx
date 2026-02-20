import { formatDisplayDate } from "@/lib/ramadan2026";

type KeyDatesCardProps = {
  eidEstimate: string;
  ramadan29: string;
  ramadan30: string;
};

export function KeyDatesCard({ eidEstimate, ramadan29, ramadan30 }: KeyDatesCardProps) {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100/95 p-4 shadow-md shadow-base-content/10">
      <h2 className="text-lg font-heading font-bold text-primary">Key Dates</h2>
      <div className="mt-3 space-y-2 text-sm font-body text-base-content/85">
        <p>
          <span className="font-semibold">Eid al-Fitr (Estimated):</span> {formatDisplayDate(ramadan30)} or {formatDisplayDate(eidEstimate)}
        </p>
        <p>
          <span className="font-semibold">Ramadan 29 days:</span> {formatDisplayDate(ramadan29)}
        </p>
        <p>
          <span className="font-semibold">Ramadan 30 days:</span> {formatDisplayDate(ramadan30)}
        </p>
      </div>
      <p className="mt-3 text-xs font-body text-base-content/65">Dates may vary by local moon sighting.</p>
    </section>
  );
}
