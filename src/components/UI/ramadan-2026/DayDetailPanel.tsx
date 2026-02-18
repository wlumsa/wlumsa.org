import type { RamadanDay } from "@/lib/ramadan2026";
import { getLastThirdOfNight, getOrdinal } from "@/lib/ramadan2026";

type DayDetailPanelProps = {
  day?: RamadanDay;
  nextDay?: RamadanDay;
  isLoading: boolean;
  note: string;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
};

function PrayerTimeRow({ label, value, highlight = false }: { label: string; value?: string; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
        highlight ? "border-secondary/65 bg-secondary/30 shadow-sm" : "border-base-300 bg-base-200/50"
      }`}
    >
      <span className={`text-sm font-body ${highlight ? "text-base-content" : "text-neutral/80"}`}>{label}</span>
      <span className="text-sm font-body font-bold text-base-content">
        {value || "--:--"}
      </span>
    </div>
  );
}

function PanelBody({ day, nextDay, isLoading, note }: Omit<DayDetailPanelProps, "onCloseMobile" | "isMobileOpen">) {
  if (!day) {
    return <p className="text-sm font-body text-base-content/70">Select a day to view details.</p>;
  }

  const prayerTimes = day.prayerTimes;
  const lastThird = getLastThirdOfNight(prayerTimes, nextDay?.prayerTimes);

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-heading font-bold text-primary">{day.dayLabel}</h3>
        <p className="text-sm font-body text-base-content/75">
          {day.fastIndex ? `${getOrdinal(day.fastIndex)} Fast` : "Eid al-Fitr"}
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-lg bg-base-200/70 p-3 text-sm font-body text-base-content/70">Loading prayer times...</div>
      ) : (
        <div className="space-y-2">
          <PrayerTimeRow label="Fajr (Suhoor ends)" value={prayerTimes?.fajr} />
          <PrayerTimeRow label="Sunrise" value={prayerTimes?.sunrise} />
          <PrayerTimeRow label="Dhuhr" value={prayerTimes?.dhuhr} />
          <PrayerTimeRow label="Asr" value={prayerTimes?.asr} />
          <PrayerTimeRow label="Maghrib (Iftar)" value={prayerTimes?.maghrib} highlight />
          <PrayerTimeRow label="Isha" value={prayerTimes?.isha} />
          <div className="rounded-lg border border-base-300 bg-base-100 px-3 py-2">
            <p className="text-[11px] font-body uppercase tracking-wide text-neutral/80">Last Third of the Night</p>
            <p className="text-base font-heading font-bold text-base-content">{lastThird || "--:--"}</p>
            <p className="text-[11px] font-body text-neutral/80">
              Calculated as: Fajr - (night / 3), where night = Maghrib to next day&apos;s Fajr.
            </p>
          </div>
        </div>
      )}

      <p className="rounded-lg border border-primary/15 bg-primary/5 p-3 text-sm font-body text-base-content/75">{note}</p>

    </div>
  );
}

export function DayDetailPanel({ day, nextDay, isLoading, note, isMobileOpen, onCloseMobile }: DayDetailPanelProps) {
  return (
    <>
      <aside className="hidden rounded-2xl border border-base-300 bg-base-100 p-4 lg:block lg:sticky lg:top-24">
        <PanelBody day={day} nextDay={nextDay} isLoading={isLoading} note={note} />
      </aside>

      {day && isMobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close day details"
            onClick={onCloseMobile}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl border border-base-300 bg-base-100 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-heading font-bold text-primary">Day Details</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={onCloseMobile}>
                Close
              </button>
            </div>
            <div className="max-h-[62vh] overflow-y-auto pb-4">
              <PanelBody day={day} nextDay={nextDay} isLoading={isLoading} note={note} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
