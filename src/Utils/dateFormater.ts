import { PrayerTiming } from "@/payload-types";

type TimingKey = "fajr" | "fajr_iqamah" | "sunrise" | "dhuhr" | "dhuhr_iqamah" | "asr" | "asr_iqamah" | "maghrib" | "maghrib_iqamah" | "isha" | "isha_iqamah";

//Utility function to get the timings for today
//Refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date for documentation on Date function
export function getTodaysTimings(date: Date, timings: PrayerTiming) {
  const currMonth = timings.month[date.getMonth()];
  const currDay = currMonth?.days[date.getDate()];
  return currDay;
}

export function getFormatedTiming(key: TimingKey, time: string) {
  const timingDictonary = {
    "fajr": "AM",
    "fajr_iqamah": "AM",
    "sunrise": "AM",
    "dhuhr": "PM",
    "dhuhr_iqamah": "PM",
    "asr": "PM",
    "asr_iqamah": "PM",
    "maghrib": "PM",
    "maghrib_iqamah": "PM",
    "isha": "PM",
    "isha_iqamah": "PM",
  };

  const formatedTime = time + " " + timingDictonary[key]
  return formatedTime
}
