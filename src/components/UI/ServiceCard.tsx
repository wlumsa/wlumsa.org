import React from "react";
import Image from "next/image";

import { format } from 'date-fns';
import { IiaService } from "@/payload-types";
interface ServicesProps {
  services: IiaService[];
}
const Service: React.FC<ServicesProps> = ({ services }) => {

  const image = services[0]?.image[0];

  return (
    <div id="services" className="flex-grow min-h-screen px-6 items-center">
      {services.map((service, index) => (
        <div className="hero h-fit bg-base-100 px-4" key={index}>
          <div
            className={`hero-content flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } lg:gap-32`}
          >
            <div className="relative h-80 w-full lg:w-[500px] flex-grow">
              <Image
                src={typeof service.image[0] === 'object' ?  service.image[0].url || '/path/to/default/image.jpg' : ''}
                alt="Event Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-2xl"
                key={index}
              />
            </div>
            <div className="max-w-md md:px-8 lg:max-w-xl flex-grow">
              <h3 className="pt-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105 lg:pt-0" key={index}>
                {service.name}
              </h3>
              <p className="py-6 text-neutral text-center" key={index}>{service.caption}</p>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Service;
