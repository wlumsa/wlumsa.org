import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Heart,
  MapPin,
} from "lucide-react";

import type { CharityCampaign, Event, Media } from "@/payload-types";
import {
  formatCharityDate,
  formatCharityDateTime,
  formatMoney,
  getCurrentTimestamp,
  getMedia,
  getMediaURL,
  safeExternalURL,
} from "./charity-utils";
import styles from "./charityweek.module.css";

const CHARITY_WEEK_LOGO =
  "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/Charity-Week-Circles-Stars-FULL-COLOUR-e1596728962318.png";

const LEGACY_CHARITY_WEEK_IMAGES = [
  {
    src: "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/bakesale.png",
    alt: "Charity Week bake sale table from the previous campaign page",
    label: "Charity Week booth",
  },
  {
    src: "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/auctionnight.png",
    alt: "WLU MSA Charity Week auction night from the previous campaign page",
    label: "Auction Night",
  },
  {
    src: "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/palestine.png",
    alt: "Campaign impact photograph previously shown for Palestine",
    label: "Previous campaign — Palestine",
  },
  {
    src: "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/bangladesh.png",
    alt: "Campaign impact photograph previously shown for Bangladesh",
    label: "Previous campaign — Bangladesh",
  },
] as const;

function isEvent(value: Event | number): value is Event {
  return typeof value === "object" && value !== null;
}

function EditorialImage({
  media,
  sizes,
}: {
  media: Media | number | null | undefined;
  sizes: string;
}) {
  const image = getMedia(media);
  const url = getMediaURL(media);
  if (!image || !url) return null;

  return (
    <Image
      src={url}
      alt={image.alt}
      fill
      sizes={sizes}
      className={styles.coverImage}
    />
  );
}

