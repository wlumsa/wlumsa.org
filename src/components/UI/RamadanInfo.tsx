"use client"
import React from 'react'
import { useEffect, useState } from 'react';

const RamadanInfo = () => {

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
    <div>
                <div className="flex flex-col sm:flex-row justify-around  items-center ">
            <div className="mb-4 text-center sm:mx-2 sm:mb-0 ">
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
    </div>
  )
}

export default RamadanInfo