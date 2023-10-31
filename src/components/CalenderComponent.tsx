import { useEffect, useState, useRef } from 'react';

import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import { EventContentArg } from '@fullcalendar/common';
import '@fullcalendar/common/main.css';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

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
  recurring?: boolean;
};

const CalendarComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (calendarRef.current) {
        if (window.innerWidth <= 480) {
          calendarRef.current.getApi().changeView("dayGridDay");
        } else {
          calendarRef.current.getApi().changeView("dayGridMonth");
        }
      }
    };
    
    

    // Set the initial view based on window width
    handleResize();

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    const fetchEvents = async () => {
      const res = await fetch('/api/calendar');
      const data: FetchedEvent[] = await res.json();
      
      const formattedEvents: Event[] = data.map((event: FetchedEvent) => ({
        id: event.id,
        title: event.summary,
        start: event.start.dateTime,
      }));

      setEvents(formattedEvents);
    };
    fetchEvents();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return (
    <div className="container mx-auto text-xs p-10">
      <div>
        <h3 className="text-xl font-bold">Upcoming Events</h3>
        <FullCalendar
            ref={calendarRef} // Set the reference here
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            googleCalendarApiKey= "AIzaSyAD66ZFXJgMoKiZTkZUOCG9pFS459R40SI"
            events={{ googleCalendarId: "ffaee011120fab396c40cef55e2b049696a3a50bca3229a50002368451799595@group.calendar.google.com" }}
            eventContent = {renderEventContent}
        />
      </div>
    </div>

  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const now = new Date();
  const eventDate = new Date(eventInfo.event.startStr);
  const isPastEvent = eventDate < now;

  const bgColorClass = isPastEvent ? 'bg-red-500' : 'bg-green-500';
  const textColorClass = 'text-white';

  const startTime = eventDate.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedTitle = eventInfo.event.title.split('|').join('<br />');

  return (
    <div className={`p-1 overflow-hidden ${bgColorClass} ${textColorClass}`}>
      <div><b>{startTime}</b></div>
      <div dangerouslySetInnerHTML={{ __html: formattedTitle }}></div>
    </div>
  );
};

export default CalendarComponent;