export function CharityWeekEmptyState() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.paperGrid} aria-hidden="true" />
        <div className={styles.blueShape} aria-hidden="true" />
        <div className={styles.orangeShape} aria-hidden="true" />

        <div className={styles.dateStamp}>
          <span>WLU</span>
          <strong>MSA</strong>
          <small>Charity</small>
        </div>

        <figure
          className={`${styles.heroPhoto} ${styles.heroPhotoCampus} ${styles.emptyPoster}`}
        >
          <span className={styles.tape} aria-hidden="true" />
          <div className={styles.heroPhotoFrame}>
            <Image
              src={CHARITY_WEEK_LOGO}
              width={180}
              height={180}
              alt="Charity Week"
              priority
            />
          </div>
          <figcaption>WLU MSA Charity Week</figcaption>
        </figure>

        <div className={styles.heroContent}>
          <div className={styles.campaignMeta}>
            <span>No current campaign</span>
          </div>
          <p className={styles.heroPrompt}>Charity Week asks</p>
          <h1 aria-label="What can one campus do in one week?">
            <span>What can</span>
            <span>one campus</span>
            <span>do in one week?</span>
          </h1>

          <div className={styles.heroStamp}>
            <Image
              src={CHARITY_WEEK_LOGO}
              width={104}
              height={104}
              alt="Charity Week"
              priority
            />
          </div>

          <div className={styles.heroBottom}>
            <div>
              <strong>No Charity Week campaign is currently published.</strong>
              <p>
                There are no current dates, registrations, or donation links on
                this page. Confirmed campaign information will appear here when
                it is published by the charity team.
              </p>
            </div>
            <div className={styles.heroActions}>
              <Link href="/charity" className={styles.primaryAction}>
                <ArrowLeft aria-hidden="true" /> Charity home
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroFragments} aria-label="WLU MSA Charity Week">
          <span>
            <strong>WLU</strong> MSA
          </span>
          <span>
            <strong>Charity</strong> Week
          </span>
          <span>
            <strong>Laurier</strong> Students
          </span>
          <span>
            <strong>Waterloo</strong> Ontario
          </span>
        </div>
      </header>

      <section className={styles.legacyPreview} aria-labelledby="legacy-title">
        <div className={styles.legacyHeading}>
          <div>
            <p>Photo archive</p>
            <h2 id="legacy-title">Previous Charity Week moments.</h2>
          </div>
          <p>
            These photographs come from the former Charity Week page. They are
            shown as an archive—not as current events, donation opportunities,
            or newly verified impact claims.
          </p>
        </div>
        <div className={styles.legacyGrid}>
          {LEGACY_CHARITY_WEEK_IMAGES.map((image) => (
            <figure key={image.src}>
              <div>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 680px) 88vw, 25vw"
                  className={styles.coverImage}
                />
              </div>
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function CharityWeekView({
  campaign,
  archiveYears = [],
}: {
  campaign: CharityCampaign;
  archiveYears?: number[];
}) {
  const isActive = campaign.phase === "active";
  const isCompleted = campaign.phase === "completed";
  const donationURL = isActive
    ? safeExternalURL(campaign.fundraising.donationURL)
    : null;
  const volunteerURL = !isCompleted
    ? safeExternalURL(campaign.volunteerURL)
    : null;
  const recapURL = safeExternalURL(campaign.recapURL);
  const events = (campaign.events || []).filter(isEvent);
  const now = getCurrentTimestamp();
  const visibleEvents = isCompleted
    ? events
    : events.filter((event) => new Date(event.date).getTime() >= now);
  const dateRange = [
    formatCharityDate(campaign.startDate),
    formatCharityDate(campaign.endDate),
  ].filter(Boolean);
  const showFundraising =
    campaign.fundraising.amountState === "verified" ||
    typeof campaign.fundraising.goal === "number";
  const campusMedia =
    events.find((event) => getMediaURL(event.image))?.image ||
    campaign.heroImage;
  const impactMedia = campaign.causes?.find((cause) =>
    getMediaURL(cause.image)
  )?.image;
  const campaignMonth = campaign.startDate
    ? new Intl.DateTimeFormat("en-CA", {
        month: "long",
        timeZone: "America/Toronto",
      }).format(new Date(campaign.startDate))
    : isCompleted
    ? "Past campaign"
    : "Charity Week";

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.paperGrid} aria-hidden="true" />
        <div className={styles.blueShape} aria-hidden="true" />
        <div className={styles.orangeShape} aria-hidden="true" />

        <div className={styles.dateStamp}>
          <span>{campaignMonth}</span>
          <strong>{campaign.year || "WLU"}</strong>
          <small>Laurier</small>
        </div>

        {campusMedia ? (
          <figure className={`${styles.heroPhoto} ${styles.heroPhotoCampus}`}>
            <span className={styles.tape} aria-hidden="true" />
            <div className={styles.heroPhotoFrame}>
              <EditorialImage
                media={campusMedia}
                sizes="(max-width: 680px) 54vw, 25vw"
              />
            </div>
            <figcaption>{campaign.title}</figcaption>
          </figure>
        ) : null}

        {impactMedia ? (
          <figure className={`${styles.heroPhoto} ${styles.heroPhotoImpact}`}>
            <span className={styles.tape} aria-hidden="true" />
            <div className={styles.heroPhotoFrame}>
              <EditorialImage
                media={impactMedia}
                sizes="(max-width: 680px) 44vw, 19vw"
              />
            </div>
            <figcaption>The reason behind the week.</figcaption>
          </figure>
        ) : null}

        <div className={styles.heroContent}>
          <div className={styles.campaignMeta}>
            <span>{campaign.phase}</span>
            {dateRange.length ? <span>{dateRange.join(" – ")}</span> : null}
          </div>
          <p className={styles.heroPrompt}>Charity Week asks</p>
          <h1 aria-label="What can one campus do in one week?">
            <span>What can</span>
            <span>one campus</span>
            <span>do in one week?</span>
          </h1>

          <div className={styles.heroStamp}>
            <Image
              src={CHARITY_WEEK_LOGO}
              width={104}
              height={104}
              alt="Charity Week"
              priority
            />
          </div>

          <div className={styles.heroBottom}>
            <div>
              <strong>{campaign.title}</strong>
              <p>{campaign.summary}</p>
            </div>
            <div className={styles.heroActions}>
              {donationURL ? (
                <a
                  href={donationURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryAction}
                >
                  Donate <ExternalLink aria-hidden="true" />
                </a>
              ) : null}
              {!isCompleted && visibleEvents.length ? (
                <a href="#events" className={styles.secondaryAction}>
                  See events <ArrowRight aria-hidden="true" />
                </a>
              ) : null}
              {isCompleted && recapURL ? (
                <a
                  href={recapURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryAction}
                >
                  Campaign recap <ExternalLink aria-hidden="true" />
                </a>
              ) : null}
              <Link href="/charity" className={styles.secondaryAction}>
                <ArrowLeft aria-hidden="true" /> Charity home
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroFragments}>
          <span>
            <strong>
              {typeof campaign.fundraising.goal === "number"
                ? formatMoney(
                    campaign.fundraising.goal,
                    campaign.fundraising.currency
                  )
                : campaign.phase}
            </strong>
            {typeof campaign.fundraising.goal === "number" ? "Goal" : "Status"}
          </span>
          <span>
            <strong>{campaign.causes?.length || 0}</strong> Impact areas
          </span>
          <span>
            <strong>{visibleEvents.length}</strong> Events
          </span>
          <span>
            <strong>One</strong> Campus
          </span>
        </div>
      </header>

      <main>
        {!isActive ? (
          <section className={styles.phaseNotice}>
            <strong>
              {isCompleted ? "This campaign has ended." : "Campaign coming up."}
            </strong>
            <p>
              {isCompleted
                ? "This page is kept as a campaign record. Old donation, registration, and volunteer prompts are disabled."
                : "Dates and participation links appear here as soon as the charity team confirms them."}
            </p>
          </section>
        ) : null}

        {showFundraising ? (
          <section
            className={styles.fundraising}
            aria-labelledby="fundraising-title"
          >
            <div className={styles.sectionIntro}>
              <p>Fundraising</p>
              <h2 id="fundraising-title">
                Every contribution enters the total.
              </h2>
            </div>
            <div className={styles.totalCard}>
              {campaign.fundraising.amountState === "verified" &&
              typeof campaign.fundraising.amountRaised === "number" ? (
                <div>
                  <span>Verified raised</span>
                  <strong>
                    {formatMoney(
                      campaign.fundraising.amountRaised,
                      campaign.fundraising.currency
                    )}
                  </strong>
                </div>
              ) : null}
              {typeof campaign.fundraising.goal === "number" ? (
                <div>
                  <span>Campaign goal</span>
                  <strong>
                    {formatMoney(
                      campaign.fundraising.goal,
                      campaign.fundraising.currency
                    )}
                  </strong>
                </div>
              ) : null}
              {campaign.fundraising.amountState === "verified" &&
              campaign.fundraising.lastVerifiedAt ? (
                <small>
                  <CheckCircle2 aria-hidden="true" /> Verified{" "}
                  {formatCharityDate(campaign.fundraising.lastVerifiedAt)}
                </small>
              ) : null}
            </div>
          </section>
        ) : null}

        {campaign.causes?.length ? (
          <section className={styles.causes} aria-labelledby="causes-title">
            <div className={styles.sectionIntro}>
              <p>Where support goes</p>
              <h2 id="causes-title">The work behind the week.</h2>
            </div>
            <div className={styles.causeList}>
              {campaign.causes.map((cause, index) => {
                const hasImage = Boolean(getMediaURL(cause.image));
                return (
                  <article
                    className={styles.causeCard}
                    key={cause.id || cause.name}
                  >
                    {hasImage ? (
                      <div className={styles.causeImage}>
                        <EditorialImage
                          media={cause.image}
                          sizes="(max-width: 760px) 100vw, 42vw"
                        />
                        <span>0{index + 1}</span>
                      </div>
                    ) : (
                      <div className={styles.causeNumber}>0{index + 1}</div>
                    )}
                    <div className={styles.causeCopy}>
                      <p>Impact area {String(index + 1).padStart(2, "0")}</p>
                      <h3>{cause.name}</h3>
                      <p>{cause.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {visibleEvents.length ? (
          <section
            className={styles.events}
            id="events"
            aria-labelledby="events-title"
          >
            <div className={styles.sectionIntro}>
              <p>{isCompleted ? "Campaign record" : "Join the week"}</p>
              <h2 id="events-title">
                {isCompleted
                  ? "Events from the campaign."
                  : "Show up. Bring someone."}
              </h2>
            </div>
            <div className={styles.eventGrid}>
              {visibleEvents.map((event, index) => {
                const registrationURL = !isCompleted
                  ? safeExternalURL(event.link)
                  : null;
                const eventImage = getMediaURL(event.image);
                return (
                  <article className={styles.eventCard} key={event.id}>
                    {eventImage ? (
                      <div className={styles.eventImage}>
                        <EditorialImage
                          media={event.image}
                          sizes="(max-width: 760px) 100vw, 33vw"
                        />
                        <span>0{index + 1}</span>
                      </div>
                    ) : null}
                    <div className={styles.eventCopy}>
                      <p className={styles.eventDate}>
                        <CalendarDays aria-hidden="true" />
                        {formatCharityDateTime(event.date)}
                      </p>
                      <h3>{event.name}</h3>
                      <p>{event.description}</p>
                      {event.location ? (
                        <p className={styles.eventLocation}>
                          <MapPin aria-hidden="true" /> {event.location}
                        </p>
                      ) : null}
                      {registrationURL ? (
                        <a
                          href={registrationURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register <ExternalLink aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {campaign.resultsSummary || campaign.impactItems?.length ? (
          <section className={styles.results} aria-labelledby="results-title">
            <div>
              <p>Campaign results</p>
              <h2 id="results-title">What the week made possible.</h2>
              {campaign.resultsSummary ? (
                <p>{campaign.resultsSummary}</p>
              ) : null}
            </div>
            {campaign.impactItems?.length ? (
              <dl>
                {campaign.impactItems.map((item) => (
                  <div key={item.id || item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </section>
        ) : null}

        {campaign.partners?.length ? (
          <section className={styles.partners} aria-labelledby="partners-title">
            <p id="partners-title">Campaign partners</p>
            <div>
              {campaign.partners.map((partner) => {
                const url = safeExternalURL(partner.url);
                return (
                  <article key={partner.id || partner.name}>
                    <h3>{partner.name}</h3>
                    {partner.description ? <p>{partner.description}</p> : null}
                    {url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        Partner website <ExternalLink aria-hidden="true" />
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {!isCompleted && (campaign.volunteerText || campaign.contactEmail) ? (
          <section className={styles.join} aria-labelledby="join-title">
            <Heart aria-hidden="true" />
            <div>
              <p>Your part can start small</p>
              <h2 id="join-title">Help make the week happen.</h2>
              {campaign.volunteerText ? <p>{campaign.volunteerText}</p> : null}
              <div className={styles.heroActions}>
                {volunteerURL ? (
                  <a
                    href={volunteerURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryAction}
                  >
                    Volunteer <ExternalLink aria-hidden="true" />
                  </a>
                ) : null}
                {campaign.contactEmail ? (
                  <a
                    href={"mailto:" + campaign.contactEmail}
                    className={styles.secondaryAction}
                  >
                    Talk to the team
                  </a>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {archiveYears.length ? (
          <nav
            className={styles.archive}
            aria-label="Past Charity Week campaigns"
          >
            <span>Past Charity Weeks</span>
            {archiveYears.map((year) => (
              <Link key={year} href={"/charityweek/" + year}>
                {year}
              </Link>
            ))}
          </nav>
        ) : null}
      </main>
    </div>
  );
}
