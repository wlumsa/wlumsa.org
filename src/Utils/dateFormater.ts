import { PrayerTiming } from "@/payload-types";

//Utility function to get the timings for today
//Refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date for documentation on Date function
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getTodaysTimings(date: Date, timings: PrayerTiming) {
  
  const currMonth = timings.month[date.getMonth()];
  const currDay = currMonth?.days[date.getDate()-1];
  return currDay;
}


export function getFullDate(year: number, month: number, day: number) {
  const date = new Date(year = year, month = month, day = day);
  const formatedDay = date.getDate();
  const formatedMonth = date.getMonth();

  return `${monthNames[formatedMonth]} ${formatedDay}`;
}

export function isFriday(year: number, month: number, day: number) {
  let date = new Date(year = year, month = month, day = day);
  return date.getDay() === 5;
}

export function formatJummahTiming(jummahTiming: string) {
  const date = new Date(jummahTiming);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/Toronto", // Set to Toronto time
  };
  return date.toLocaleTimeString("en-US", options);
}
