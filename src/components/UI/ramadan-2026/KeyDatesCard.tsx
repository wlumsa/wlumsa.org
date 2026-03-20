import { formatDisplayDate } from "@/lib/ramadan2026";

type KeyDatesCardProps = {
  confirmedEid: string;
  lastFastDay: string;
  ramadan29: string;
};

export function KeyDatesCard({ confirmedEid, lastFastDay, ramadan29 }: KeyDatesCardProps) {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100/95 p-4 shadow-md shadow-base-content/10">
      <h2 className="text-lg font-heading font-bold text-primary">Key Dates</h2>
      <div className="mt-3 space-y-2 text-sm font-body text-base-content/85">
        <p>
          <span className="font-semibold">Eid al-Fitr:</span> {formatDisplayDate(confirmedEid)}
        </p>
        <p>
          <span className="font-semibold">Last fasting day:</span> {formatDisplayDate(lastFastDay)}
        </p>
        <p>
          <span className="font-semibold">Ramadan completed in 29 days:</span> {formatDisplayDate(ramadan29)}
        </p>
      </div>
      <p className="mt-3 text-xs font-body text-base-content/65">Confirmed from Waterloo Masjid&apos;s moon-sighting announcement.</p>
    </section>
  );
}
