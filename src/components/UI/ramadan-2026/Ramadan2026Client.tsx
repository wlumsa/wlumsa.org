"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EventCard } from "@/components/UI/WeeklyEvents";
import PrayerSpaceCard from "@/components/UI/PrayerSpaceCard";
import {
  RAMADAN_2026_START_DATE_ISO,
  buildKeyDateSummary,
  buildRamadanDays,
  formatDisplayDate,
  getOrdinal,
  type PrayerTimes,
} from "@/lib/ramadan2026";
import {
  CalendarGrid,
  DayDetailPanel,
  ExportButtons,
  Hero,
  KeyDatesCard,
} from "./index";

const RAMADAN_RESOURCES = [
  {
    title: "Ramadan Journal",
    description: "Daily reflection prompts and planning pages.",
    href: "/RamadanJournal.pdf",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/ramadan_journal.png",
    alt: "Ramadan Journal cover",
  },
  {
    title: "Ramadan Checklist",
    description: "Track worship goals and daily habits.",
    href: "/ramadan_checklist.pdf",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/RamadanChecklist.png",
    alt: "Ramadan Checklist preview",
  },
  {
    title: "Prayer Schedule PDF",
    description: "Printable prayer and iftar reference sheet.",
    href: "/ramadan_schedule2026.pdf",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/Ramadan Schedule.png",
    alt: "Ramadan prayer schedule preview",
  },
] as const;

const CAMPUS_SERVICES = [
  {
    name: "Daily Iftars on Campus",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/iftar2025.webp",
    timeLocation: "Monday - Friday in PMC (arrive ~20 minutes before Maghrib)",
    caption:
      "Join daily campus iftars in the PMC and break your fast together at Maghrib.",
    link: "/forms/iftar",
    ctaText: "Register for Iftar",
  },
  {
    name: "Daily Taraweeh on Campus",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/taraweeh25.webp",
    timeLocation: "Every day in PMC (after Isha). See Ramadan calendar for exact timings.",
    caption:
      "Attend daily Taraweeh in the PMC, including weekends, after Isha.",
    link: "https://www.youtube.com/watch?v=xnGcNytQNxQ&embeds_referring_euri=https%3A%2F%2Fwww.wlumsa.org%2F&source_ve_path=Mjg2NjY",
    ctaText: "Directions to PMC",
  },
  {
    name: "MSA Tarteel Competition",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/tarteel26(1).webp",
    timeLocation: "Entire month on the Tarteel app",
    caption:
      "Join the MSA Tarteel Competition and participate through Ramadan on the Tarteel app.",
    link: "https://www.tarteel.ai/group/join/APupRReDbS3NmM6u?ref=P3pfsqtkCB",
    ctaText: "Participate Now",
  },
] as const;

const IMPACT_METRICS_2025 = [
  {
    value: 3000,
    label: "Meals Provided",
    prefix: "",
    suffix: "+",
  },
  {
    value: 16000,
    label: "Charity Raised",
    prefix: "$",
    suffix: "+",
  },
  {
    value: 500,
    label: "Students Served",
    prefix: "",
    suffix: "+",
  },
] as const;

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-CA").format(value);
}

function CountUpNumber({
  value,
  start,
  prefix = "",
  suffix = "",
  durationMs = 1000,
}: {
  value: number;
  start: boolean;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame = 0;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, value, durationMs]);

  return (
    <>
      {prefix}
      {formatCompactNumber(displayValue)}
      {suffix}
    </>
  );
}

type Ramadan2026ClientProps = {
  prayerTimesByDate: Record<string, PrayerTimes>;
};

