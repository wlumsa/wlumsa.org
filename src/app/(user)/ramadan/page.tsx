import type { Metadata } from "next";
import Ramadan2026Client from "@/components/UI/ramadan-2026/Ramadan2026Client";
import { loadWaterlooPrayerTimes } from "@/lib/waterlooPrayerTimes";

export const metadata: Metadata = {
  title: "Ramadan | WLUMSA",
  description:
    "Ramadan 2026 planner for Waterloo students: fast day tracking, prayer times, key nights, and calendar export.",
};

export default async function RamadanPage() {
  const prayerTimesByDate = await loadWaterlooPrayerTimes();

  return <Ramadan2026Client prayerTimesByDate={prayerTimesByDate} />;
}
