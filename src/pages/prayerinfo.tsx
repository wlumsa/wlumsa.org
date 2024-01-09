import React, { useEffect, useState } from "react";
import Navbar from "~/components/Global/Navbar";
import Footer from "~/components/Global/Footer";


import classNames from 'classnames';
import PrayerSpaceCard from "~/components/PrayerSpaceCard";

import { GetStaticProps } from "next";
import { NextPage } from "next";
import {
  fetchTimings,
  fetchJummahTimes,
  fetchSocialLinks,
  getNavbarData,
  getFooterData,
} from "~/lib/api";

export const getStaticProps: GetStaticProps = async () => {
  const timingsData = await fetchTimings();
  const jummahTimes = await fetchJummahTimes();
  const socialLinks = await fetchSocialLinks();
  const navbarData = await getNavbarData();
  const footerData = await getFooterData();

  const videoIds = [
    'Esnqdy0rqiY', // Video ID extracted from the first URL
    'XQALLoF6Buo', // Video ID extracted from the second URL
    'BeT9uC4NBPw', // Video ID extracted from the third URL
  ];

  return {
    props: {
      socialLinks,  
      navbarData,
      footerData,
      timingsData,
      jummahTimes,
      videoIds,
    },
    revalidate:3600,
  };
};

interface PrayerInfoProps {
  socialLinks: SocialLinkProps[];
  navbarData: NavbarGroup[];
  footerData: FooterGroup[];
  timingsData: DayTimings[];
  jummahTimes: Jummah[];
  videoIds: string[]; // Add this line
}

const PrayerInfo: NextPage<PrayerInfoProps> = ({
  socialLinks,
  navbarData, // Add this line
  footerData,
  timingsData,
  jummahTimes,
  videoIds,

}) => {
  const [filteredData, setFilteredData] = useState<DayTimings[]>([]);
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentMonthLong = new Date().toLocaleString("default", {
    month: "long",
  });


  useEffect(() => {
    const endDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const nextSevenDaysData = timingsData.filter((data) => {
      const day = data.day;
      return day >= currentDay && day <= Math.min(currentDay + 6, endDay);
    });
    setFilteredData(nextSevenDaysData);
  }, [timingsData, currentDay]);

  const getFullDate = (day: number): string => {
    return `${currentMonthLong} ${day}`;
  };

  const appendMeridiem = (time: string, isAM: boolean) => {
    if (!time) return time;
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }
    return `${time} ${isAM ? "AM" : "PM"}`;
  };

  const isFriday = (dayNumber: number): boolean => {
    const date = new Date();
    date.setDate(dayNumber);
    const isFri = date.getDay() === 5;
    console.log("Is Friday:", isFri);
    return isFri;
  };

  const prayerRows = [
    { key: "Fajr", iqamahKey: "" },
    { key: "Sunrise", iqamahKey: "" },
    { key: "Dhuhr", iqamahKey: "DhuhrIqamah" },
    { key: "Asr", iqamahKey: "AsrIqamah" },
    { key: "Maghrib", iqamahKey: "MaghribIqamah" },
    { key: "Isha", iqamahKey: "IshaIqamah" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar navbarData={navbarData} />
      <div className="flex flex-grow flex-col items-center pt-16">
        <div className="container mx-auto p-8">
          <h1 className="my-4 text-4xl font-bold text-primary">Prayer Times</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow-lg">
              <thead className="bg-[#2E046D] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Prayer
                  </th>
                  {filteredData.map((day) => (
                    <th
                      key={day.day}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      {getFullDate(day.day)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {prayerRows.map(({ key, iqamahKey }, index) => (
                  <tr
                    key={key}
                    className={classNames(
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    )}
                  >
                    <td className="text-md whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      {key.replace(/Iqamah$/, " Iqamah")}
                    </td>
                    {filteredData.map((day) => (
                      <td
                        key={day.day}
                        className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                      >
                        <div>
                          {appendMeridiem(
                            day.timings[key as keyof Timings],
                            key === "Fajr" || key === "Sunrise"
                          )}
                        </div>
                        {iqamahKey &&
                          !(key === "Dhuhr" && isFriday(day.day)) && (
                            <div className="text-green-500">
                              {appendMeridiem(
                                day.timings[iqamahKey as keyof Timings],
                                false
                              )}
                            </div>
                          )}
                        {key === "Dhuhr" &&
                          isFriday(day.day) &&
                          jummahTimes.map((jummah, index) => (
                            <div key={index} className="text-blue-500">
                              {jummah.time} at {jummah.room}
                            </div>
                          ))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-red-600">
            *Waterloo Masjid timings with Hanafi Asr calculation method
          </p>
          <p className="text-red-600">
            *Black = Adhan times, Green = Iqamah times , Blue = Jummah times
          </p>
        </div>
      </div>

      <div className="container mx-auto p-8">
  <h2 className="mb-8 text-center text-3xl font-bold">
    These Videos Can help guide you to the Prayer Rooms
  </h2>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    <PrayerSpaceCard
      videoId="Esnqdy0rqiY"
      title="Jummah"
      thumbnailUrl="https://img.youtube.com/vi/BeT9uC4NBPw/maxresdefault.jpg"
    />
    <PrayerSpaceCard
      videoId="XQALLoF6Buo"
      title="Brickers"
      thumbnailUrl="https://img.youtube.com/vi/XQALLoF6Buo/maxresdefault.jpg"
    />
    <PrayerSpaceCard
      videoId="BeT9uC4NBPw"
      title="Peters"
      thumbnailUrl="https://img.youtube.com/vi/BeT9uC4NBPw/maxresdefault.jpg"
    />
  </div>
</div>

      <Footer footerGroups={footerData} socialLinks={socialLinks} />
    </div>
  );
};

export default PrayerInfo;
