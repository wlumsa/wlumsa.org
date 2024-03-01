"use client"
import React, { useEffect, useState } from "react";
import Head from "next/head";

type ExtendedStyle = React.CSSProperties & {
  "--value"?: string;
};

export default function RamadanPage() {
  const [year, setYear] = useState(0);
  const [sadaqah, setSadaqah] = useState(0);
  const [meals, setMeals] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (year < 2021) setYear(year + 1);
      if (sadaqah < 68300) setSadaqah(sadaqah + 100);
      if (meals < 986) setMeals(meals + 1);
    }, 1);

    return () => clearInterval(interval);
  }, [year, sadaqah, meals]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 ">
      <Head>
        <title>Ramadan 2024</title>
      </Head>
      <main className="flex-grow">
        <div className="flex w-full flex-col items-center">
          <h1 className="mb-5 mt-28 text-4xl font-bold text-[#203B5D]">
            RAMADAN 2024
          </h1>
          <div className="my-4 flex w-full flex-col items-center justify-around bg-[#203B5D] p-4 shadow-lg sm:flex-row sm:p-12">
            <div className="mb-4 text-center sm:mx-2 sm:mb-0">
              <span className="text-2xl font-semibold text-[#2474A3] sm:text-4xl">
                {year}
              </span>
              <p className="mt-2 text-xs text-white">ESTABLISHED</p>
            </div>
            <div className="mb-4 text-center sm:mx-2 sm:mb-0">
              <span className="text-2xl font-semibold text-[#2474A3] sm:text-4xl">
                {sadaqah.toLocaleString()}
              </span>
              <p className="mt-2 text-xs text-white">$ OF SADAQAH RAISED</p>
            </div>
            <div className="text-center sm:mx-2">
              <span className="text-2xl font-semibold text-[#2474A3] sm:text-4xl">
                {meals}
              </span>
              <p className="mt-2 text-xs text-white">MEALS SERVED</p>
            </div>
          </div>
          <div className="mx-4 flex flex-col items-center">
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
          <div className="mx-4 flex flex-col items-center">
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
          {/*
          <div className="mx-4 flex flex-col items-center">
            <h1 className="mb-10 mt-32 text-3xl font-bold text-[#203B5D] ">
              SPONSOR DAILY IFTARS
            </h1>
            <p className="mb-4 font-bold text-[#2474A3]">Help us, Help you.</p>
            <p>
              {" " }
              sponsor a daily iftar to students on campus that don't have the
              resources to break their fast.
            </p>
            <button className=" my-4 rounded-lg bg-[#2474A3] px-8 py-2  text-white">
              SPONSOR
            </button>
          </div>
              */}
          <div className="mx-4 mb-20 flex flex-col items-center">
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
                      fill="#2474A3"
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
                <hr className="bg-[#2474A3]" />
              </li>
              <li>
                <hr className="bg-[#2474A3]" />
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
                      fill="#2474A3"
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
                <hr className="bg-[#2474A3]" />
              </li>
              <li>
                <hr className="bg-[#2474A3]" />
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
                      fill="#2474A3"
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
                <hr className="bg-[#2474A3]" />
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