"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./charityweek.module.css";

const CW_LOGO =
  "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/media/Charity-Week-Circles-Stars-FULL-COLOUR-e1596728962318.png";

const causes = [
  {
    place: "Gaza, Palestine",
    number: "01",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/palestine.png",
    alt: "Palestine relief work",
    headline: "Care that reaches children when every second matters.",
    summary:
      "Supporting maternal and newborn health, specialized care for children, and access to cochlear implants for children who need them.",
    note: "Health and specialized care",
  },
  {
    place: "Sudan",
    number: "02",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/Screenshot%202025-10-14%20at%2010.34.53%20PM.png",
    alt: "Humanitarian relief work in Sudan",
    headline: "Rebuilding the essentials that let a community breathe.",
    summary:
      "Delivering food and shelter while helping restore hospitals, classrooms, clean water sources, and sanitation infrastructure.",
    note: "Relief and essential infrastructure",
  },
  {
    place: "Bangladesh",
    number: "03",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/bangladesh.png",
    alt: "Support for Rohingya children in Bangladesh",
    headline: "A safer home and a real path back to the classroom.",
    summary:
      "Improving shelters for displaced Rohingya families and helping children leave hazardous labour for safe, supported education.",
    note: "Shelter and safe education",
  },
] as const;

const events = [
  {
    eyebrow: "On campus",
    title: "The Charity Week Booth",
    description:
      "Find us in the Concourse for baked goods, bubble tea, good conversations, and small choices that add up to something much bigger.",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/bakesale.png",
    alt: "Charity Week bake sale table",
  },
  {
    eyebrow: "Come together",
    title: "Socials with a purpose",
    description:
      "Family Feud, a scavenger hunt, Chai & Chill, and Auction Night. These shared experiences turn community into collective action.",
    image:
      "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/auctionnight.png",
    alt: "WLU MSA Charity Week auction night",
  },
] as const;

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function Intro() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      const reducedMotionTimeout = window.setTimeout(
        () => setVisible(false),
        0
      );
      return () => window.clearTimeout(reducedMotionTimeout);
    }

    try {
      if (sessionStorage.getItem("cw-intro-seen")) {
        const seenTimeout = window.setTimeout(() => setVisible(false), 0);
        return () => window.clearTimeout(seenTimeout);
      }
      sessionStorage.setItem("cw-intro-seen", "true");
    } catch {
      // The intro still works when storage is unavailable.
    }

    const timeout = window.setTimeout(() => setVisible(false), 1450);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  if (!visible) return null;

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.introMark}>
        <span className={styles.introOrbit} />
        <Image src={CW_LOGO} alt="" width={104} height={104} priority />
      </div>
      <p>Laurier is joining the movement</p>
    </div>
  );
}

