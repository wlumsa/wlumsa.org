"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Event as EventDoc, WeeklyEvent } from "@/payload-types";
import { formatWeeklyTime, getWeeklyEventImageAlt, getWeeklyEventImageUrl } from "./events/events-utils";
import EventListCard from "./events/EventListCard";
import EventsListPanel from "./events/EventsListPanel";
import { Button } from "./button";

type TabKey = "upcoming" | "recurring" | "past";

interface EventsTabsProps {
  upcomingEvents: EventDoc[];
  weeklyEvents: WeeklyEvent[];
  pastEvents: EventDoc[];
}

const TAB_ORDER: TabKey[] = ["upcoming", "recurring", "past"];
const TAB_LABELS: Record<TabKey, string> = {
  upcoming: "Upcoming",
  recurring: "Recurring",
  past: "Past",
};
const ACTIVE_TAB_CLASS = "border-primary bg-primary text-primary-content font-semibold";
const INACTIVE_TAB_CLASS = "border-transparent bg-transparent text-base-content/90 font-medium hover:bg-base-100/80";

function isTabKey(value: string | null): value is TabKey {
  return value === "upcoming" || value === "recurring" || value === "past";
}

export default function EventsTabs({
  upcomingEvents,
  weeklyEvents,
  pastEvents,
}: EventsTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    upcoming: null,
    recurring: null,
    past: null,
  });

  useEffect(() => {
    const tabValue = searchParams.get("tab");
    setActiveTab(isTabKey(tabValue) ? tabValue : "upcoming");
  }, [searchParams]);

  function setTabAndUrl(nextTab: TabKey) {
    setActiveTab(nextTab);
    const params = new URLSearchParams(searchParams.toString());
    if (nextTab === "upcoming") {
      params.delete("tab");
    } else {
      params.set("tab", nextTab);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function handleTabKeyDown(currentTab: TabKey, event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = TAB_ORDER.indexOf(currentTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % TAB_ORDER.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + TAB_ORDER.length) % TAB_ORDER.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = TAB_ORDER.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = TAB_ORDER[nextIndex] ?? "upcoming";
    setTabAndUrl(nextTab);
    tabRefs.current[nextTab]?.focus();
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5">
      <div
        role="tablist"
        aria-label="Event categories"
        className="grid w-full grid-cols-3 gap-1 rounded-full border border-base-300 bg-base-200/70 p-1 sm:gap-1.5 sm:p-1.5"
      >
        {TAB_ORDER.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            size="sm"
            role="tab"
            id={`events-tab-${tab}`}
            aria-controls={`events-panel-${tab}`}
            aria-selected={activeTab === tab}
            tabIndex={activeTab === tab ? 0 : -1}
            ref={(node) => {
              tabRefs.current[tab] = node;
            }}
            onClick={() => setTabAndUrl(tab)}
            onKeyDown={(event) => handleTabKeyDown(tab, event)}
            className={`h-11 touch-manipulation rounded-full px-1.5 text-[13px] transition-colors duration-150 sm:h-12 sm:px-2 sm:text-sm ${
              activeTab === tab ? ACTIVE_TAB_CLASS : INACTIVE_TAB_CLASS
            }`}
          >
            {TAB_LABELS[tab]}
          </Button>
        ))}
      </div>

      {activeTab === "upcoming" ? (
        <div
          role="tabpanel"
          id="events-panel-upcoming"
          aria-labelledby="events-tab-upcoming"
        >
          <EventsListPanel
            events={upcomingEvents}
            emptyMessage="No upcoming events published yet."
            categoryLabel="Upcoming"
            tone="upcoming"
            showLink
          />
        </div>
      ) : null}

      {activeTab === "recurring" ? (
        <div
          role="tabpanel"
          id="events-panel-recurring"
          aria-labelledby="events-tab-recurring"
          className="space-y-4"
        >
          {weeklyEvents.length > 0 ? (
            <div className="space-y-3">
              {weeklyEvents.map((event) => {
                const recurrencePrefix = event.recurrence === "biweekly"
                  ? "Biweekly · "
                  : "";
                const recurringDateLabel = `${recurrencePrefix}${event.day}\n${formatWeeklyTime(event.timeStart)} - ${formatWeeklyTime(event.timeEnd)}`;
                return (
                  <EventListCard
                    key={event.id}
                    title={event.name}
                    dateLabel={recurringDateLabel}
                    location={event.location}
                    locationLink={event.locationLink}
                    description={event.caption}
                    imageUrl={getWeeklyEventImageUrl(event)}
                    imageAlt={getWeeklyEventImageAlt(event)}
                    categoryLabel="Recurring"
                    tone="recurring"
                  />
                );
              })}
            </div>
          ) : (
            <p className="rounded-xl border border-base-300 bg-base-100 p-5 text-base-content/75">
              No recurring events published yet.
            </p>
          )}
        </div>
      ) : null}

      {activeTab === "past" ? (
        <div
          role="tabpanel"
          id="events-panel-past"
          aria-labelledby="events-tab-past"
        >
          <EventsListPanel
            events={pastEvents}
            emptyMessage="No past events yet."
            categoryLabel="Past"
            tone="past"
            showLink={false}
          />
        </div>
      ) : null}
    </section>
  );
}
