"use client"
import React from 'react'
import { useState, useEffect } from 'react';
const CountdownComponent = () => {
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
    )
}

export default CountdownComponent