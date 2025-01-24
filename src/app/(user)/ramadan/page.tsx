"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CountdownPage() {
  const ramadanStartDate = new Date("2025-02-28T00:00:00"); 
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = ramadanStartDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-blue-100 to-blue-50 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/ramadan-pattern.png')] bg-cover opacity-10"></div>
      <h1 className="text-4xl font-sans font-bold text-primary mb-4 z-10">Countdown to Ramadan 2025</h1>
      <p className="mb-6 text-lg font-sans text-neutral z-10">
        The blessed month of Ramadan is approaching! Countdown to its start:
      </p>

      <div className="flex space-x-6 text-3xl font-sans font-semibold text-secondary z-10">
        <div className="flex flex-col items-center">
          <span className="text-5xl">{timeLeft.days}</span>
          <span className="text-sm text-accent">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl">{timeLeft.hours}</span>
          <span className="text-sm text-accent">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl">{timeLeft.minutes}</span>
          <span className="text-sm text-accent">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl">{timeLeft.seconds}</span>
          <span className="text-sm text-accent">Seconds</span>
        </div>
      </div>

      <div className="mt-10 space-y-4 z-10">
      <Link href="/ramadan2024">
  <button
    className="px-8 py-3 bg-gradient-to-r from-secondary to-warning text-neutral font-bold font-sans rounded-lg shadow-md hover:from-warning hover:to-secondary hover:text-base-100 transition-transform transform hover:scale-105 ease-in-out duration-300"
  >
    Go to Ramadan 2024 Page
  </button>
  </Link>

<Link href="/prayerinfo">
  <button
    className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-base-100 font-bold font-sans rounded-lg shadow-md hover:bg-secondary hover:text-primary transition-transform transform hover:scale-105 ease-in-out duration-300 mt-6 mx-4"
  >
    Go to Prayer Information Page
  </button>
</Link>

</div>
</div>
);
}
