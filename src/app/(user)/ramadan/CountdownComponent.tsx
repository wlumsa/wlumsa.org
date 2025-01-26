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
        <div className='text-primary text-small'>{timeLeft.days} Days 
        </div>
    )
}

export default CountdownComponent

/*
 <span className="inline">
                {timeLeft.days} <span className="text-xs text-base-100">Days</span>, 
                {timeLeft.hours} <span className="text-xs text-base-100">Hours</span>, 
                {timeLeft.minutes} <span className="text-xs text-base-100">Minutes</span>, 
                {timeLeft.seconds} <span className="text-xs text-base-100">Seconds</span>
            </span>
            */