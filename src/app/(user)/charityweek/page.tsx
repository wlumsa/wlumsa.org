import type { Metadata } from "next";

import CharityWeekView, {
  CharityWeekEmptyState,
} from "@/components/Charity/CharityWeekView";
import {
  fetchCharityCampaigns,
  fetchCurrentCharityWeekCampaign,
} from "@/Utils/datafetcher";

export const metadata: Metadata = {
  title: "Charity Week | WLU MSA",
  description:
    "The current WLU MSA Charity Week campaign, events, causes, and verified results.",
  alternates: { canonical: "/charityweek" },
  openGraph: {
    title: "Charity Week | WLU MSA",
    description:
      "The current WLU MSA Charity Week campaign, events, causes, and verified results.",
    url: "/charityweek",
    type: "website",
  },
};

export default async function CharityWeekPage() {
  const [campaignResult, campaignsResult] = await Promise.allSettled([
    fetchCurrentCharityWeekCampaign(),
    fetchCharityCampaigns(),
  ]);
  const campaign =
    campaignResult.status === "fulfilled" ? campaignResult.value : null;

  if (!campaign) {
    return <CharityWeekEmptyState />;
  }

  const archiveYears =
    campaignsResult.status === "fulfilled"
      ? campaignsResult.value
          .filter(
            (item) =>
              item.campaignType === "charity-week" &&
              item.phase === "completed" &&
              item.year &&
              item.id !== campaign.id
          )
          .map((item) => item.year as number)
      : [];

  return <CharityWeekView campaign={campaign} archiveYears={archiveYears} />;
}
