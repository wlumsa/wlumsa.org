"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  buildKeyDateSummary,
  buildRamadanDays,
  DEFAULT_LOCATION,
  formatDisplayDate,
  getStartOption,
  type CalculationMode,
  type Madhab,
  type PrayerTimes,
  RAMADAN_2026_START_OPTIONS,
} from "@/lib/ramadan2026";
import {
  CalendarGrid,
  DayDetailPanel,
  ExportButtons,
  Hero,
  KeyDatesCard,
  LocationSelector,
  MethodToggle,
  type LocationOption,
} from "./index";

const LOCATION_OPTIONS: LocationOption[] = [
  { value: "waterloo-on", label: "Waterloo, ON", city: "Waterloo", country: "Canada" },
  { value: "kitchener-on", label: "Kitchener, ON", city: "Kitchener", country: "Canada" },
  { value: "toronto-on", label: "Toronto, ON", city: "Toronto", country: "Canada" },
  { value: "ottawa-on", label: "Ottawa, ON", city: "Ottawa", country: "Canada" },
  { value: "mississauga-on", label: "Mississauga, ON", city: "Mississauga", country: "Canada" },
  { value: "brampton-on", label: "Brampton, ON", city: "Brampton", country: "Canada" },
  { value: "hamilton-on", label: "Hamilton, ON", city: "Hamilton", country: "Canada" },
  { value: "london-on", label: "London, ON", city: "London", country: "Canada" },
];

const RAMADAN_RESOURCES = [
  {
    title: "Ramadan Journal",
    description: "Daily reflection prompts and planning pages.",
    href: "/RamadanJournal.pdf",
  },
  {
    title: "Ramadan Checklist",
    description: "Track worship goals and daily habits.",
    href: "/ramadan_checklist.pdf",
  },
  {
    title: "Prayer Schedule PDF",
    description: "Printable prayer and iftar reference sheet.",
    href: "/ramadan_schedule2025.pdf",
  },
] as const;

type TimeSource = "waterloo-masjid" | "api";

function isWaterlooContext(
  location: { city: string; country: string },
  coords: { latitude: number; longitude: number } | null
) {
  const byName = location.city.toLowerCase().includes("waterloo") && location.country.toLowerCase().includes("canada");
  if (byName) return true;

  if (!coords) return false;
  return (
    coords.latitude >= 43.2 &&
    coords.latitude <= 43.7 &&
    coords.longitude >= -80.8 &&
    coords.longitude <= -80.2
  );
}

