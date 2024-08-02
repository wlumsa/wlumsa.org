import { PrayerTiming } from "@/payload-types";

//Utility function to get the timings for today
//Refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date for documentation on Date function
const monthNames = ["January", "February", "March" ,"April","May","June","July","August","September","October","November","December"];

export function getTodaysTimings(date: Date, timings: PrayerTiming) {
  const currMonth = timings.month[date.getMonth()];
  const currDay = currMonth?.days[date.getDate()];
  return currDay;
}

export function getFullDate(year:number,month: number, day: number) {
  const date = new Date(year=year,month = month, day = day);
  const formatedDay = date.getDate();
  const formatedMonth = date.getMonth();

  return `${monthNames[formatedMonth]} ${formatedDay}`;
}
