import type { RamadanDay } from "@/lib/ramadan2026";
import { getLastThirdOfNight, getOrdinal } from "@/lib/ramadan2026";

type DayDetailPanelProps = {
  day?: RamadanDay;
  nextDay?: RamadanDay;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
};

function PrayerTimeRow({ label, value, emphasize = false }: { label: string; value?: string; emphasize?: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-between rounded-xl border px-3 py-2.5 ${
        emphasize
          ? "border-secondary/45 bg-secondary/12 shadow-sm"
          : "border-base-300 bg-base-200/50"
      }`}
    >
      <span className={`text-sm font-body ${emphasize ? "text-base-content" : "text-neutral/80"}`}>{label}</span>
      <span className="text-sm font-body font-bold tabular-nums text-base-content">{value || "--:--"}</span>
    </div>
  );
}

function PanelBody({ day, nextDay }: Omit<DayDetailPanelProps, "onCloseMobile" | "isMobileOpen">) {
  if (!day) {
    return <p className="text-sm font-body text-base-content/70">Select a day to view details.</p>;
  }

  const prayerTimes = day.prayerTimes;
  const lastThird = getLastThirdOfNight(prayerTimes, nextDay?.prayerTimes);
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-heading font-bold text-primary">{day.dayLabel}</h3>
        <p className="text-sm font-body text-base-content/75">
          {day.fastIndex ? `${getOrdinal(day.fastIndex)} Fast` : "Eid al-Fitr"}
        </p>
      </div>

      <div className="space-y-2 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-body font-semibold uppercase tracking-wide text-base-content/60">Full Prayer Schedule</p>
          <p className="text-[10px] font-body text-base-content/55">Waterloo local time</p>
        </div>
        <PrayerTimeRow label="Fajr (Suhoor ends)" value={prayerTimes?.fajr} emphasize />
        <PrayerTimeRow label="Sunrise" value={prayerTimes?.sunrise} />
        <PrayerTimeRow label="Dhuhr" value={prayerTimes?.dhuhr} />
        <PrayerTimeRow label="Asr" value={prayerTimes?.asr} />
        <PrayerTimeRow label="Maghrib (Iftar)" value={prayerTimes?.maghrib} emphasize />
        <PrayerTimeRow label="Isha" value={prayerTimes?.isha} />
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <div className="rounded-lg border border-base-300 bg-base-200/60 px-3 py-2">
          <p className="text-[11px] font-body uppercase tracking-wide text-neutral/80">Night Status</p>
          <p className="text-sm font-body font-semibold text-base-content">
            {day.isEid
              ? "Eid"
              : day.isOddNight
                ? "Odd night in the last 10"
                : day.isLastTen
                  ? "Last 10 nights"
                  : "Regular Ramadan night"}
          </p>
        </div>
        <div className="rounded-lg border border-base-300 bg-base-200/60 px-3 py-2">
          <p className="text-[11px] font-body uppercase tracking-wide text-neutral/80">Last Third Starts</p>
          <p className="text-base font-heading font-bold tabular-nums text-base-content">{lastThird || "--:--"}</p>
          <p className="text-[11px] font-body text-neutral/80">Based on Maghrib to next day&apos;s Fajr.</p>
        </div>
      </div>

    </div>
  );
}

export function DayDetailPanel({ day, nextDay, isMobileOpen, onCloseMobile }: DayDetailPanelProps) {
  return (
    <>
      <aside className="hidden rounded-2xl border border-base-300 bg-base-100/95 p-4 shadow-md shadow-base-content/10 lg:sticky lg:top-24 lg:block">
        <PanelBody day={day} nextDay={nextDay} />
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
              <PanelBody day={day} nextDay={nextDay} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
