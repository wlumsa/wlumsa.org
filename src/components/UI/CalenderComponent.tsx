"use client";
import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/common/main.css";

// Define the event type
type Event = {
  id: string;
  title: string;
  start: string;
  end?: string;
  color?: string; // Optional property for custom background color
};

const CalendarComponent = () => {
  const [events, setEvents] = useState<Event[]>([{
    id: '1',
    title: 'Hanafi Fiqh Course',
    start: '2024-02-24',
    color: '#ADD8E6', // Light blue
  }]);
  const [isEventClicked, setIsEventClicked] = useState<boolean>(false);
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    // Normally, you would fetch events from an API here.
    // For simplicity, we're using a hardcoded event.
  }, []);

  const handleEventClick = () => {
    // Handler for when an event is clicked
    setIsEventClicked(true);
  };

  const renderEventContent = (eventInfo: any) => (
    <div style={{ padding: '2px 5px', borderRadius: '5px', backgroundColor: eventInfo.backgroundColor || '#ADD8E6' }}>
      {eventInfo.event.title}
    </div>
  );

  const EventDetailsPanel = () => (
    <div style={{
      position: 'fixed',
      right: 0,
      top: 0,
      width: '33%',
      height: '100vh',
      backgroundColor: '#f9f9f9',
      boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
      padding: '20px',
      overflowY: 'auto',
      zIndex: 1000, // Ensure it's above other content
    }}>
      <h2>Hanafi Fiqh Course</h2>
      {/* Example content, replace with actual event details */}
      <p>Location: Community Center</p>
      <p>Time: 10:00 AM - 3:00 PM</p>
      <p>Speaker: Sheikh Abdullah</p>
      <p>Description: An in-depth course on Hanafi Fiqh.</p>
      {/* Placeholder for the image */}
      <div style={{ backgroundColor: '#ddd', height: '200px', margin: '20px 0' }}>Event Image Here</div>
      <button onClick={() => setIsEventClicked(false)} style={{ padding: '10px', cursor: 'pointer' }}>Close</button>
    </div>
  );

  return (
    <div className="container mx-auto p-10">
      {isEventClicked && <EventDetailsPanel />}
      <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  );
};

export default CalendarComponent;
