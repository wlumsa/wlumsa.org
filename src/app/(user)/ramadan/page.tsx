"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";

type ExtendedStyle = React.CSSProperties & {
  "--value"?: string;
};

export default function RamadanPage() {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const targetDate = new Date(new Date().getFullYear(), 2, 10);
    if (new Date() > targetDate) {
      targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 ">
      <Head>
        <title>Ramadan 2024</title>
      </Head>
      <main className="flex-grow">
        <div className="flex flex-col items-center w-full">
          {/*Ramadan Heading*/}
          <h1 className="mb-5 mt-28 text-4xl font-bold text-[#203B5D]">
            RAMADAN 2024
          </h1>

          {/* Stats */}
<div className="my-4 flex flex-col sm:flex-row w-full items-center justify-around bg-[#203B5D] p-4 sm:p-12 shadow-lg">
  <div className="text-center mb-4 sm:mb-0 sm:mx-2">
    <span className="text-2xl sm:text-4xl font-semibold text-[#2474A3]">
      2021
    </span>
    <p className="mt-2 text-xs text-white">ESTABLISHED</p>
  </div>
  <div className="text-center mb-4 sm:mb-0 sm:mx-2">
    <span className="text-2xl sm:text-4xl font-semibold text-[#2474A3]">
      68,306
    </span>
    <p className="mt-2 text-xs text-white">$ OF SADAQAH RAISED</p>
  </div>
  <div className="text-center sm:mx-2">
    <span className="text-2xl sm:text-4xl font-semibold text-[#2474A3]">
      986
    </span>
    <p className="mt-2 text-xs text-white">MEALS SERVED</p>
  </div>
</div>


          {/*Donation Section*/}
          <div className="flex flex-col items-center mx-4">
            <h1 className="mb-10 mt-32 text-3xl font-bold text-[#203B5D]">
              DONATE THIS RAMADAN
            </h1>
            <p>
              Contribute to our notable goal of raising $$$ for [cause of
              fundraiser]
            </p>
            <button className=" my-4 rounded-lg bg-[#203B5D] px-8 py-2 font-bold text-white">
              DONATE
            </button>
          </div>

     {/* Iftar Food Registration */}
<div className="flex flex-col items-center mx-4">
  <h1 className="mb-2 mt-32 text-3xl font-bold text-[#203B5D]">
    IFTAR FOOD REGISTRATION
  </h1>
  <p className="mb-4">Description of how registration works</p>

  <div className="rounded-lg bg-[#203B5D] p-4">
    <input
      className="mb-2 w-full rounded border-2 border-gray-200 p-2"
      placeholder="Name"
    />
    <input
      className="mb-2 w-full rounded border-2 border-gray-200 p-2"
      placeholder="Email"
    />
    <input
      className="mb-4 w-full rounded border-2 border-gray-200 p-2"
      placeholder="Iftar Dates"
    />
    <button className="mx-auto my-4 block rounded-lg bg-[#2474A3] px-8 py-2  text-white">
      REGISTER
    </button>
  </div>
</div>


          {/* Daily Iftars */}
          <div className="flex flex-col items-center mx-4">
            <h1 className="mb-10 mt-32 text-3xl font-bold text-[#203B5D] ">
              SPONSOR DAILY IFTARS
            </h1>
            <p className="mb-4 font-bold text-[#2474A3]">Help us, Help you.</p>
            <p>
              {" "}
              sponsor a daily iftar to students on campus that don't have the
              resources to break their fast.
            </p>
            <button className=" my-4 rounded-lg bg-[#2474A3] px-8 py-2  text-white">
              SPONSOR
            </button>
          </div>

          {/* RAMADAN CHALLENGE TIMELINE*/}
          <div className="flex flex-col items-center mb-20 mx-4">
            <h1 className="mb-20 mt-32 text-3xl font-bold text-[#203B5D] ">
              RAMADAN CHALLENGES
            </h1>

            <ul className="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
              <li>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                      fill = "#2474A3" 
                    />
                  </svg>
                </div>
                <div className="timeline-start mb-10 md:text-end">
                  <div className="mx-10">
                    <h1 className="text-lg font-bold text-[#203B5D]">
                      $$$ MILESTONE CHALLENGE
                    </h1>
                    <p>Short Description of Challenge</p>
                  </div>
                </div>
                <hr className="bg-[#2474A3]"/>
              </li>
              <li>
                <hr className="bg-[#2474A3]"/>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                      fill = "#2474A3" 
                    />
                  </svg>
                </div>
                <div className="timeline-end mb-10">
                  <div className="mx-10">
                    <h1 className="text-lg font-bold text-[#203B5D]">
                      $$$ MILESTONE CHALLENGE
                    </h1>
                    <p>Short Description of Challenge</p>
                  </div>
                </div>
                <hr className="bg-[#2474A3]"/>
              </li>
              <li>
                <hr className="bg-[#2474A3]"/>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                      fill = "#2474A3" 
                    />
                  </svg>
                </div>
                <div className="timeline-start mb-10 md:text-end">
                  <div className="mx-10">
                    <h1 className="text-lg font-bold text-[#203B5D]">
                      $$$ MILESTONE CHALLENGE
                    </h1>
                    <p>Short Description of Challenge</p>
                  </div>
                </div>
                <hr className="bg-[#2474A3]"/>
              </li>
              <li>
                <hr/>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="timeline-end mb-10">
                  <div className="mx-10">
                    <h1 className="text-lg font-bold text-[#203B5D]">
                      $$$ MILESTONE CHALLENGE
                    </h1>
                    <p>Short Description of Challenge</p>
                  </div>
                </div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="timeline-start mb-10 md:text-end">
                  <div className="mx-10">
                    <h1 className="text-lg font-bold text-[#203B5D]">
                      $$$ MILESTONE CHALLENGE
                    </h1>
                    <p>Short Description of Challenge</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
