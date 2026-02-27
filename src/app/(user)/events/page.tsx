import {
  fetchEventsSettingsData,
  fetchPastEventsData,
  fetchUpcomingEventsData,
  fetchWeeklyEventsData,
} from "@/Utils/datafetcher";
import type { Event as EventDoc, WeeklyEvent } from "@/payload-types";
import EventsTabs from "@/components/UI/EventsTabs";
import { formatWeeklyTime, getWeeklyEventPrimaryImage } from "@/components/UI/events/events-utils";
import MemberSignup from "@/components/UI/MemberSignup";

const NEAR_RECURRING_WINDOW_HOURS = 24;
const ONE_HOUR_MS = 60 * 60 * 1000;
const ONE_DAY_MS = 24 * ONE_HOUR_MS;
const ONE_WEEK_MS = 7 * ONE_DAY_MS;

const DAY_TO_INDEX: Record<WeeklyEvent["day"], number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function getNextRecurringOccurrenceDate(weeklyEvent: WeeklyEvent, now: Date) {
  const timeStart = new Date(weeklyEvent.timeStart);
  if (Number.isNaN(timeStart.getTime())) return null;

  const targetDay = DAY_TO_INDEX[weeklyEvent.day];
  const candidate = new Date(now);
  const dayOffset = (targetDay - now.getDay() + 7) % 7;
  candidate.setDate(candidate.getDate() + dayOffset);
  candidate.setHours(timeStart.getHours(), timeStart.getMinutes(), 0, 0);

  if (candidate < now) {
    candidate.setDate(candidate.getDate() + 7);
  }

  if (!isDateInRecurrenceCycle(weeklyEvent, candidate)) {
    candidate.setDate(candidate.getDate() + 7);
  }
  if (!isDateInRecurrenceCycle(weeklyEvent, candidate)) return null;

  return candidate;
}

function startOfWeek(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - result.getDay());
  return result;
}

function isDateInRecurrenceCycle(weeklyEvent: WeeklyEvent, occurrenceDate: Date) {
  if (weeklyEvent.recurrence !== "biweekly") return true;
  if (!weeklyEvent.startDate) return false;

  const startDate = new Date(weeklyEvent.startDate);
  if (Number.isNaN(startDate.getTime())) return false;
  if (occurrenceDate.getTime() < startDate.getTime()) return false;

  const startWeek = startOfWeek(startDate).getTime();
  const occurrenceWeek = startOfWeek(occurrenceDate).getTime();
  const weeksBetween = Math.floor((occurrenceWeek - startWeek) / ONE_WEEK_MS);

  return weeksBetween % 2 === 0;
}

function buildNearRecurringAsUpcoming(weeklyEvents: WeeklyEvent[], now: Date): EventDoc[] {
  const maxMsAhead = NEAR_RECURRING_WINDOW_HOURS * ONE_HOUR_MS;

  return weeklyEvents.flatMap((weeklyEvent) => {
    const nextOccurrence = getNextRecurringOccurrenceDate(weeklyEvent, now);
    if (!nextOccurrence) return [];

    const msUntilStart = nextOccurrence.getTime() - now.getTime();
    if (msUntilStart < 0 || msUntilStart > maxMsAhead) return [];

    const recurrenceLabel = weeklyEvent.recurrence === "biweekly"
      ? "Biweekly"
      : "Recurring";

    return [{
      id: -weeklyEvent.id,
      name: `${weeklyEvent.name} (${recurrenceLabel})`,
      date: nextOccurrence.toISOString(),
      time: `${formatWeeklyTime(weeklyEvent.timeStart)} - ${formatWeeklyTime(weeklyEvent.timeEnd)}`,
      location: weeklyEvent.location,
      description: weeklyEvent.caption,
      image: getWeeklyEventPrimaryImage(weeklyEvent),
      link: null,
      status: "published",
      updatedAt: weeklyEvent.updatedAt,
      createdAt: weeklyEvent.createdAt,
    }];
  });
}

/**
 * Renders the Events page component.
 * @returns The rendered Events page component.
 */
export default async function EventsPage() {
  const [upcomingResult, weeklyResult, pastResult, settingsResult] = await Promise.allSettled([
    fetchUpcomingEventsData(),
    fetchWeeklyEventsData(),
    fetchPastEventsData(),
    fetchEventsSettingsData(),
  ]);

  const upcomingEventsFromEvents: EventDoc[] = upcomingResult.status === "fulfilled"
    ? upcomingResult.value
    : [];
  const weeklyEvents: WeeklyEvent[] = weeklyResult.status === "fulfilled"
    ? weeklyResult.value
    : [];
  const pastEvents: EventDoc[] = pastResult.status === "fulfilled"
    ? pastResult.value
    : [];
  const eventsMode = settingsResult.status === "fulfilled"
    ? settingsResult.value.mode
    : "auto";
  const quietMessage = settingsResult.status === "fulfilled"
    ? settingsResult.value.quietMessage
    : null;
  const hasEventsDataError = upcomingResult.status === "rejected"
    || weeklyResult.status === "rejected"
    || pastResult.status === "rejected";
  const now = new Date();
  const nearRecurringAsUpcoming = buildNearRecurringAsUpcoming(weeklyEvents, now);
  const upcomingEvents: EventDoc[] = [...upcomingEventsFromEvents, ...nearRecurringAsUpcoming]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const isQuietSeason = eventsMode === "quiet"
    ? true
    : !hasEventsDataError && upcomingEvents.length === 0 && weeklyEvents.length === 0;

  return (
    <main className="mt-16 flex-grow bg-base-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 sm:px-8 lg:py-16">
        <section className="space-y-2">
          <h1 className="text-center text-4xl font-bold text-primary">Events</h1>
          <p className="text-center text-sm text-base-content/75 sm:text-base">
            Upcoming, recurring, and past events in one place.
          </p>
        </section>
        {hasEventsDataError ? (
          <section className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm text-base-content/85">
            Some events are temporarily unavailable right now. Please refresh in a few minutes.
          </section>
        ) : null}
        {eventsMode !== "quiet" ? (
          <EventsTabs
            upcomingEvents={upcomingEvents}
            weeklyEvents={weeklyEvents}
            pastEvents={pastEvents}
          />
        ) : null}

        {isQuietSeason ? (
          <section className="space-y-4 pt-2">
            <div className="text-center">
              <p className="text-sm text-base-content/80 sm:text-base">
                {quietMessage?.trim()
                  || "Summer schedule is lighter right now. Join updates and we will notify you when major events return."}
              </p>
            </div>
            <div className="mx-auto w-full max-w-2xl">
              <MemberSignup />
            </div>
          </section>
        ) : (
          <section className="space-y-4 pt-2">
            <div className="text-center">
              <p className="text-sm text-base-content/80 sm:text-base">
                Want reminders about new events? Join updates below.
              </p>
            </div>
            <div className="mx-auto w-full max-w-2xl">
              <MemberSignup />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
