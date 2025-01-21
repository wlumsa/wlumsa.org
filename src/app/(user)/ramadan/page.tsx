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
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-[#203B5D] mb-6">Countdown to Ramadan 2025</h1>
      <p className="mb-4 text-lg text-gray-700">
        The blessed month of Ramadan is approaching! Countdown to its start:
      </p>

      <div className="flex space-x-4 text-2xl font-bold text-[#2474A3]">
        <div className="flex flex-col items-center">
          <span>{timeLeft.days}</span>
          <span className="text-sm text-gray-600">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{timeLeft.hours}</span>
          <span className="text-sm text-gray-600">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{timeLeft.minutes}</span>
          <span className="text-sm text-gray-600">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span>{timeLeft.seconds}</span>
          <span className="text-sm text-gray-600">Seconds</span>
        </div>
      </div>

      <Link href="/ramadan/2024">
        <button className="mt-8 px-6 py-3 bg-[#203B5D] text-white font-bold rounded hover:bg-[#1a2f4b]">
          Go to Ramadan 2024 Page
        </button>
      </Link>
    </div>
  );
}