export default function Ramadan2026Client({ prayerTimesByDate }: Ramadan2026ClientProps) {
  const impactSectionRef = useRef<HTMLElement | null>(null);
  const [isImpactVisible, setIsImpactVisible] = useState(false);
  const [selectedISO, setSelectedISO] = useState<string | null>(null);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [origin, setOrigin] = useState("");

  const days = useMemo(
    () => buildRamadanDays(RAMADAN_2026_START_DATE_ISO, prayerTimesByDate),
    [prayerTimesByDate]
  );

  const selectedDay = days.find((day) => day.isoDate === selectedISO) || days[0];
  const selectedDayIndex = days.findIndex((day) => day.isoDate === selectedDay?.isoDate);
  const nextDay = selectedDayIndex >= 0 ? days[selectedDayIndex + 1] : undefined;

  const keyDates = buildKeyDateSummary(RAMADAN_2026_START_DATE_ISO);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    const node = impactSectionRef.current;
    if (!node || isImpactVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsImpactVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isImpactVisible]);

  useEffect(() => {
    if (!days[0]) return;

    if (!selectedISO) {
      const todayISO = new Date().toISOString().slice(0, 10);
      const matchingToday = days.find((day) => day.isoDate === todayISO);
      setSelectedISO(matchingToday?.isoDate || days[0].isoDate);
      return;
    }

    const stillExists = days.some((day) => day.isoDate === selectedISO);
    if (!stillExists && days[0]) {
      setSelectedISO(days[0].isoDate);
    }
  }, [days, selectedISO]);

  const icsDownloadHref = "/api/ramadan/calendar?download=1";
  const calendarFeed = `${origin || "https://www.wlumsa.org"}/api/ramadan/calendar`;
  const googleCalendarHref = `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarFeed)}`;

  const note = selectedDay?.isOddNight
    ? {
      title: "Tonight's Focus",
      items: [
        "Odd night of the last 10: prioritize extra dua, Quran, and sincere dhikr.",
        "Protect your time after Isha and use at least part of the last third of the night for worship.",
        "Ask Allah for broad goodness in this life and the next, and for accepted fasting.",
      ],
    }
    : selectedDay?.isLastTen
      ? {
        title: "Tonight's Focus",
        items: [
          "Stay consistent: small acts done well each night are better than one heavy night.",
          "Set a realistic plan before Maghrib (Quran, dua, istighfar, and salah).",
          "End your night with sincere repentance and dua for yourself and the ummah.",
        ],
      }
      : selectedDay?.isEid
        ? {
          title: "Eid Reminder",
          items: [
            "Eid Mubarak from WLUMSA. May Allah accept your fasting, prayers, and duas.",
            "Keep gratitude, dhikr, and good character central throughout the day.",
            "Reach out, forgive, and maintain ties with family, friends, and community.",
          ],
        }
        : {
          title: "Today's Focus",
          items: [
            "Renew your intention early and protect your fast from both hunger and harmful speech.",
            "Plan your day around salah times, Quran recitation, and moments of dhikr.",
            "Make focused dua before iftar and ask Allah for what is best.",
          ],
        };

  const todayISO = new Date().toISOString().slice(0, 10);
  const fastingDays = days.filter((day) => day.isFastingDay);
  const firstFastingDay = fastingDays[0];
  const lastFastingDay = fastingDays[fastingDays.length - 1];
  const todayRamadanDay = fastingDays.find((day) => day.isoDate === todayISO);
  const jumpTargetDay =
    todayRamadanDay ||
    (todayISO < (firstFastingDay?.isoDate || "") ? firstFastingDay : lastFastingDay);
  const jumpButtonLabel = todayRamadanDay
    ? "Go to Today"
    : todayISO < (firstFastingDay?.isoDate || "")
      ? "Go to Ramadan Day 1"
      : "Go to Last Fasting Day";
  const selectedFastingDay = selectedDay?.isFastingDay ? selectedDay : undefined;

  const handleJumpToRelevantDay = () => {
    if (!jumpTargetDay) return;
    setSelectedISO(jumpTargetDay.isoDate);
    setIsMobilePanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-base-100 pb-24 pt-24">
      <div className="container mx-auto max-w-6xl space-y-5 px-4">
        <Hero
          title="Ramadan 2026"
          subtitle="Waterloo, Ontario"
        />

        <section ref={impactSectionRef} className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:p-5">
          <div className="mx-auto space-y-1.5 py-1 text-center">
            <p className="text-xs font-body font-medium uppercase tracking-wide text-primary">2025 Impact</p>
            <h2 className="mx-auto max-w-3xl text-balance text-2xl font-heading font-bold text-primary md:text-3xl">
              Alhamdulillah, last Ramadan we delivered
            </h2>
            <p className="text-sm font-body text-base-content/70">A quick look at what your support made possible.</p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {IMPACT_METRICS_2025.map((metric) => (
              <article key={metric.label} className="rounded-xl border border-base-300 bg-base-100 p-4 text-center">
                <p className="text-4xl font-heading font-bold text-primary md:text-5xl">
                  <CountUpNumber
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    start={isImpactVisible}
                  />
                </p>
                <p className="mt-2 text-sm font-body font-semibold text-base-content/80">{metric.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:p-5">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-heading font-bold text-primary">Today&apos;s Fasting Snapshot</h2>
              <p className="text-xs font-body text-base-content/65">Quick view for day, suhoor cutoff, and iftar time.</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-body uppercase tracking-wide text-base-content/55">Fast Day</p>
                <button
                  type="button"
                  onClick={handleJumpToRelevantDay}
                  disabled={!jumpTargetDay}
                  className="btn btn-primary btn-xs px-2 text-primary-content normal-case"
                >
                  {jumpButtonLabel}
                </button>
              </div>
              <p className="mt-2 text-lg font-heading font-bold text-base-content">
                {selectedFastingDay?.fastIndex ? `${getOrdinal(selectedFastingDay.fastIndex)} Fast` : "Outside fasting dates"}
              </p>
              <p className="mt-1 text-sm font-body text-base-content/70">
                {selectedFastingDay ? formatDisplayDate(selectedFastingDay.isoDate) : "Select a fasting day below to view details."}
              </p>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <p className="text-xs font-body uppercase tracking-wide text-base-content/55">Suhoor Ends</p>
              <p className="mt-2 text-3xl font-heading font-bold text-base-content">{selectedFastingDay?.prayerTimes?.fajr || "--:--"}</p>
              <p className="mt-1 text-sm font-body text-base-content/70">Fajr (Suhoor cutoff)</p>
            </div>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <p className="text-xs font-body uppercase tracking-wide text-base-content/55">Iftar</p>
              <p className="mt-2 text-3xl font-heading font-bold text-base-content">{selectedFastingDay?.prayerTimes?.maghrib || "--:--"}</p>
              <p className="mt-1 text-sm font-body text-base-content/70">Maghrib (Iftar time)</p>
            </div>
          </div>
        </section>

        <div id="ramadan-calendar" className="grid items-start gap-5 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-5">
            <CalendarGrid
              days={days}
              selectedISO={selectedDay?.isoDate || ""}
              onSelect={(isoDate) => {
                setSelectedISO(isoDate);
                setIsMobilePanelOpen(true);
              }}
            />

            <section className="flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:p-5">
              <p className="text-xs font-body font-medium uppercase tracking-wide text-primary">Worship Focus</p>
              <h3 className="mt-1 text-base font-heading font-bold text-primary md:text-lg">
                Last 10 Nights and Laylatul Qadr
              </h3>
              <p className="mt-2 text-xs font-body leading-relaxed text-base-content/80">
                Laylatul Qadr is sought in the <strong>odd nights (21, 23, 25, 27, 29)</strong>. Nights begin at Maghrib.
              </p>

              <div className="mt-3 space-y-1.5 rounded-xl border border-base-300 bg-base-200/40 p-3">
                <p className="text-xs font-body leading-relaxed text-base-content/80">
                  <strong>Campus qiyam:</strong> Peters P101 (last 10 nights)
                </p>
                <p className="text-xs font-body leading-relaxed text-base-content/75">
                  <strong>The Messenger of Allah ﷺ said:</strong>
                </p>
                <p className="text-xs font-body italic leading-relaxed text-base-content/80">
                  “Our Lord Almighty descends to the lowest heaven in the last third of every night, saying:
                  Who is calling upon Me that I may answer him? Who is asking from Me that I may give him?
                  Who is seeking My forgiveness that I may forgive him?”
                </p>
                <p className="text-[11px] font-body leading-relaxed text-base-content/60">
                  Bukhari &amp; Muslim
                </p>
                <p className="text-[11px] font-body leading-relaxed text-base-content/70">
                  Keep your duas sincere and broad, and trust Allah&apos;s wisdom in what is best.
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <DayDetailPanel
              day={selectedDay}
              nextDay={nextDay}
              isLoading={false}
              note={note}
              isMobileOpen={isMobilePanelOpen}
              onCloseMobile={() => setIsMobilePanelOpen(false)}
            />

            <KeyDatesCard
              eidEstimate={keyDates.eidEstimate}
              ramadan29={keyDates.ramadan29}
              ramadan30={keyDates.ramadan30}
            />

            <ExportButtons googleCalendarHref={googleCalendarHref} icsDownloadHref={icsDownloadHref} />
          </div>
        </div>

        <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:p-5">
          <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-lg font-heading font-bold text-primary">Campus Services</h2>
            <p className="text-xs font-body text-base-content/65">Programs running throughout Ramadan 2026.</p>
          </div>
          <div id="events" className="mt-3 flex-grow space-y-1">
            {CAMPUS_SERVICES.map((service, index) => (
              <EventCard
                key={service.name}
                name={service.name}
                image={service.image}
                caption={service.caption}
                timeLocation={service.timeLocation}
                index={index}
                ctaText={service.ctaText}
                link={service.link}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:p-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-lg font-heading font-bold text-primary">Resources</h2>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {RAMADAN_RESOURCES.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-3 transition-colors duration-200 ease-out hover:border-base-content/20 hover:shadow-[0_1px_6px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 motion-reduce:transition-none sm:p-4"
              >
                <div className="flex h-56 w-full items-center justify-center overflow-hidden rounded-xl border border-base-300 bg-base-200 sm:h-64">
                  <img
                    src={resource.image}
                    alt={resource.alt}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="mt-3 flex min-w-0 flex-1 flex-col">
                  <p className="text-base font-body font-semibold text-base-content">{resource.title}</p>
                  <p className="mt-1 text-[11px] font-body uppercase tracking-wide text-base-content/60">PDF</p>
                  <p className="mt-1 text-sm font-body text-base-content/70">{resource.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm md:p-5">
          <h2
            className="mb-1 text-center text-2xl font-heading font-bold text-primary md:text-3xl"
            id="prayer_rooms"
          >
            Prayer Rooms
          </h2>
          <p className="mb-4 text-center text-sm font-body text-base-content/70">
            Find campus prayer spaces and watch directions before you head out.
          </p>
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
            id="prayerlocations"
          >
            <PrayerSpaceCard
              videoId="XQALLoF6Buo"
              title="Bricker Prayer Room"
              thumbnailUrl="https://img.youtube.com/vi/XQALLoF6Buo/maxresdefault.jpg"
            />
            <PrayerSpaceCard
              videoId="xnGcNytQNxQ"
              title="PMC (Iftars & Taraweeh)"
              thumbnailUrl="https://img.youtube.com/vi/xnGcNytQNxQ/maxresdefault.jpg"
            />
            <PrayerSpaceCard
              videoId="BeT9uC4NBPw"
              title="Peters Prayer Room"
              thumbnailUrl="https://img.youtube.com/vi/BeT9uC4NBPw/maxresdefault.jpg"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