export default function Ramadan2026Client() {
  const [selectedLocationValue, setSelectedLocationValue] = useState("waterloo-on");
  const [detectedLabel, setDetectedLabel] = useState<string | undefined>(undefined);
  const [detectedCityCountry, setDetectedCityCountry] = useState<{ city: string; country: string } | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const [mode, setMode] = useState<CalculationMode>("astronomical");
  const [madhab, setMadhab] = useState<Madhab>("shafi");
  const [timeSource, setTimeSource] = useState<TimeSource>("waterloo-masjid");
  const [selectedStartOptionId, setSelectedStartOptionId] = useState(getStartOption("astronomical").id);

  const [prayerTimesByDate, setPrayerTimesByDate] = useState<Record<string, PrayerTimes>>({});
  const [isPrayerLoading, setIsPrayerLoading] = useState(true);
  const [prayerError, setPrayerError] = useState<string | null>(null);
  const [sourceDescription, setSourceDescription] = useState<string | undefined>(undefined);
  const [supportsMadhab, setSupportsMadhab] = useState(true);

  const [selectedISO, setSelectedISO] = useState<string | null>(null);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [origin, setOrigin] = useState("");

  const selectedLocationFromDropdown =
    LOCATION_OPTIONS.find((option) => option.value === selectedLocationValue) ||
    ({
      city: DEFAULT_LOCATION.city,
      country: DEFAULT_LOCATION.country,
    } as LocationOption);

  const selectedLocation = detectedCityCountry || selectedLocationFromDropdown;
  const isWaterlooAvailable = isWaterlooContext(selectedLocation, coords);

  const selectedStartOption =
    RAMADAN_2026_START_OPTIONS.find((option) => option.id === selectedStartOptionId) ||
    getStartOption(mode);

  const days = useMemo(
    () => buildRamadanDays(selectedStartOption.startDateISO, prayerTimesByDate),
    [selectedStartOption.startDateISO, prayerTimesByDate]
  );

  const selectedDay = days.find((day) => day.isoDate === selectedISO) || days[0];
  const selectedDayIndex = days.findIndex((day) => day.isoDate === selectedDay?.isoDate);
  const nextDay = selectedDayIndex >= 0 ? days[selectedDayIndex + 1] : undefined;

  const keyDates = buildKeyDateSummary(selectedStartOption.startDateISO);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (!selectedISO && days[0]) {
      setSelectedISO(days[0].isoDate);
      return;
    }

    const stillExists = days.some((day) => day.isoDate === selectedISO);
    if (!stillExists && days[0]) {
      setSelectedISO(days[0].isoDate);
    }
  }, [days, selectedISO]);

  useEffect(() => {
    if (!isWaterlooAvailable && timeSource === "waterloo-masjid") {
      setTimeSource("api");
    }
  }, [isWaterlooAvailable, timeSource]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      source: timeSource,
      mode,
      madhab,
      city: selectedLocation.city,
      country: selectedLocation.country,
    });

    if (coords) {
      params.set("latitude", String(coords.latitude));
      params.set("longitude", String(coords.longitude));
    }

    setIsPrayerLoading(true);
    setPrayerError(null);

    fetch(`/api/ramadan/prayer-times?${params.toString()}`, {
      signal: controller.signal,
      cache: "force-cache",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load prayer times");
        }
        return response.json();
      })
      .then((payload: {
        prayerTimesByDate?: Record<string, PrayerTimes>;
        source?: string;
        supportsMadhab?: boolean;
      }) => {
        setPrayerTimesByDate(payload.prayerTimesByDate || {});
        setSourceDescription(payload.source);
        setSupportsMadhab(payload.supportsMadhab ?? true);
      })
      .catch((error: unknown) => {
        if ((error as { name?: string })?.name === "AbortError") return;
        setPrayerError("Prayer times could not be loaded right now.");
      })
      .finally(() => {
        setIsPrayerLoading(false);
      });

    return () => controller.abort();
  }, [timeSource, mode, madhab, selectedLocation.city, selectedLocation.country, coords]);

  const handleAutoDetect = async () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setDetectedLabel("Geolocation is not available in this browser.");
      return;
    }

    setIsDetecting(true);
    setDetectedLabel(undefined);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      const latitude = Number(position.coords.latitude.toFixed(4));
      const longitude = Number(position.coords.longitude.toFixed(4));
      setCoords({ latitude, longitude });

      try {
        const reverseUrl = new URL("https://nominatim.openstreetmap.org/reverse");
        reverseUrl.searchParams.set("format", "jsonv2");
        reverseUrl.searchParams.set("lat", String(latitude));
        reverseUrl.searchParams.set("lon", String(longitude));

        const reverseResponse = await fetch(reverseUrl.toString());
        const reverseData = (await reverseResponse.json()) as {
          address?: { city?: string; town?: string; village?: string; state?: string; country?: string };
        };

        const city =
          reverseData.address?.city || reverseData.address?.town || reverseData.address?.village || "Detected city";
        const region = reverseData.address?.state || "";
        const country = reverseData.address?.country || selectedLocation.country;

        setDetectedLabel(`${city}${region ? `, ${region}` : ""}`);
        setDetectedCityCountry({ city, country });
        const localDetected =
          city.toLowerCase().includes("waterloo") && country.toLowerCase().includes("canada");
        setTimeSource(localDetected ? "waterloo-masjid" : "api");
      } catch {
        setDetectedLabel(`Detected coordinates: ${latitude}, ${longitude}`);
      }
    } catch {
      setDetectedLabel("Location access denied or unavailable.");
    } finally {
      setIsDetecting(false);
    }
  };

  const handleLocationChange = (value: string) => {
    const nextLocation = LOCATION_OPTIONS.find((option) => option.value === value);
    const shouldUseWaterlooSource =
      (nextLocation?.city || "").toLowerCase().includes("waterloo") &&
      (nextLocation?.country || "").toLowerCase().includes("canada");

    setSelectedLocationValue(value);
    setCoords(null);
    setDetectedCityCountry(null);
    setDetectedLabel(undefined);
    setTimeSource(shouldUseWaterlooSource ? "waterloo-masjid" : "api");
  };

  const handleTimeSourceChange = (source: TimeSource) => {
    if (source === "waterloo-masjid" && !isWaterlooAvailable) return;
    setTimeSource(source);
  };

  const handleMethodChange = (nextMode: CalculationMode) => {
    setMode(nextMode);
    const option = getStartOption(nextMode);
    setSelectedStartOptionId(option.id);
  };

  const handleStartOptionSelect = (optionId: string) => {
    const option = RAMADAN_2026_START_OPTIONS.find((value) => value.id === optionId);
    if (!option) return;
    setSelectedStartOptionId(option.id);
    setMode(option.mode);
  };

  const calendarQuery = new URLSearchParams({
    mode: selectedStartOption.mode,
    city: selectedLocation.city,
    country: selectedLocation.country,
  }).toString();

  const icsDownloadHref = `/api/ramadan/calendar?${calendarQuery}&download=1`;
  const calendarFeed = `${origin || "https://www.wlumsa.org"}/api/ramadan/calendar?${calendarQuery}`;
  const googleCalendarHref = `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarFeed)}`;

  const note = selectedDay?.isOddNight
    ? "Odd night of the last 10: increase dua, Quran, and dhikr tonight."
    : selectedDay?.isLastTen
      ? "Last 10 nights: stay consistent and aim for quality worship each night."
      : selectedDay?.isEid
        ? "Eid Mubarak from WLUMSA. May Allah accept your fasting and prayers."
        : "Set your intention early, protect your fast, and keep your duas specific.";

  return (
    <div className="min-h-screen bg-base-100 pb-24 pt-24">
      <div className="container mx-auto space-y-5 px-4">
        <Hero
          title="Ramadan 2026"
          subtitle="Waterloo, Ontario"
        />

        <section className="rounded-2xl border border-primary/15 bg-primary/5 p-4 md:p-5">
          <div>
            <h2 className="text-lg font-heading font-bold text-primary">Ramadan 2026 With WLUMSA</h2>
            <p className="mt-1 text-sm font-body text-base-content/75">
              Join iftars, support campus Ramadan services, and stay connected.
            </p>
            <p className="mt-2 text-sm font-body text-base-content/80">
              <span className="font-semibold">Taraweeh:</span> Paul Martin Centre (PMC), after Isha.
            </p>
            <div className="mt-3 rounded-xl border border-base-300 bg-base-100 p-3">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h3 className="text-sm font-heading font-bold text-primary">Ramadan Resources</h3>
                <p className="text-xs font-body text-base-content/65">All resources open as PDF.</p>
              </div>

              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {RAMADAN_RESOURCES.map((resource) => (
                  <a
                    key={resource.href}
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-xl border border-base-300 bg-base-100 p-3 transition hover:border-primary/40 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/25"
                  >
                    <p className="text-sm font-body font-semibold text-base-content group-hover:text-primary">
                      {resource.title}
                    </p>
                    <p className="mt-1 text-xs font-body text-base-content/70">{resource.description}</p>
                    <span className="mt-2 inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-[11px] font-body font-semibold uppercase tracking-wide text-primary">
                      Open PDF
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <h2 className="text-lg font-heading font-bold text-primary">Ramadan Planner</h2>
            <p className="mt-1 text-sm font-body text-base-content/70">
              Choose location and method, then explore the daily calendar details.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <LocationSelector
              options={LOCATION_OPTIONS}
              selectedValue={selectedLocationValue}
              isDetecting={isDetecting}
              detectedLabel={detectedLabel}
              onAutoDetect={handleAutoDetect}
              onChange={handleLocationChange}
            />

            <MethodToggle
              timeSource={timeSource}
              isWaterlooAvailable={isWaterlooAvailable}
              sourceDescription={sourceDescription}
              showMadhabToggle={timeSource === "api" && supportsMadhab}
              mode={mode}
              madhab={madhab}
              onTimeSourceChange={handleTimeSourceChange}
              onModeChange={handleMethodChange}
              onMadhabChange={setMadhab}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-base-300 bg-base-100 p-4 md:p-5">
          <h2 className="text-lg font-heading font-bold text-primary">Ramadan Start Date</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {RAMADAN_2026_START_OPTIONS.map((option) => {
              const isSelected = option.id === selectedStartOptionId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleStartOptionSelect(option.id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/25"
                      : "border-base-300 bg-base-100 hover:border-primary/30"
                  }`}
                >
                  <p className="text-sm font-body font-semibold text-base-content">{option.label}</p>
                  <p className="mt-1 text-lg font-heading font-bold text-primary">
                    {formatDisplayDate(option.startDateISO)}
                  </p>
                  <p className="mt-1 text-sm font-body text-base-content/70">{option.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <CalendarGrid
            days={days}
            selectedISO={selectedDay?.isoDate || ""}
            onSelect={(isoDate) => {
              setSelectedISO(isoDate);
              setIsMobilePanelOpen(true);
            }}
          />

          <div className="space-y-4">
            {prayerError ? (
              <div className="rounded-2xl border border-error/30 bg-error/10 p-4 text-sm font-body text-error-content">
                {prayerError}
              </div>
            ) : null}

            <DayDetailPanel
              day={selectedDay}
              nextDay={nextDay}
              isLoading={isPrayerLoading}
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
      </div>
    </div>
  );
}