export default function CharityWeekExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.page}>
      <Intro />

      <nav className={styles.campaignNav} aria-label="Charity Week navigation">
        <a
          className={styles.campaignBrand}
          href="#top"
          aria-label="Charity Week home"
        >
          <Image src={CW_LOGO} alt="" width={40} height={40} priority />
          <span>
            Charity Week
            <small>WLU × Islamic Relief Canada</small>
          </span>
        </a>
        <div className={styles.navLinks}>
          <a href="#impact">The impact</a>
          <a href="#events">The week</a>
          <a className={styles.navCta} href="#join">
            Get involved <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </nav>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroPaper} aria-hidden="true" />
          <div className={styles.bluePrint} aria-hidden="true" />
          <div className={styles.orangePrint} aria-hidden="true" />

          <motion.div
            className={styles.dateStamp}
            initial={
              reduceMotion ? false : { opacity: 0, rotate: -7, scale: 0.8 }
            }
            animate={{ opacity: 1, rotate: -4, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 180 }}
          >
            <span>October</span>
            <strong>2026</strong>
            <small>Laurier</small>
          </motion.div>

          <motion.figure
            className={`${styles.heroPhoto} ${styles.heroPhotoCampus}`}
            initial={reduceMotion ? false : { opacity: 0, x: 45, rotate: 12 }}
            animate={{ opacity: 1, x: 0, rotate: 5 }}
            transition={{
              delay: 0.35,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className={styles.tape} aria-hidden="true" />
            <div className={styles.heroPhotoFrame}>
              <Image
                src={events[0].image}
                alt="Students raising funds at the Charity Week booth"
                fill
                sizes="(max-width: 680px) 54vw, 25vw"
                priority
              />
            </div>
            <figcaption>Small actions. Shared purpose.</figcaption>
          </motion.figure>

          <motion.figure
            className={`${styles.heroPhoto} ${styles.heroPhotoImpact}`}
            initial={
              reduceMotion ? false : { opacity: 0, x: 35, y: 20, rotate: -10 }
            }
            animate={{ opacity: 1, x: 0, y: 0, rotate: -6 }}
            transition={{
              delay: 0.62,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className={styles.tape} aria-hidden="true" />
            <div className={styles.heroPhotoFrame}>
              <Image
                src={causes[0].image}
                alt="Children supported through Charity Week projects"
                fill
                sizes="(max-width: 680px) 44vw, 19vw"
                priority
              />
            </div>
            <figcaption>The reason behind the week.</figcaption>
          </motion.figure>

          <div className={styles.heroContent}>
            <motion.p
              className={styles.heroPrompt}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              Charity Week asks
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.22,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.questionTop}>What can</span>
              <span className={styles.questionCampus}>one campus</span>
              <span className={styles.questionWeek}>do in one week?</span>
            </motion.h1>

            <motion.div
              className={styles.heroStamp}
              initial={
                reduceMotion ? false : { opacity: 0, scale: 1.25, rotate: 18 }
              }
              animate={{ opacity: 1, scale: 1, rotate: 9 }}
              transition={{ delay: 0.78, type: "spring", stiffness: 190 }}
            >
              <Image
                src={CW_LOGO}
                alt="Charity Week"
                width={104}
                height={104}
              />
            </motion.div>

            <div className={styles.heroBottom}>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.72, duration: 0.7 }}
              >
                This is not a campaign you watch. Show up, bring someone, and
                help turn a campus into a collective force.
              </motion.p>
              <motion.a
                href="#story"
                className={styles.pullTab}
                aria-label="Discover Charity Week"
                initial={reduceMotion ? false : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.82, duration: 0.5 }}
              >
                <span>Pull into the story</span>
                <ArrowDown aria-hidden="true" />
              </motion.a>
            </div>
          </div>

          <div className={styles.heroFragments}>
            <span>
              <strong>$25K</strong> Goal
            </span>
            <span>
              <strong>3</strong> Impact Areas
            </span>
            <span>
              <strong>1</strong> Campus
            </span>
            <span>
              <strong>All</strong> Of Us
            </span>
          </div>
        </section>

        <section className={styles.story} id="story">
          <span className={styles.storyTape} aria-hidden="true" />
          <span className={styles.storyScribble} aria-hidden="true">
            Start here
          </span>
          <div className={styles.storyGrid}>
            <Reveal className={styles.sectionLabel}>
              <span>Why we show up</span>
              <span>01 / The movement</span>
            </Reveal>
            <Reveal className={styles.storyCopy} delay={0.08}>
              <h2>
                Fundraising is the outcome.
                <em> Unity is the point.</em>
              </h2>
              <div className={styles.storyBody}>
                <p>
                  Charity Week is an international, student led campaign for
                  orphans and children in need. Every booth, ticket, cup of
                  chai, and act of generosity becomes part of one shared effort.
                </p>
                <p>
                  This year, Laurier MSA is working alongside Islamic Relief
                  Canada toward a <strong>$25,000 goal</strong> while building a
                  campus culture that knows how to move together.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className={styles.manifesto}>
            <p>
              <span>Different</span> stories.
            </p>
            <p>
              Different <span>strengths.</span>
            </p>
            <p className={styles.manifestoAccent}>One direction.</p>
            <small>That is what unity looks like.</small>
          </Reveal>
        </section>

        <section className={styles.impact} id="impact">
          <div className={styles.impactGrid} aria-hidden="true" />
          <div className={styles.impactHeader}>
            <Reveal>
              <p className={styles.blueEyebrow}>Where the effort travels</p>
              <h2>
                Three places.
                <br />
                Countless futures.
              </h2>
            </Reveal>
            <Reveal className={styles.impactIntro} delay={0.08}>
              <MapPin aria-hidden="true" />
              <p>
                The campaign supports practical, life changing work selected to
                protect children today and expand what is possible tomorrow.
              </p>
            </Reveal>
          </div>

          <div className={styles.causeList}>
            {causes.map((cause, index) => (
              <Reveal key={cause.place} delay={index * 0.06}>
                <article className={styles.causeCard}>
                  <div className={styles.causeImage}>
                    <span className={styles.causeTape} aria-hidden="true" />
                    <Image
                      src={cause.image}
                      alt={cause.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className={styles.coverImage}
                    />
                    <span>{cause.number}</span>
                  </div>
                  <div className={styles.causeContent}>
                    <div className={styles.causeMeta}>
                      <p>{cause.place}</p>
                      <span>Field note {cause.number}</span>
                    </div>
                    <h3>{cause.headline}</h3>
                    <p className={styles.causeSummary}>{cause.summary}</p>
                    <div className={styles.causeNote}>
                      <span>What support becomes</span>
                      <strong>{cause.note}</strong>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.goal} aria-labelledby="goal-heading">
          <div className={styles.goalInk} aria-hidden="true">
            25K
          </div>
          <Reveal className={styles.goalIntro}>
            <p>Our campus target</p>
            <h2 id="goal-heading">
              Every small thing
              <span>enters the total.</span>
            </h2>
          </Reveal>
          <Reveal className={styles.goalReceipt} delay={0.08}>
            <div className={styles.receiptTop}>
              <Image src={CW_LOGO} alt="" width={42} height={42} />
              <span>Laurier Charity Week</span>
              <small>October 2026</small>
            </div>
            <div className={styles.receiptLines}>
              <p>
                <span>Booth visits</span>
                <strong>Count</strong>
              </p>
              <p>
                <span>Event tickets</span>
                <strong>Count</strong>
              </p>
              <p>
                <span>Direct giving</span>
                <strong>Counts</strong>
              </p>
              <p>
                <span>Friends you bring</span>
                <strong>Count</strong>
              </p>
            </div>
            <div className={styles.receiptTotal}>
              <span>Goal</span>
              <strong>$25,000</strong>
            </div>
            <p className={styles.receiptNote}>
              No contribution is too small to become part of something larger.
            </p>
          </Reveal>
        </section>

        <section className={styles.week} id="events">
          <span className={styles.weekPinOne} aria-hidden="true" />
          <span className={styles.weekPinTwo} aria-hidden="true" />
          <div className={styles.weekHeading}>
            <Reveal>
              <p className={styles.orangeEyebrow}>How Laurier moves</p>
              <h2>
                Make a memory.
                <br />
                Make it matter.
              </h2>
            </Reveal>
            <Reveal className={styles.weekNote} delay={0.08}>
              <Sparkles aria-hidden="true" />
              <p>No passive scrolling. Charity Week is better in person.</p>
            </Reveal>
          </div>

          <div className={styles.eventGrid}>
            {events.map((event, index) => (
              <Reveal key={event.title} delay={index * 0.1}>
                <article className={styles.eventCard}>
                  <span className={styles.eventTape} aria-hidden="true" />
                  <div className={styles.eventImage}>
                    <Image
                      src={event.image}
                      alt={event.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.coverImage}
                    />
                    <span className={styles.eventIndex}>0{index + 1}</span>
                  </div>
                  <div className={styles.eventContent}>
                    <p>{event.eyebrow}</p>
                    <h3>{event.title}</h3>
                    <p className={styles.eventDescription}>
                      {event.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.join} id="join">
          <div className={styles.joinOrbit} aria-hidden="true" />
          <div className={styles.joinStar} aria-hidden="true">
            ✦
          </div>
          <Reveal className={styles.joinContent}>
            <Heart aria-hidden="true" />
            <p>It only works when we all move.</p>
            <h2>Your part can start small.</h2>
            <div className={styles.pledgeTabs}>
              <span>
                <small>01</small> Show up
              </span>
              <span>
                <small>02</small> Bring someone
              </span>
              <span>
                <small>03</small> Give what you can
              </span>
            </div>
            <div className={styles.joinActions}>
              <a href="#events" className={styles.primaryAction}>
                Find your way in <ArrowRight aria-hidden="true" />
              </a>
              <Link href="/contact" className={styles.secondaryAction}>
                Talk to the team <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <p className={styles.joinFootnote}>
            WLU MSA × Islamic Relief Canada <span>•</span> Charity Week 2026
          </p>
        </section>
      </main>
    </div>
  );
}
