// pages/events.tsx
import React from "react";
import CalendarComponent from "~/components/UI/CalenderComponent";

const Events = () => {
  return (
    <div className=" min-h-screen ">
     

      <div className="flex flex-col py-10">
        <CalendarComponent />
        <div className="mt-4 text-center">
          <a
            href="https://calendar.google.com/calendar/u/1?cid=ZmZhZWUwMTExMjBmYWIzOTZjNDBjZWY1NWUyYjA0OTY5NmEzYTUwYmNhMzIyOWE1MDAwMjM2ODQ1MTc5OTU5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10"
          >
            <button className="btn border-0 bg-primary text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
              Add to your calendar
            </button>
          </a>
        </div>
      </div>
     
    </div>
  );
};

export default Events;
