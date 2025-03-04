import React from "react";
import Image from "next/image";

import Link from "next/link";
import BlurFade from "./BlurFade";
import { format } from 'date-fns';
import { WeeklyEvent } from "@/payload-types";
interface WeeklyEventsProps {
  events: WeeklyEvent[];
}
export const WeeklyEvents: React.FC<WeeklyEventsProps> = ({ events }) => {
  return (
    <div id="events" className="flex-grow">
      {events.map((event, index) => (
        <EventCard
          key={index}
          name={event.name}
          image={typeof event.image[0] === 'object' ? event.image[0].url || '/path/to/default/image.jpg' : ''}
          timeLocation={`${event.day} @ ${event.timeStart} to ${event.timeEnd} in ${event.location}`}
          caption={event.caption}
          index={index}

        />
      ))}
    </div>
  );
};



interface EventCardProps {
  name: string;
  image: string;
  timeLocation: string;
  caption: string;
  index: number;
  link?: string;
  ctaText?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ name, image, timeLocation, caption, index, link, ctaText }) => {
  return (
    <BlurFade delay={index * 0.25} inView={true}>
      <div className="hero h-fit bg-base-100 px-4">
        <div className={`hero-content flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} lg:gap-32 items-start justify-start`}>
          <div className="relative h-80 w-full lg:w-[500px] flex-grow">
            <Image
              src={image || '/path/to/default/image.jpg'}
              alt="Event Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg border border-primary"
            />
          </div>
          <div className="max-w-md lg:max-w-[500px] flex-grow">
            <h3 className="pt-4 text-3xl font-bold text-primary duration-200 hover:scale-105 lg:pt-0">
              {name}
            </h3>
            <p className="py-6 text-neutral">{caption}</p>
            <p className="font-bold text-neutral">
              {timeLocation}
            </p>
            {link && (
              <Link href={link} target="_blank">
                <button className="btn btn-primary text-secondary mt-4 w-full">{ctaText || "Learn More"}</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </BlurFade>
  );
};
