"use client"
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PrayerSpaceCard from "@/components/PrayerSpaceCard";
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
      if (meals < 3000) setMeals(meals + 1);
    }, 1);

    return () => clearInterval(interval);
  }, [year, sadaqah, meals]);

  return (
    <div className="flex min-h-screen flex-col ">
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
                {meals}+
              </span>
              <p className="mt-2 text-xs text-white">MEALS SERVED</p>
            </div>
          </div>
          <div className="mx-4 flex flex-col items-center">
            <h1 className="mb-10 mt-32 text-xl md:text-3xl font-bold text-[#203B5D]">
              DONATE THIS RAMADAN
            </h1>
            <p className=" text-center">
              Contribute to our notable goal of raising $25000 for the Gaza Emergency Response
            </p>
            <Link href='http://LaunchGood.com/WLUGaza' target="_blank">
            <button className="my-4 rounded-lg bg-[#203B5D] px-8 py-2 font-bold text-white">
              Donate
            </button>
            </Link>
          </div>

          {
            <div className="mx-4 flex flex-col items-center text-center">
              <h1 className="mb-4 mt-32 text-3xl font-bold text-[#203B5D] ">
                Register for free Iftar
              </h1>
              <p className="mb-4 font-bold text-xl text-[#2474A3]">Free iftars on campus</p>
              <p >
                {" "}
                Inshallah we will be giving out free iftars everday Monday - Friday in <Link href="#prayerlocations" className="underline">PMC</Link>. Registration is mandatory click the button below for more info
              </p>
              <Link href='https://docs.google.com/forms/d/1wa1rcim8VSwiqq6heLcV7zoEFh2MDMiAgD5xcdhfPBk' target="_blank">
              <button className=" my-4 rounded-lg bg-[#203B5D] px-8 py-2 font-bold text-white">
                Register here
              </button>
              </Link>
            </div>

          }
          <div className="mx-4 flex flex-col items-center text-center">
            <h1 className="mb-2 mt-32 text-3xl font-bold text-[#203B5D]">
              Ramadan Prayer Table
            </h1>
            <p className="mb-4">A prayer table for all your needs print your own or download <Link href="/ramadan_schdules.pdf" target="_blank" className="underline">here</Link> </p>
            <div className="rounded-lg bg-[#203B5D] p-4">
              <Image src='https://firebasestorage.googleapis.com/v0/b/wlumsa-web.appspot.com/o/images%2FRamadan%20Schedule%20MSA%20(1).png?alt=media&token=754c7c81-7f98-4ee5-b8bf-d03da80d6391' width={966} height={1250} alt="prayer table" />
            </div>


          </div>
          <div className="mx-4 flex flex-col items-center">
            <h1 className="mb-2 mt-12 text-3xl font-bold text-[#203B5D]">
              Ramadan Checklist
            </h1>
            <p className="mb-4 font-bold text-xl text-[#2474A3]">Build a habit this Ramadan</p>
            <p className="mb-4 text-center">"The most beloved deed to Allah is the most regular and constant even if it were little." - <Link className="underline" target="_blank" href="https://sunnah.com/bukhari:6464">Bukhari 6465</Link></p>
            <div className="rounded-lg bg-[#203B5D] p-4">
              <Image src='https://firebasestorage.googleapis.com/v0/b/wlumsa-web.appspot.com/o/images%2FRamadan%20Checklist%20(US%20Letter%20(Landscape)).png?alt=media&token=89990175-ccc8-45e4-8f5c-f2dcacab24be' width={1250} height={966} alt="ramadan checklist" />
            </div>
            <Link href="/ramadan_schdules.pdf" target="_blank">
            <button id="download" className="my-4 rounded-lg bg-[#203B5D] px-8 py-2 font-bold text-white">
              Download
            </button>
            </Link>
          </div>

          <h1 className="mb-4 mt-12 text-3xl font-bold text-[#203B5D]">
            Prayer Rooms
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-4" id="prayerlocations">

            <PrayerSpaceCard
              videoId="XQALLoF6Buo"
              title="Bricker Prayer Room"
              thumbnailUrl="https://img.youtube.com/vi/XQALLoF6Buo/maxresdefault.jpg"
            />
            <PrayerSpaceCard
              videoId="xnGcNytQNxQ"
              title="PMC (Iftars & Tarawih)"
              thumbnailUrl="https://img.youtube.com/vi/xnGcNytQNxQ/maxresdefault.jpg"
            />
            <PrayerSpaceCard
              videoId="BeT9uC4NBPw"
              title="Peters Prayer Room"
              thumbnailUrl="https://img.youtube.com/vi/BeT9uC4NBPw/maxresdefault.jpg"
            />
          </div>
          {/* 
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
           */}
        </div>

      </main>
    </div>
  );
}