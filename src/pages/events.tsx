// pages/events.tsx
import React from 'react'; 
import CalendarComponent from "~/components/CalenderComponent";
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';


const Events = () => {
  return (
    <div className=" min-h-screen "> 
      <Navbar/>
    
      <div className="py-10 flex flex-col">
        
        <CalendarComponent />
        <div className="text-center mt-4">
          <a
            href="https://calendar.google.com/calendar/u/1?cid=ZmZhZWUwMTExMjBmYWIzOTZjNDBjZWY1NWUyYjA0OTY5NmEzYTUwYmNhMzIyOWE1MDAwMjM2ODQ1MTc5OTU5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10"
          >
            <button className="btn text-secondary bg-primary hover:bg-secondary hover:text-primary border-0 shadow hover:scale-105 duration-200">
              Add to your calendar
            </button>
          </a>
        </div>
      </div>
    <Footer/>
    </div>
  );
};

export default Events;
