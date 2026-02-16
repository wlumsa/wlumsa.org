import type { Metadata } from "next";
import Ramadan2026Client from "@/components/UI/ramadan-2026/Ramadan2026Client";

export const metadata: Metadata = {
  title: "Ramadan 2026 | WLUMSA",
  description:
    "Ramadan 2026 planner for Waterloo students: fast day tracking, prayer times, key nights, and calendar export.",
};

export default function Ramadan2026Page() {
  return <Ramadan2026Client />;
}
