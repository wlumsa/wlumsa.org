import React from 'react';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
const EventsPage: React.FC = () => {
  return (
    <div className="">
      <Navbar/>
      <div className='mt-32 md:p-8 flex flex-col'>
        <div className="container mx-auto bg-base-200">
          <div className=" rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-primary mb-4">
              Upcoming Events
            </h1>
            <div className="bg-white rounded-lg overflow-hidden shadow ">
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FToronto&showTitle=0&showNav=0&showPrint=0&showTabs=0&showCalendars=1&showTz=1&mode=MONTH&src=ZmZhZWUwMTExMjBmYWIzOTZjNDBjZWY1NWUyYjA0OTY5NmEzYTUwYmNhMzIyOWE1MDAwMjM2ODQ1MTc5OTU5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%232e046d"
                style={{ border: 0 }}
                height="600"
                width="100%"
                className='w-full'

              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default EventsPage;
