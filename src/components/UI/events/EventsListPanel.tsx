import type { Event as EventDoc } from "@/payload-types";
import { getEventDateLabel, getEventImageAlt, getEventImageUrl } from "./events-utils";
import EventListCard from "./EventListCard";

interface EventsListPanelProps {
  events: EventDoc[];
  emptyMessage: string;
  categoryLabel: string;
  tone: "upcoming" | "past";
  showLink?: boolean;
}

export default function EventsListPanel({
  events,
  emptyMessage,
  categoryLabel,
  tone,
  showLink = true,
}: EventsListPanelProps) {
  return (
    <div className="space-y-4">
      {events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event) => (
            <EventListCard
              key={event.id}
              title={event.name}
              dateLabel={getEventDateLabel(event)}
              location={event.location}
              locationLink={showLink ? event.locationLink : null}
              description={event.description}
              imageUrl={getEventImageUrl(event)}
              imageAlt={getEventImageAlt(event)}
              link={showLink ? event.link : null}
              categoryLabel={categoryLabel}
              tone={tone}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-base-300 bg-base-100 p-5 text-base-content/75">
          {emptyMessage}
        </p>
      )}
    </div>
  );
}
