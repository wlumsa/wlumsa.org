import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventContentArg } from '@fullcalendar/common';
import '@fullcalendar/common/main.css';

type Event = {
  id: string;
  title: string;
  start: string;
};

type FetchedEvent = {
  id: string;
  summary: string;
  start: { dateTime: string };
};

const CalendarComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/calendar');
      const data: FetchedEvent[] = await res.json();
      const formattedEvents = data.map((event: FetchedEvent) => ({
        id: event.id,
        title: event.summary,
        start: event.start.dateTime,
      }));
      setEvents(formattedEvents);
      const nextWeekEvents = getNextWeekEvents(formattedEvents);
      setUpcomingEvents(nextWeekEvents);
    };
    fetchEvents();
  }, []);

  const getNextWeekEvents = (allEvents: Event[]) => {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return allEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate > now && eventDate < nextWeek;
    });
  };

  return (
    <div className="container mx-auto text-xs p-10">
      <div className="hidden sm:block"> {/* Calendar is hidden on small screens */}
      <h3 className="text-xl font-bold">Upcoming Events</h3>
      <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'title',
            right: 'today,prev,next'
          }}
          
          eventContent={renderEventContent}
          height='auto'
        />

      </div>
      {/* mobile */}
      <div className="block sm:hidden bg-primary text-secondary p-2 rounded-lg">
        <h3 className="text-xl font-bold">Upcoming Events:</h3>
        {upcomingEvents.map(event => (
          <div key={event.id} className="p-2 ">
            <strong>{event.title}</strong> - {new Date(event.start).toLocaleDateString()}
          </div>
        ))}
      </div>
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  const startTime = new Date(eventInfo.event.startStr).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const formattedTitle = eventInfo.event.title.replace(/\|/g, '<br />'); // Replace all occurrences of '|' with a newline
  
  return (
    <div className="p-1 overflow-hidden">
      <div><b>{startTime}</b></div>
      <div dangerouslySetInnerHTML={{ __html: formattedTitle }}></div> 
    </div>
  );
};



export default CalendarComponent;
