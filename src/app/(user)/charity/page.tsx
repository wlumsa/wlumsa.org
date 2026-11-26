import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  ExternalLink,
  HeartHandshake,
  Mail,
  MapPin,
} from "lucide-react";

import {
  fetchCharityCampaigns,
  fetchCharityHubData,
} from "@/Utils/datafetcher";
import type { CharityCampaign, CharityHub, Event } from "@/payload-types";
import {
  CHARITY_INSTAGRAM,
  formatCharityDateTime,
  formatMoney,
  getCurrentTimestamp,
  getMedia,
  getMediaURL,
  safeExternalURL,
} from "@/components/Charity/charity-utils";
import styles from "@/components/Charity/charity.module.css";

export const metadata: Metadata = {
  title: "Charity | WLU MSA",
  description:
    "Explore WLU MSA charity campaigns, upcoming events, verified fundraising progress, and ways to help.",
  alternates: { canonical: "/charity" },
  openGraph: {
    title: "WLU MSA Charity",
    description:
      "See what is happening, how to participate, and where support goes.",
    url: "/charity",
    type: "website",
  },
};

const fallbackHub: CharityHub = {
  id: 0,
  eyebrow: "WLU MSA Charity",
  title: "Care in action, all year long.",
  introduction:
    "WLU MSA Charity brings students together to support responsible, community-led charitable work. Find current opportunities here as the team publishes them.",
  instagramURL: CHARITY_INSTAGRAM,
  _status: "published",
};

function asEvent(value: number | Event): value is Event {
  return typeof value === "object" && value !== null;
}

function campaignHref(campaign: CharityCampaign) {
  return campaign.campaignType === "charity-week"
    ? "/charityweek"
    : "/charity#campaign-" + campaign.id;
}

