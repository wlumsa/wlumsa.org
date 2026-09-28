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
          <div className={styles.heroNoise} />
          <div className={styles.heroStarOne}>✦</div>
          <div className={styles.heroStarTwo}>✦</div>
          <div className={styles.heroContent}>
            <motion.p
              className={styles.kicker}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
            >
              <span>October 2026</span>
              <span>Wilfrid Laurier University</span>
            </motion.p>

            <div className={styles.heroTitleWrap}>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.22,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span>ONE</span>
                <span className={styles.outlineWord}>WEEK.</span>
              </motion.h1>
              <motion.div
                className={styles.heroSeal}
                initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 7 }}
                transition={{
                  delay: 0.55,
                  type: "spring",
                  stiffness: 170,
                }}
              >
                <Image
                  src={CW_LOGO}
                  alt="Charity Week"
                  width={148}
                  height={148}
                  priority
                />
              </motion.div>
            </div>

            <div className={styles.heroBottom}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.72, duration: 0.7 }}
              >
                One campus. One united effort. A week of showing what becomes
                possible when we stop moving alone.
              </motion.p>
              <motion.a
                href="#story"
                className={styles.roundButton}
                aria-label="Discover Charity Week"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.82, duration: 0.5 }}
              >
                <ArrowDown aria-hidden="true" />
              </motion.a>
            </div>
          </div>

          <div className={styles.marquee} aria-hidden="true">
            <div>
              <span>UNITY IN ACTION</span>
              <i>✦</i>
              <span>FOR ORPHANS &amp; CHILDREN</span>
              <i>✦</i>
              <span>UNITY IN ACTION</span>
              <i>✦</i>
              <span>FOR ORPHANS &amp; CHILDREN</span>
              <i>✦</i>
            </div>
          </div>
        </section>

        <section className={styles.story} id="story">
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
            <p>Different stories.</p>
            <p>Different strengths.</p>
            <p className={styles.manifestoAccent}>One direction.</p>
          </Reveal>
        </section>

        <section className={styles.impact} id="impact">
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
                    <p>{cause.place}</p>
                    <h3>{cause.headline}</h3>
                    <p className={styles.causeSummary}>{cause.summary}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.week} id="events">
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
