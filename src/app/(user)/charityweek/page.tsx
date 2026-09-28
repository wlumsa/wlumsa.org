import type { Metadata } from "next";
import CharityWeekExperience from "./CharityWeekExperience";

export const metadata: Metadata = {
  title: "Charity Week 2026 | WLU MSA",
  description:
    "One week, one campus, one united effort. Discover WLU MSA's Charity Week campaign, events, and global impact.",
};

export default function CharityWeekPage() {
  return <CharityWeekExperience />;
}