export default async function CharityPage() {
  const [hubResult, campaignsResult] = await Promise.allSettled([
    fetchCharityHubData(),
    fetchCharityCampaigns(),
  ]);
  const hub = hubResult.status === "fulfilled" ? hubResult.value : fallbackHub;
  const campaigns =
    campaignsResult.status === "fulfilled" ? campaignsResult.value : [];
  const featured = campaigns.filter(
    (campaign) => campaign.featured && campaign.phase !== "completed"
  );
  const completed = campaigns.filter(
    (campaign) => campaign.phase === "completed"
  );
  const now = getCurrentTimestamp();
  const upcomingEvents = campaigns
    .filter((campaign) => campaign.phase !== "completed")
    .flatMap((campaign) =>
      (campaign.events || [])
        .filter(asEvent)
        .map((event) => ({ campaign, event }))
    )
    .filter(({ event }) => new Date(event.date).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.event.date).getTime() - new Date(b.event.date).getTime()
    )
    .slice(0, 6);
  const heroMedia = getMedia(hub.heroImage);
  const heroURL = getMediaURL(hub.heroImage);
  const instagramURL = safeExternalURL(hub.instagramURL) || CHARITY_INSTAGRAM;
  const volunteerURL = safeExternalURL(hub.volunteerURL);

  return (
    <div className={styles.hubPage}>
      <header className={styles.hubHero}>
        <div className={styles.hubHeroCopy}>
          <p className={styles.eyebrow}>{hub.eyebrow || "WLU MSA Charity"}</p>
          <h1>{hub.title || fallbackHub.title}</h1>
          <p>{hub.introduction || fallbackHub.introduction}</p>
          <div className={styles.heroActions}>
            {featured.length ? (
              <a href="#campaigns">
                See active work <ArrowRight aria-hidden="true" />
              </a>
            ) : null}
            <a
              href={instagramURL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              <Camera aria-hidden="true" /> @wlumsa.charity
            </a>
          </div>
        </div>
        <div className={styles.hubHeroVisual}>
          {heroURL && heroMedia ? (
            <Image
              src={heroURL}
              alt={heroMedia.alt}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 45vw"
              className={styles.coverImage}
            />
          ) : (
            <div className={styles.purposeMark} aria-hidden="true">
              <span>WLU MSA</span>
              <span>Charity</span>
              <span>Year-round</span>
            </div>
          )}
        </div>
      </header>

      <main className={styles.hubMain}>
        <section
          className={styles.weekBridge}
          aria-labelledby="charity-week-title"
        >
          <div>
            <p className={styles.eyebrow}>Annual campaign</p>
            <h2 id="charity-week-title">Charity Week has a home here, too.</h2>
            <p>
              Open the dedicated page for published campaign dates, events,
              causes, donation links, and verified results.
            </p>
          </div>
          <Link href="/charityweek">
            Visit Charity Week <ArrowRight aria-hidden="true" />
          </Link>
        </section>

        {featured.length ? (
          <section
            className={styles.hubSection}
            id="campaigns"
            aria-labelledby="campaigns-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>What is happening</p>
              <h2 id="campaigns-title">Featured campaigns</h2>
            </div>
            <div className={styles.campaignGrid}>
              {featured.map((campaign) => {
                const image = getMedia(campaign.heroImage);
                const imageURL = getMediaURL(campaign.heroImage);
                const donationURL =
                  campaign.phase === "active"
                    ? safeExternalURL(campaign.fundraising.donationURL)
                    : null;
                return (
                  <article
                    id={"campaign-" + campaign.id}
                    key={campaign.id}
                    className={styles.hubCampaignCard}
                  >
                    {image && imageURL ? (
                      <div className={styles.hubCardImage}>
                        <Image
                          src={imageURL}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 700px) 100vw, 50vw"
                          className={styles.coverImage}
                        />
                      </div>
                    ) : null}
                    <div>
                      <span className={styles.statusPill}>
                        {campaign.phase}
                      </span>
                      <h3>{campaign.title}</h3>
                      <p>{campaign.summary}</p>
                      {campaign.fundraising.amountState === "verified" &&
                      typeof campaign.fundraising.amountRaised === "number" ? (
                        <p className={styles.cardStat}>
                          <strong>
                            {formatMoney(
                              campaign.fundraising.amountRaised,
                              campaign.fundraising.currency
                            )}
                          </strong>
                          <span> verified raised</span>
                        </p>
                      ) : null}
                      <div className={styles.cardActions}>
                        <Link href={campaignHref(campaign)}>
                          Campaign details
                        </Link>
                        {donationURL ? (
                          <a
                            href={donationURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Donate <ExternalLink aria-hidden="true" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {upcomingEvents.length ? (
          <section
            className={styles.hubSection}
            aria-labelledby="upcoming-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Show up</p>
              <h2 id="upcoming-title">Upcoming charity events</h2>
            </div>
            <div className={styles.eventList}>
              {upcomingEvents.map(({ campaign, event }) => {
                const registrationURL = safeExternalURL(event.link);
                return (
                  <article key={event.id} className={styles.eventCard}>
                    <div className={styles.eventDate}>
                      <CalendarDays aria-hidden="true" />{" "}
                      {formatCharityDateTime(event.date)}
                    </div>
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    {event.location ? (
                      <p className={styles.location}>
                        <MapPin aria-hidden="true" /> {event.location}
                      </p>
                    ) : null}
                    <p className={styles.eventCampaign}>{campaign.title}</p>
                    {registrationURL ? (
                      <a
                        href={registrationURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register <ExternalLink aria-hidden="true" />
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {completed.length ? (
          <section className={styles.hubSection} aria-labelledby="past-title">
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>The record</p>
              <h2 id="past-title">Previous campaigns and results</h2>
            </div>
            <div className={styles.pastList}>
              {completed.map((campaign) => (
                <article key={campaign.id}>
                  <div>
                    <span>{campaign.year || "Completed"}</span>
                    <h3>{campaign.title}</h3>
                    <p>{campaign.resultsSummary || campaign.summary}</p>
                  </div>
                  {campaign.campaignType === "charity-week" && campaign.year ? (
                    <Link href={"/charityweek/" + campaign.year}>
                      View record
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className={styles.hubInvolve} aria-labelledby="help-title">
          <HeartHandshake aria-hidden="true" />
          <div>
            <p className={styles.eyebrow}>Volunteer or collaborate</p>
            <h2 id="help-title">
              {hub.volunteerHeading || "Help move the work forward"}
            </h2>
            {hub.volunteerText ? <p>{hub.volunteerText}</p> : null}
            {hub.collaborationText ? <p>{hub.collaborationText}</p> : null}
            <div className={styles.heroActions}>
              {volunteerURL ? (
                <a
                  href={volunteerURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Volunteer <ExternalLink aria-hidden="true" />
                </a>
              ) : null}
              {hub.contactEmail ? (
                <a
                  href={"mailto:" + hub.contactEmail}
                  className={styles.secondaryButton}
                >
                  <Mail aria-hidden="true" /> Contact charity
                </a>
              ) : null}
              <a
                href={instagramURL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                <Camera aria-hidden="true" /> Instagram
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
