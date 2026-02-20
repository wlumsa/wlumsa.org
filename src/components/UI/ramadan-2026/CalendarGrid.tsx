import { useMemo, type KeyboardEvent } from "react";
import type { RamadanDay } from "@/lib/ramadan2026";
import { formatShortDate, getOrdinal, parseISODate } from "@/lib/ramadan2026";

type CalendarGridProps = {
  days: RamadanDay[];
  selectedISO: string;
  onSelect: (isoDate: string) => void;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const COMPACT_LEGEND = [
  { label: "Last 10", className: "bg-accent/18 border-accent/45" },
  { label: "Odd Night", className: "bg-warning/30 border-warning/70 text-warning-content" },
  { label: "Eid", className: "bg-secondary/15 border-secondary/40" },
] as const;

function getMonthKey(isoDate: string): string {
  return isoDate.slice(0, 7);
}

function monthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    year: "numeric",
  }).format(new Date(year || 2026, (month || 1) - 1, 1));
}

export function CalendarGrid({ days, selectedISO, onSelect }: CalendarGridProps) {
  const grouped = useMemo(() => {
    const byMonth = new Map<string, RamadanDay[]>();
    days.forEach((day) => {
      const key = getMonthKey(day.isoDate);
      const current = byMonth.get(key) || [];
      current.push(day);
      byMonth.set(key, current);
    });
    return Array.from(byMonth.entries());
  }, [days]);

  const flatDays = days;

  const handleArrowNavigation = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentISO: string
  ) => {
    const currentIndex = flatDays.findIndex((day) => day.isoDate === currentISO);
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = Math.min(currentIndex + 1, flatDays.length - 1);
    if (event.key === "ArrowLeft") nextIndex = Math.max(currentIndex - 1, 0);
    if (event.key === "ArrowDown") nextIndex = Math.min(currentIndex + 7, flatDays.length - 1);
    if (event.key === "ArrowUp") nextIndex = Math.max(currentIndex - 7, 0);

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      const nextISO = flatDays[nextIndex]?.isoDate;
      if (nextISO) {
        onSelect(nextISO);
        const node = document.getElementById(`ramadan-day-${nextISO}`);
        node?.focus();
      }
    }
  };

  return (
    <section className="space-y-4 rounded-2xl border border-base-300 bg-base-100/95 p-4 shadow-md shadow-base-content/10 md:p-5 lg:pb-11">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-heading font-bold text-primary">Ramadan Calendar</h2>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {COMPACT_LEGEND.map((item) => (
            <span
              key={item.label}
              className={`rounded-full border px-2.5 py-1 text-[10px] font-body text-base-content/80 md:text-xs ${item.className}`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {grouped.map(([monthKey, monthDays]) => {
        const firstDate = parseISODate(monthDays[0]?.isoDate || `${monthKey}-01`);
        const leadingBlanks = new Array(firstDate.getDay()).fill(null);

        return (
          <div key={monthKey} className="space-y-2">
            <h3 className="text-center text-base font-heading font-bold text-base-content/90">
              {monthLabel(monthKey)}
            </h3>

            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-body uppercase tracking-wide text-base-content/60">
              {WEEKDAYS.map((day) => (
                <div key={day}>
                  <span className="md:hidden">{day[0]}</span>
                  <span className="hidden md:inline">{day}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {leadingBlanks.map((_, index) => (
                <div key={`blank-${monthKey}-${index}`} className="min-h-[72px] rounded-xl bg-base-200/40 md:min-h-[92px]" />
              ))}

              {monthDays.map((day) => {
                const isSelected = selectedISO === day.isoDate;
                const isEvenNightInLastTen = day.isLastTen && !day.isOddNight && !day.isEid;
                const stateClass = day.isEid
                  ? "border-secondary/45 bg-secondary/15"
                  : day.isOddNight
                    ? "border-warning/75 bg-warning/30"
                    : isEvenNightInLastTen
                      ? "border-accent/60 bg-accent/22"
                    : day.isLastTen
                      ? "border-accent/45 bg-accent/18"
                      : "border-primary/25 bg-base-100";

                return (
                  <button
                    key={day.isoDate}
                    id={`ramadan-day-${day.isoDate}`}
                    type="button"
                    aria-label={`${formatShortDate(day.isoDate)} ${day.fastIndex ? `${getOrdinal(day.fastIndex)} fast` : "Eid al-Fitr"}`}
                    className={`min-h-[72px] rounded-xl border p-1.5 text-center transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 md:min-h-[92px] md:p-2 ${stateClass} ${
                      isSelected ? "ring-2 ring-primary" : "hover:bg-primary/5"
                    }`}
                    onClick={() => onSelect(day.isoDate)}
                    onKeyDown={(event) => handleArrowNavigation(event, day.isoDate)}
                  >
                    <p className="whitespace-nowrap text-[10px] font-body text-neutral/80 md:text-[11px]">
                      {formatShortDate(day.isoDate)}
                    </p>

                    <p className="mt-1 whitespace-nowrap text-[10px] font-body font-semibold text-base-content md:text-[12px]">
                      {day.fastIndex ? (
                        <>
                          <span className="md:hidden">{`${day.fastIndex}F`}</span>
                          <span className="hidden md:inline">{`${getOrdinal(day.fastIndex)} Fast`}</span>
                        </>
                      ) : (
                        <>
                          <span className="md:hidden">Eid</span>
                          <span className="hidden md:inline">Eid al-Fitr</span>
                        </>
                      )}
                    </p>

                    <div className="mt-1 flex flex-wrap justify-center gap-1">
                      {day.isFirstTaraweeh ? (
                        <span className="hidden rounded-md bg-info px-1.5 py-0.5 text-[10px] font-body font-medium text-info-content md:inline-flex">
                          First Taraweeh
                        </span>
                      ) : null}
                      {day.isLastTen ? (
                        <span className="hidden rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-body font-medium text-accent-content md:inline-flex">
                          Last 10
                        </span>
                      ) : null}
                      {day.isOddNight ? (
                        <span className="hidden rounded-md border border-warning/60 bg-warning px-1.5 py-0.5 text-[10px] font-body font-semibold text-warning-content md:inline-flex">
                          Odd Night
                        </span>
                      ) : null}
                      {day.isEid ? (
                        <span className="hidden rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-body font-medium text-secondary-content md:inline-flex">
                          Eid
                        </span>
                      ) : null}
                      <div className="flex items-center gap-1 md:hidden">
                        {day.isFirstTaraweeh ? <span className="h-1.5 w-1.5 rounded-full bg-info" /> : null}
                        {day.isLastTen ? <span className="h-1.5 w-1.5 rounded-full bg-accent" /> : null}
                        {isEvenNightInLastTen ? <span className="h-1.5 w-1.5 rounded-full bg-accent" /> : null}
                        {day.isOddNight ? <span className="h-2 w-2 rounded-full bg-warning" /> : null}
                        {day.isEid ? <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
