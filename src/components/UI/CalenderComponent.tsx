"use client";
import { useEffect, useState, useRef } from "react";

import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";
import { EventContentArg } from "@fullcalendar/common";
import "@fullcalendar/common/main.css";
import googleCalendarPlugin from "@fullcalendar/google-calendar";



type Event = {
  id: string;
  title: string;
  start: string;
  end?: string;
  recurring?: boolean;
};

type FetchedEvent = {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
  recurring?: boolean;
};

/**
 * CalendarComponent is a component that displays upcoming events using FullCalendar.
 * FullCalendar is a JavaScript event calendar that is used to display events in a calendar format.
 * More info on FullCalendar can be found here: https://fullcalendar.io/
 */
const CalendarComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    /**
     * handleResize is a function that handles the resizing of the calendar based on the window width.
     */
    const handleResize = () => {
      if (calendarRef.current) {
        if (window.innerWidth <= 480) {
          calendarRef.current.getApi().changeView("dayGridWeek");
        } else {
          calendarRef.current.getApi().changeView("dayGridMonth");
        }
      }
    };

    // Set the initial view based on window width
    handleResize();

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    /**
     * fetchEvents is an asynchronous function that fetches events from the server and sets them in the state.
     */
    const fetchEvents = async () => {
      const res = await fetch("/api/calendar");
      const data: FetchedEvent[] = await res.json();

if (Array.isArray(data)) {
  const formattedEvents: Event[] = data.map((event: FetchedEvent) => ({
    id: event.id,
    title: event.summary,
    start: event.start ? event.start.dateTime : 'default-date',
    end: event.end ? event.end.dateTime : 'default-date',
  }));
  setEvents(formattedEvents);
  fetchEvents();
} 

};

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto p-10 text-xs">
      <div>
        <h3 className="text-xl font-bold">Upcoming Events</h3>
        <FullCalendar
          ref={calendarRef} // Set the reference here
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          googleCalendarApiKey="AIzaSyAD66ZFXJgMoKiZTkZUOCG9pFS459R40SI"
          events={{
            googleCalendarId:
              "c_a7b0881ec9f4b1f326560c3e89616406d4b28318abca3a01a7bce0ab92aed3e1@group.calendar.google.com",
          }}
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const now = new Date();
  const eventDate = new Date(eventInfo.event.startStr);
  const eventDateEnd = new Date(eventInfo.event.endStr);
  const isPastEvent = eventDate < now;

  const bgColorClass = isPastEvent ? "bg-red-500" : "bg-[#5636a7]";
  const textColorClass = "text-white";

  const startTime = eventDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = eventDateEnd.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedTitle = eventInfo.event.title.split("-").join("<br />");

  return (
    <div className={`p-1 ${bgColorClass} ${textColorClass} min-w-0 flex-shrink-1`}>
      <div className="text-sm">
        <b>{startTime}</b>
        <b>-</b>
        <b>{endTime}</b>
      </div>{" "}
      {/* Adjusted text size */}
      <div
        className="flex-shrink-1"
        dangerouslySetInnerHTML={{ __html: formattedTitle }}
      ></div>
      {/* Adjusted text size */}
    </div>
  );
};

export default CalendarComponent;