import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CharityWeekView from "@/components/Charity/CharityWeekView";
import {
  fetchCharityCampaigns,
  fetchCharityWeekCampaignByYear,
} from "@/Utils/datafetcher";

type PageProps = { params: Promise<{ year: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year } = await params;
  const numericYear = Number(year);
  if (!Number.isInteger(numericYear)) return {};
  const campaign = await fetchCharityWeekCampaignByYear(numericYear).catch(
    () => null
  );
  if (!campaign) return {};
  return {
    title: campaign.title + " | WLU MSA",
    description: campaign.summary,
    alternates: { canonical: "/charityweek/" + numericYear },
    openGraph: {
      title: campaign.title,
      description: campaign.summary,
      url: "/charityweek/" + numericYear,
      type: "article",
    },
  };
}

export default async function CharityWeekArchivePage({ params }: PageProps) {
  const { year } = await params;
  const numericYear = Number(year);
  if (
    !Number.isInteger(numericYear) ||
    numericYear < 2020 ||
    numericYear > 2100
  ) {
    notFound();
  }

  const [campaign, campaigns] = await Promise.all([
    fetchCharityWeekCampaignByYear(numericYear).catch(() => null),
    fetchCharityCampaigns().catch(() => []),
  ]);
  if (!campaign) notFound();

  const archiveYears = campaigns
    .filter(
      (item) =>
        item.campaignType === "charity-week" &&
        item.phase === "completed" &&
        item.year &&
        item.year !== numericYear
    )
    .map((item) => item.year as number);

  return <CharityWeekView campaign={campaign} archiveYears={archiveYears} />;
}
