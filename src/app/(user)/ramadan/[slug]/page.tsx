
import React, { useEffect, useState } from "react";
import RamadanInfo from "@/components/UI/RamadanInfo";
import Image from "next/image";
import Link from "next/link";
import PrayerSpaceCard from "@/components/UI/PrayerSpaceCard";

type Params = Promise<{ slug: string }>

export const metadata = {
  title: "Ramadan 2024",
  description: "Ramadan information, prayer times, and resources for WLU MSA"
};

export default async  function RamadanPage(props:{
    params:Params
}  ) {
const params = await props.params
const slug = params.slug


  return (
    <div className="flex min-h-screen flex-col ">
      <main className="flex-grow">
        <div className="flex w-full flex-col items-center">
          <h1 className="mb-5 mt-28 text-4xl font-bold text-[#203B5D]">
            RAMADAN 2024
          </h1>
          <div className="my-4 flex w-full items-center justify-around bg-[#203B5D] p-4 shadow-lg sm:p-12">
          <RamadanInfo  />
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
          </div>
          </main>
          </div>

            );
            }

