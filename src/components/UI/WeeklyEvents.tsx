import React from "react";
import Image from "next/image";

import Link from "next/link";
import BlurFade from "./BlurFade";
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
          image={
            typeof event.image[0] === "object"
              ? event.image[0].url || "/path/to/default/image.jpg"
              : ""
          }
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
  compact?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  name,
  image,
  timeLocation,
  caption,
  index,
  link,
  ctaText,
  compact = false,
}) => {
  const isExternal = Boolean(link && /^https?:\/\//.test(link));

  return (
    <BlurFade
      delay={index * 0.1}
      duration={0.34}
      blur="3px"
      yOffset={6}
      inView={true}
    >
      <>
        <article className="rounded-2xl border border-base-300 bg-base-100 p-3 md:p-4 lg:hidden">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-base-300">
              <Image
                src={image || "/path/to/default/image.jpg"}
                alt={`${name} image`}
                fill
                sizes="100vw"
                className="rounded-lg object-cover"
                priority={index < 2}
              />
            </div>
            <div className="w-full">
              <h3
                className={`font-heading font-bold text-primary ${
                  compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
                }`}
              >
                {name}
              </h3>
              <p className="font-body mt-2 text-sm font-semibold text-base-content/75 md:text-base">
                {timeLocation}
              </p>
              <p className="font-body mt-3 text-sm leading-relaxed text-base-content/75 md:text-base">
                {caption}
              </p>
              {link ? (
                <Link
                  href={link}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="btn btn-primary mt-4 w-full text-secondary sm:w-auto"
                >
                  {ctaText || "Learn More"}
                </Link>
              ) : null}
            </div>
          </div>
        </article>

        <div className="hero hidden h-fit bg-base-100 px-4 lg:block">
          <div
            className={`hero-content flex-col items-start justify-start ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } ${compact ? "lg:gap-10" : "lg:gap-16"}`}
          >
            <div
              className={`relative w-full flex-grow ${
                compact ? "h-64 lg:w-[420px]" : "h-80 lg:w-[500px]"
              }`}
            >
              <Image
                src={image || "/path/to/default/image.jpg"}
                alt={`${name} image`}
                fill
                sizes="500px"
                className="rounded-lg border border-base-300 object-cover"
                priority={index < 2}
              />
            </div>
            <div
              className={`max-w-md flex-grow ${
                compact ? "lg:max-w-[480px]" : "lg:max-w-[500px]"
              }`}
            >
              <h3
                className={`font-heading pt-2 font-bold text-primary lg:pt-1 ${
                  compact ? "text-2xl" : "text-3xl"
                }`}
              >
                {name}
              </h3>
              <p className="font-body mt-2 text-base font-semibold text-base-content/75">
                {timeLocation}
              </p>
              <p
                className={`font-body leading-relaxed text-base-content/75 ${
                  compact ? "py-3 text-sm" : "py-4"
                }`}
              >
                {caption}
              </p>
              {link ? (
                <Link
                  href={link}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="btn btn-primary mt-2 w-full text-secondary"
                >
                  {ctaText || "Learn More"}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </>
    </BlurFade>
  );
};
