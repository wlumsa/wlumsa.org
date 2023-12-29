import React from "react";
import Image from "next/image";

interface EventsProps {
  events: {
    day: string;
    desc: string;
    img: string;
    name: string;
    room: string;
    time: string;
  }[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
  return (
    <div id="events" className="flex-grow" >
      {events.map((event, index) => (
        <div className="hero h-fit bg-base-100 px-4" key={index}>
          <div
            className={`hero-content flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } lg:gap-32`}
          >
            <div className="relative h-80 w-full lg:w-[500px] flex-grow">
              <Image
                src={event.img}
                alt="Event Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-2xl"
                
              />
            </div>
            <div className="max-w-md px-8 lg:max-w-xl flex-grow">
              <h3 className="pt-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105 lg:pt-0" >
                {event.name}
              </h3>
              <p className="py-6 text-neutral " >{event.desc}</p>
              <p className="font-bold text-neutral" >
                {event.day} @ {event.time} in {event.room}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;