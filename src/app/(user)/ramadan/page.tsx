"use client"
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
    <div className="flex flex-col min-h-screen ">
   
      <Head>
        <title>Countdown to March 10</title>
      </Head>
      <main className="flex-grow">
        <div className="mb-20 mt-40 flex flex-grow flex-col items-center justify-center ">
          <h1 className="font-sans text-xl font-bold  text-primary md:text-5xl">
            Coming Soon Inshallah!
          </h1>
          <h2 className="font-sans text-lg font-bold  text-secondary md:text-3xl">
            Ramdan Countdown
          </h2>
        </div>
        <div className="my-10 grid auto-cols-max grid-flow-col justify-center gap-5 text-center">
          <div className="flex flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": `${days}` } as ExtendedStyle}>
                {days}
              </span>
            </span>
            days
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": `${hours}` } as ExtendedStyle}>
                {hours}
              </span>
            </span>
            hours
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": `${minutes}` } as ExtendedStyle}>
                {minutes}
              </span>
            </span>
            min
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": `${seconds}` } as ExtendedStyle}>
                {seconds}
              </span>
            </span>
            sec
          </div>
        </div>
      </main>
   
    </div>
  );
};
